const LIMITE_GLOBAL = 7;
const LIMITE_COMBINADO = 3;

async function getEsquemaPreferencial() {
    const response = await fetch("https://pastefy.app/UIbz9MCZ/raw");
    return await response.json();
}

let ESQUEMA_PREFERENCIAL = null;

async function init() {
    ESQUEMA_PREFERENCIAL = await getEsquemaPreferencial();
}

init().catch(error => {
    console.error("Error al cargar el esquema preferencial:", error);
    alert("Hubo un error al cargar la información de asignaturas preferenciales. Por favor, intenta recargar la página.");
});

const EstadoApp = {
    materias: new Map(), // Se guardará: id -> { id, nombre, grupo, nodo, preferencial }

    limpiarTexto(texto) {
        return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();
    },

    validarLimites(idGrupo, idMateria, limiteGrupo) {
        if (this.materias.has(idMateria)) return true;

        if (this.materias.size >= LIMITE_GLOBAL) {
            alert(`Solo puedes seleccionar un máximo de ${LIMITE_GLOBAL} asignaturas en total.`);
            return false;
        }

        let countMateExp = 0;
        let countSocTal = 0;
        let countGrupo = 0;

        for (let data of this.materias.values()) {
            if (data.grupo === 'primera-opcion' || data.grupo === 'segunda-opcion') countMateExp++;
            if (data.grupo === 'cuarta-opcion' || data.grupo === 'quinta-opcion') countSocTal++;
            if (data.grupo === idGrupo) countGrupo++;
        }

        if (limiteGrupo !== undefined && countGrupo >= limiteGrupo) {
            alert(`No puedes seleccionar más de ${limiteGrupo} asignaturas de esta área en específico.`);
            return false;
        }

        if ((idGrupo === 'primera-opcion' || idGrupo === 'segunda-opcion') && countMateExp >= LIMITE_COMBINADO) {
            alert(`Solo puedes seleccionar un máximo de ${LIMITE_COMBINADO} asignaturas en total entre el Área Matemáticas y el Área Experimentales.`);
            return false;
        }

        if ((idGrupo === 'cuarta-opcion' || idGrupo === 'quinta-opcion') && countSocTal >= LIMITE_COMBINADO) {
            alert(`Solo puedes seleccionar un máximo de ${LIMITE_COMBINADO} asignaturas en total entre el Área Sociales y el Área Talleres.`);
            return false;
        }

        return true;
    },

    toggleMateria(nodo, limiteGrupo) {
        const idMateria = nodo.id;
        const parentUl = nodo.closest('ul');
        if (!parentUl) return;

        const idGrupo = parentUl.id;
        const nombre = nodo.innerText;

        if (idMateria === "to1") {
            alert("La asignatura 'Filosofía (OBLIGATORIA)' no puede ser deseleccionada.");
            return;
        }

        if (this.materias.has(idMateria)) {
            // Quitar materia
            this.materias.delete(idMateria);
            nodo.classList.remove("seleccionado");
            nodo.style.backgroundColor = "";
        } else {
            // Agregar materia
            if (this.validarLimites(idGrupo, idMateria, limiteGrupo)) {
                this.materias.set(idMateria, { id: idMateria, nombre: nombre, grupo: idGrupo, preferencial: false, nodo: nodo });
                nodo.classList.add("seleccionado");
                nodo.style.backgroundColor = "#FAB828";
            }
        }
        actualizarTablaVista();
    },

    forzarFilosofia() {
        const nodoFilosofia = document.getElementById("to1");
        if (nodoFilosofia && !this.materias.has("to1")) {
            this.materias.set("to1", { id: "to1", nombre: nodoFilosofia.innerText, grupo: "tercera-opcion", preferencial: false, nodo: nodoFilosofia });
            nodoFilosofia.classList.add("seleccionado");
            nodoFilosofia.style.backgroundColor = "#FAB828";
        }
    },

    limpiarSelecciones() {
        for (let [id, data] of this.materias.entries()) {
            if (id !== "to1") {
                data.nodo.classList.remove("seleccionado", "preferencial");
                data.nodo.style.backgroundColor = "";
                this.materias.delete(id);
            }
        }
        actualizarTablaVista();
    },

    aplicarPreferenciales(carrera) {
        this.limpiarSelecciones();

        if (!carrera) return;

        const materiasRelacionadas = [];
        for (const [materia, carreras] of Object.entries(ESQUEMA_PREFERENCIAL)) {
            if (carreras.includes(carrera)) {
                materiasRelacionadas.push(this.limpiarTexto(materia));
            }
        }

        const todosLosNodos = document.querySelectorAll(".materia");
        todosLosNodos.forEach(nodo => {
            if (nodo.id === "to1") return; // Filosofía ya está fija

            const nombreLimpio = this.limpiarTexto(nodo.innerText);
            const esPreferencial = materiasRelacionadas.some(pref => nombreLimpio.includes(this.limpiarTexto(pref)));

            if (esPreferencial) {
                const parentUl = nodo.closest('ul');
                if (parentUl) {
                    const idGrupo = parentUl.id;
                    this.materias.set(nodo.id, { id: nodo.id, nombre: nodo.innerText, grupo: idGrupo, preferencial: true, nodo: nodo });
                    nodo.classList.add("seleccionado", "preferencial");
                    nodo.style.backgroundColor = "#FAB828";
                }
            }
        });

        actualizarTablaVista();
    }
};

