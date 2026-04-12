document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {

        initialView: 'dayGridMonth',
        firstDay:'1',
        locale: 'es',
        initialDate: '2025-08-01',
        
        buttonText: {
            today: 'Hoy'
        },
        
        events: [


            // ** INICIO DE CALENDARIO 26-1 **

            //agosto
            {
                title: "Periodo Interanual o intersemestral",
                start: "2025-07-28",
                end: "2025-08-09",
                color: "#50b7b9",
            },

           

            //septiembre
                        {
                title: "Inicio de Clases",
                start: "2025-09-01",
                end: "2025-09-01",
                color: "green",
            },

            {
                title: "Día Inhábil",
                start: "2025-09-15",
                end: "2025-09-15",
                color: "#067fa9",
            },

            {
                title: "Día Inhábil",
                start: "2025-09-16",
                end: "2025-09-16",
                color: "#067fa9",
            },

            //octubre


            //noviembre
            {
                title: "Día Inhábil",
                start: "2025-11-01",
                end: "2025-11-01",
                color: "#067fa9",
            },

            {
                title: "Día Inhábil",
                start: "2025-11-02",
                end: "2025-11-02",
                color: "#067fa9",
            },

            {
                title: "Día Inhábil",
                start: "2025-11-17",
                end: "2025-11-17",
                color: "#067fa9",
            },

            //diciembre
            {
                title: "Día Inhábil",
                start: "2025-12-12",
                end: "2025-12-12",
                color: "#067fa9",
            },
                        {
                title: "Día Inhábil",
                start: "2025-12-25",
                end: "2025-12-25",
                color: "#067fa9",
            },
          
            {
                title: "Vacaciones Académico Administrativas",
                start: "2025-12-15",
                end: "2026-01-03",
                color: "#a8b707",
            },  
            //enero
            {
                title: "Día Inhábil",
                start: "2026-01-01",
                end: "2026-01-01",
                color: "#067fa9",
            },                        
            {
                title: "Fin de Clases",
                start: "2026-01-09",
                end: "2026-01-09",
                color: "red",
            },

            {
                title: "Exámenes",
                start: "2026-01-12",
                end: "2026-01-24",
                color: "#f2accb",
                type: "exam",
                classNames: ["evento-con-imagen"]
            },

            {
                title: "Periodo Interanual o Intersemestral",
                start: "2026-01-26",
                end: "2026-01-31",
                color: "#44cad3",
            },
            //febrero
            {
                title: "Día Inhábil",
                start: "2026-02-02",
                end: "2026-02-02",
                color: "#067fa9",
            }, 
            {
                title: "Inicio de Clases",
                start: "2026-02-03",
                end: "2026-02-03",
                color: "green",
            },
            //Marzo
            {
                title: "Día Inhábil",
                start: "2026-03-16",
                end: "2026-03-16",
                color: "#067fa9",
            },            
            {
                title: "Asueto Académico",
                start: "2026-03-30",
                end: "2026-04-04",
                color: "#f18b2f",
            },
            //abril

            //mayo
            {
                title: "Día Inhábil",
                start: "2026-05-01",
                end: "2026-05-01",
                color: "#067fa9",
            },
            {
                title: "Día Inhábil",
                start: "2026-05-10",
                end: "2026-05-10",
                color: "#067fa9",
            },
            {
                title: "Día Inhábil",
                start: "2026-05-15",
                end: "2026-05-15",
                color: "#067fa9",
            },  
            {
                title: "Fin de Clases",
                start: "2026-05-29",
                end: "2026-05-29",
                color: "red",
            },                                                
            //junio
            {
                title: "Exámenes",
                start: "2026-06-01",
                end: "2026-06-13",
                color: "#f2accb",
            },
            {
                title: "Periodo Interanual o Intersemestral",
                start: "2026-06-15",
                end: "2026-07-04",
                color: "#44cad3",
            },
            //julio
          
            {
                title: "Vacaciones Académico-Administrativas",
                start: "2026-07-06",
                end: "2026-07-25",
                color: "#a8b707",
            },
            {
                title: "Periodo Interanual o Intersemestral",
                start: "2026-07-27",
                end: "2026-08-08",
                color: "#44cad3",
            },     
            //agosto
            {
                title: "Inicio de Clases",
                start: "2026-08-10",
                end: "2026-08-10",
                color: "green",
            },

           
        ],
        eventClick: function (info) {
            var event = info.event;
            if (event.extendedProps.type === "event1") {
                $("#event1").modal("show");
                $("#normalEventText").text(event.title);
            } else if (event.extendedProps.type === "exam") {
                $("#exam").modal("show");
                $("#examEventText").text(event.title);
            } else if (event.extendedProps.type === "event3") {
                $("#event3").modal("show");
            }

        }


    });
    calendar.render();
});