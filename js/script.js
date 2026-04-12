//BACK TO TOP  

//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
	scrollFunction();
};

function scrollFunction() {
	if (
		document.body.scrollTop > 20 ||
		document.documentElement.scrollTop > 20
	) {
		mybutton.style.display = "block";
	} else {
		mybutton.style.display = "none";
	}
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

(function ($) {

	'use strict';


	// Sticky Menu

	$(window).scroll(function () {

		var height = $('.top-header').innerHeight();

		if ($('header').offset().top > 10) {

			$('.top-header').addClass('hide');

			$('.navigation').addClass('nav-bg');

			$('.navigation').css('margin-top', '-' + height + 'px');

		} else {

			$('.top-header').removeClass('hide');

			$('.navigation').removeClass('nav-bg');

			$('.navigation').css('margin-top', '-' + 0 + 'px');

		}
		(function ($) {

			'use strict';

			// Función para contar
			function counter() {
				var oTop;
				if ($('.count').length !== 0) {
					oTop = $('.count').offset().top - window.innerHeight;
				}

				if ($(window).scrollTop() > oTop) {
					$('.count').each(function () {
						var $this = $(this);
						var countTo = $this.attr('data-count');

						$({ countNum: $this.text() }).animate(
							{
								countNum: countTo
							},
							{
								duration: 1000,
								easing: 'swing',
								step: function () {
									$this.text(Math.floor(this.countNum));
								},
								complete: function () {
									$this.text(this.countNum);
								}
							}
						);
					});
				}
			}

			// Llama a la función counter cuando se carga la página
			$(document).ready(function () {
				counter();

				// Llama a la función counter cuando se desplaza la página
				$(window).on('scroll', function () {
					counter();
				});
			});

			// El resto de tu código aquí...

		})(jQuery);



	});

	//Swiper//
	const swiper = new Swiper(".swiper-slider", {
		// Optional parameters
		centeredSlides: true,
		slidesPerView: 1,
		grabCursor: true,
		freeMode: false,
		loop: true,
		mousewheel: false,
		keyboard: {
			enabled: true
		},

		// Enabled autoplay mode
		autoplay: {
			delay: 4500,
			disableOnInteraction: true
		},

		// If we need pagination
		pagination: {
			el: ".swiper-pagination",
			dynamicBullets: false,
			clickable: true
		},

		// If we need navigation
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},

		// Responsive breakpoints
		breakpoints: {
			640: {
				slidesPerView: 1.25,
				spaceBetween: 20
			},
			800: {
				slidesPerView: 3,
				spaceBetween: 20
			},
			1024: {
				slidesPerView: 4,
				spaceBetween: 20
			}
		}
	});

	//Fancybox
	Fancybox.bind("[data-fancybox]", {
		// Your custom options
	});


	// Background-images

	$('[data-background]').each(function () {

		$(this).css({

			'background-image': 'url(' + $(this).data('background') + ')'

		});

	});

	// venobox popup
	$(document).ready(function () {

		$('.venobox').venobox();

	});

	// filter

	$(document).ready(function () {
		var containerEl = document.querySelector('.filtr-container');
		var filterizd;

		if (containerEl) {

			filterizd = $('.filtr-container').filterizr({});
		}

		//Active changer

		$('.filter-controls li').on('click', function () {

			$('.filter-controls li').removeClass('active');

			$(this).addClass('active');

		});

	});

})(jQuery);