// Esta es la función que manda a llamar el HTML.
window.manejarSeleccion = function(entidad, limite) {
    EstadoApp.toggleMateria(entidad, limite);
};

// Esta función elimina una seleccion
window.eliminarSeleccion = function(idMateria) {
    if (idMateria === "to1") {
        alert("La asignatura 'Filosofía (OBLIGATORIA)' no puede ser eliminada.");
        return;
    }
    const data = EstadoApp.materias.get(idMateria);
    if (data) {
        EstadoApp.materias.delete(idMateria);
        data.nodo.classList.remove("seleccionado");
        data.nodo.style.backgroundColor = "";
        actualizarTablaVista();
    }
};

function actualizarTablaVista() {
    const tabla = document.getElementById("tablaMaterias");
    if (!tabla) return;

    const filas = tabla.getElementsByTagName("tbody")[0];
    filas.innerHTML = "";

    const seleccionadas = Array.from(EstadoApp.materias.values());

    seleccionadas.forEach((materia) => {
        const fila = filas.insertRow();
        const celdaMateria = fila.insertCell(0);
        const celdaAccion = fila.insertCell(1);

        celdaMateria.textContent = materia.nombre;

        if (materia.id === "to1") {
            celdaAccion.innerHTML = `<span>No se puede eliminar</span>`;
        } else {
            celdaAccion.innerHTML = `<button class="btn btn-sm btn-danger" onclick="eliminarSeleccion('${materia.id}')">Eliminar</button>`;
        }
    });

    const boton = document.getElementById("botonGenerarPDF");
    if (boton) {
        boton.disabled = EstadoApp.materias.size !== LIMITE_GLOBAL;
    }
}

// Inicialización de la app
document.addEventListener("DOMContentLoaded", () => {
    // Aseguramos a Filosofía desde el inicio
    EstadoApp.forzarFilosofia();
    actualizarTablaVista();
});

$(function () {
    const $carreras = $("#carreras");

    if (!$carreras.length) return;

    $carreras.select2({
        placeholder: "Elige una opción",
        allowClear: true,
        language: "es",
    });

    $carreras.val(null).trigger("change");

    $carreras.on("change", function () {
        const carreraSeleccionada = $(this).val(); // Usamos 'this' para no volver a evaluar la variable

        EstadoApp.aplicarPreferenciales(carreraSeleccionada);
    });
});

// Generación del PDF
window.generarPDF = async function() {
    if (EstadoApp.materias.size !== LIMITE_GLOBAL) {
        alert(`Debes seleccionar exactamente ${LIMITE_GLOBAL} asignaturas antes de generar el PDF.`);
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const carreras = document.getElementById("carreras").value;

    doc.setFontSize(18);
    doc.setTextColor("#372F92");
    doc.text("Selección De Asignaturas (simulador)", 15, 15);

    doc.setFontSize(10);
    doc.text("CCH Oriente > Estudiantes > Psicopedagogía", 15, 20);

    if (carreras) {
        doc.setFontSize(10);
        doc.setTextColor("#000000");
        doc.text(carreras, 15, 25);
    }

    const materiasArray = Array.from(EstadoApp.materias.values()).map(
        (m, index) => [index + 1, m.nombre],
    );

    doc.autoTable({
        head: [["#", "Asignatura"]],
        body: materiasArray,
        startY: carreras ? 30 : 30,
        theme: "grid",
        headStyles: { fillColor: "#FAB828", textColor: "#372F92", fontSize: 10 },
        bodyStyles: { textColor: "#372F92", fontSize: 8 },
        alternateRowStyles: { fillColor: "#FDE6AC" },
        columnStyles: {
            0: { cellWidth: 20 },
            1: { cellWidth: 80 },
        },
        margin: { top: 30, left: 20, right: 20 },
    });

    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.text("CCH Oriente, UNAM  " + new Date().toLocaleDateString(), 15, pageHeight - 10);

    doc.save("asignaturas_seleccionadas_personalizado.pdf");
};
