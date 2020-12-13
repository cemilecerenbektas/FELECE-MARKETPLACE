;(function ($, w) {
	'use strict';
	if (!w.jQuery) {
		throw 'customTheme: jQuery not found';
	}
	w.customTheme.navigationMenu = {

		activeClass: 'active',
		bodyActiveClass: 'navigation-active',
		onNavigation: false,

		init: function () {
			if ($('#navigation').length == 0) {
				return;
			}
			this.mobile.init();
			this.controlMedia();
			this.createOverlay();
			this.eventListener();
		},
		
		mobile: {
			activeClass: 'active',
			menuRendered: false,
			mobileMenuId: 'mobile-navigation',

			init: function () {
				this.eventListener();
			},

			openSubCategories: function (element) {
				if (element.hasClass(this.activeClass)) {
					element.removeClass(this.activeClass);
				} else {
					var subCategoryHeight = element.find('> div').outerHeight();
					$('#' + this.mobileMenuId).scrollTop(0);
					$('.' + this.mobileMenuId).css('height',subCategoryHeight);
					element.addClass(this.activeClass);
				}
			},

			closeSubCategories: function (element) {
				element.parent('.has-sub-category').removeClass(this.activeClass);
				if(element.hasClass('category-level-2')) {
					$('.' + this.mobileMenuId).css('height','auto');
				}
				if(element.hasClass('category-level-3')) {
					var subCategoryHeight = element.parents('.category-level-2').outerHeight();
					$('.' + this.mobileMenuId).css('height',subCategoryHeight);
				}
			},

			toggleNavigation: function () {
				if ($('body').hasClass(customTheme.navigationMenu.bodyActiveClass)) {
					$('body').removeClass(customTheme.navigationMenu.bodyActiveClass);
				} else {
					$('body').addClass(customTheme.navigationMenu.bodyActiveClass);
				}
			},

			eventListener: function () {
				var self = this;
				$(document).on('click', '[data-selector="toggle-bar"]', function (e) {
					e.stopPropagation();
					self.toggleNavigation();
				});

				$(document).on('click', '.navigation-search', function (e) {
					e.stopPropagation();
					self.toggleNavigation();
				});

				$(document).on('click', '#' + self.mobileMenuId, function (e) {
					e.stopPropagation();
				});

				$(document).on('click', '#' + self.mobileMenuId + ' .has-sub-category a', function () {
					self.openSubCategories($(this).parent());
				});

				$(document).on('click', '.mobile-navigation-back', function () {
					self.closeSubCategories($(this).parent());
				});
			}

		},

		createOverlay: function () {
			$('body').append('<div class="navigation-menu-overlay" />');
		},
		
		overflowControl: function(element) {
			var containerOffset = $('#navigation').outerWidth() + $('#navigation').offset().left;
			var elementOffset = element.find('> div').offset().left + element.find('> div').outerWidth()
			if(elementOffset > containerOffset) {
				element.find('> div').css({
					marginLeft: '-' + (elementOffset - containerOffset) + 'px'
				});
			}
		},

		openDropMenu: function (element) {
			if(element.hasClass('has-sub-category')) {
				$('body').addClass(this.bodyActiveClass);
				//this.overflowControl(element);
			}
			element.addClass(this.activeClass).siblings().removeClass(this.activeClass);
		},

		closeDropMenu: function (element) {
			element.removeClass(this.activeClass);
			$('body').removeClass(this.bodyActiveClass);
		},

		controlMedia: function () {
			/*if (window.matchMedia('(max-width: 991px)').matches) {
				this.mobile.buildMenu();
			}*/
		},

		eventListener: function () {
			var self = this;
			$(document).on('click', function () {
				if ($('body').hasClass(self.bodyActiveClass)) {
					$('body').removeClass(self.bodyActiveClass);
				}
			});
			
			$(document).on('mouseenter', '[data-selector="first-level-navigation"]', function() {
				var element = $(this);
				if(self.onNavigation == false) {
					window.timeout = setTimeout(function() {
						self.openDropMenu(element);
					}, 200);
				} else {
					self.openDropMenu(element);
				}
			});
			
			$(document).on('mouseleave', '[data-selector="first-level-navigation"]', function() {
				clearTimeout(window.timeout);
				self.closeDropMenu($(this));
			});

			$(document).on('mouseenter', '#navigation', function() {
				self.onNavigation = true;
			});

			$(document).on('mouseleave', '#navigation', function() {
				self.onNavigation = false;
				clearTimeout(window.timeout);
			});
			
			$(window).on('resize', function () {
				self.controlMedia();
			});

		}
	}
})(jQuery, window);