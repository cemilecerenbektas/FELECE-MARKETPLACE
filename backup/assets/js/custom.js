;(function ($, w) {
	'use strict';
	if (!w.jQuery) {
		throw 'CustomApp: jQuery not found';
	}
	w.customTheme = {

		init: function () {
			customTheme.navigationMenu.init();
			this.eventListener();
			this.afterInit();
		},

		afterInit: function () {
            this.initSlider('.slider');
        },
        
        initSlider: function (element) {
			if ($(element).length == 0) {
				return;
			}
			$(element).slick({
				autoplay: true,
				autoplaySpeed: 6000,
				arrows: false,
				dots: true,
				infinite: true,
				speed: 300,
				slidesToShow: 1,
				slidesToScroll: 1,
				fade: true,
				cssEase: 'ease-in-out',
				adaptiveHeight: true,
				prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"><i class="fas fa-angle-left"></i></button>',
				nextArrow: '<button type="button" class="slick-next" aria-label="Next"><i class="fas fa-angle-right"></i></button>'
			});
			$(element).on('afterChange', function(event, slick, currentSlide) {
				if((slick.$slides.length - slick.options.slidesToShow) <= currentSlide) {
					$(element).slick('slickGoTo', 0);
				}
			});
		},

		eventListener: function () {
			var self = this;
			$(document).on('click tap', '[data-selector="openbox-close"]', function() {
				openBox.reset();
			});
		}
	},
	w.openBox = {
		selector: '.openbox',
		selectorParent: '.openbox-container',
		speed: 200,
		activeClass: 'active',
		targetClass: 'openbox-content',
		closeClass: 'openbox-close',
		overlayClass: 'openbox-overlay',
		activeBox: null,

		init: function () {
			this.build();
			this.mouseup();
			this.eventListener();
		},
		build: function () {
			var self = this;
			$(this.selector).each(function () {
				var target = $(this).attr('data-target');
				var overlay = $(this).attr('data-overlay');

				if (overlay) {
					if (overlay == 'inside') {
						$(this).parent().append('<div class="' + self.overlayClass + ' ' + target + '-overlay" />');
					} else {
						$('body').append('<div class="' + self.overlayClass + ' ' + target + '-overlay" />');
					}
				}
				if ($(this).data('close')) {
					$('.' + target).append('<div class="' + self.closeClass + '" />');
				}

			});
		},
		mouseenter: function (element) {
			var target = $('.' + element.attr('data-target'));
			var overlay = $('.' + element.attr('data-target') + '-overlay');
			var beforeCallback = new Function(element.attr('data-callback-before'));
			var speed = element.attr('data-speed') || this.speed;

			switch (element.attr('data-mode')) {
				case 'slide':
					this.slideDown(target, speed, beforeCallback);
					break;
				case 'custom':
					break;
				default:
					this.show(target, speed, beforeCallback);
					break;
			}

			this.reset();
			this.addClasses(element);
			this.show(overlay, speed);
			this.activeBox = element;
		},
		click: function (element) {
			var target = $('.' + element.attr('data-target'));
			var overlay = $('.' + element.attr('data-target') + '-overlay');
			var beforeCallback = new Function(element.attr('data-callback-before'));
			var speed = element.attr('data-speed') || this.speed;
			if (element.hasClass(this.activeClass)) {
				this.reset();
			} else {

				switch (element.attr('data-mode')) {
					case 'slide':
						this.slideDown(target, speed, beforeCallback);
						break;
					case 'custom':
						break;
					default:
						this.show(target, speed, beforeCallback);
						break;
				}
				this.reset();
				this.mouseup();
				this.addClasses(element);
				this.show(overlay, speed);
				this.activeBox = element;
			}
		},
		mouseup: function () {
			var self = this;
			$(document).bind('mouseup tap', function (e) {
				if (!$('.' + self.targetClass).is(e.target) && $('.' + self.targetClass).has(e.target).length == 0 && !$(self.selector).is(e.target) && !$(self.selector).find('*').is(e.target)) {
					self.reset();
				}
			});
		},
		addClasses: function (element) {
			$(this.selector).removeClass(this.activeClass);
			$('body').addClass(element.attr('data-target') + '-active');
			element.addClass(this.activeClass);
		},
		show: function (element, speed, cbbefore) {
			element.stop(true, true).fadeIn(speed, cbbefore);
		},
		hide: function (element, afterCallback) {
			element.stop(true).fadeOut(100, afterCallback);
		},
		slideDown: function (element, speed, beforeCallback) {
			element.stop(true, true).slideDown(speed, beforeCallback);
		},
		slideUp: function (element, cbafter) {
			element.stop(true).slideUp(100, cbafter);
		},

		reset: function () {
			if (this.activeBox) {
				var target = this.activeBox.attr('data-target');
				var afterCallback = new Function(this.activeBox.attr('data-callback-after'));

				switch (this.activeBox.attr('data-mode')) {
					case 'slide':
						this.slideUp($('.' + target), afterCallback);
						break;
					case 'custom':
						break;
					default:
						this.hide($('.' + target), afterCallback);
						break;
				}

				$('body').removeClass(target + '-active');
				this.activeBox = null;
			}
			$(this.selector).removeClass(this.activeClass);
			this.hide($('.' + this.overlayClass));
			$(document).unbind('mouseup');
		},

		eventListener: function () {
			var self = this;
			$(document).on('mouseenter', self.selector + '[data-event="hover"]', function () {
				self.mouseenter($(this));
			});
			$(document).on('click tap', self.selector + ':not([data-event="hover"])', function () {
				self.click($(this));
			});
			$(document).on('click tap', '.' + self.closeClass, function () {
				self.reset();
			});
		}

	}
})(jQuery, window);

$(function () {
	customTheme.init();
	openBox.init();
});

// Son aramalar
$(".search").click(function(event){
    event.stopPropagation();
  $(".search-suggestion").fadeToggle("fast");
  });
  $(document).click(function(e){
    if($(e.target).closest(".search-suggestion").length===0){
        $(".search-suggestion").hide();
    };
});

$(".search-content").click(function(event){
    event.stopPropagation();
  $(".search-suggestion").fadeToggle("fast");
  });
  $(document).click(function(e){
    if($(e.target).closest(".search-suggestion").length===0){
        $(".search-suggestion").hide();
    };
});