$(window).load(function () {
    $('.preloader').addClass('loaded');
});

jQuery( document ).ready( function ( $ ) {
	'use strict';

	// In miliseconds how long to wait before showing the screen.
	var LOAD_DELAY_TIME = 1000;

	// This batch of constants will fire after LOAD_DELAY_TIME, so
	// 0ms == 1000ms from .ready()
	var LOAD_DELAY_TIME_CHAMPIONS_PANEL_BLUE = 500;
	var LOAD_DELAY_TIME_CHAMPIONS_PANEL_RED = 500;
	var LOAD_DELAY_TIME_CHAMPIONS_GRID = 1000;

	/*
	|--------------------------------------------------------------------------
	| Developer mode
	|--------------------------------------------------------------------------
	|
	| Set to true - it will allow printing in the console. Alsways check for this
	| variables when running tests so you dont forget about certain console.logs.
	| Id needed for development testing this variable should be used.
	|
	*/
	var devMode = function() {
		return true;
	};

	/**
	 * Run alert only if devMode is on. This is only for testing purposes, if the
	 * alert is needed use the normal alert().
	 */
	var devAlert = function( string ) {
		if ( devMode() ) {
			alert( devMode() );
		}
	}

	// Disable console.log for production site.
	if ( ! devMode() ) {
		console.log = function() {}
	}


	/**
	 * Those will be events like clicking, dragging, scrolling or whatever
	 * that will change afer certain user interaction with the site. Default
	 * changes that are happening whitout the controll of the user should be
	 * in another object. Keep the WordPress coding guidelines for javascript.
	 */
	var siteScripts = (function () {

		/**
		 * Settings. Its ok to use jquery selectors in the functions and not
		 * set them here, but if they are used in more then one function and
		 * can be used as setting (like fixed element height) better to  set
		 * it here.
		 */
		var _s = {
			currentSeconds : parseInt( $('.team-red .seconds').text() )
		};

		/**
		 * Fire all functions that will be used in the page. Having them all here
		 * will ease up finding what fires certain events.
		 */
		var events = function () {
			$('.champions-grid .champ-icon:not(.inactive)').click(selectChampion);
			$('.tag').click(toggleTags);
			$('.select-field').click(selectFieldOpen);
			$('.select-field li').click(selectFieldUpdate);
			$('.chat-submit').click(chatSubmit);
		};

		/**
		 * Start building visually the interface. The thing with this is
		 * that the viewer has to see how the client view comes to life.
		 */
		var init = function () {
			// load_delay_time
			setTimeout(function() {
				loadIcons('.champions-grid .champ-icon', 1000);
			}, LOAD_DELAY_TIME_CHAMPIONS_GRID);

			setTimeout(function() {
				loadIcons('.team-blue .champion-panel', 2000);
			}, LOAD_DELAY_TIME_CHAMPIONS_PANEL_BLUE);

			setTimeout(function() {
				loadIcons('.team-red .champion-panel', 2000);
			}, LOAD_DELAY_TIME_CHAMPIONS_PANEL_RED);

			var messages = {
				"notaReaper": "I like turtles :)",
				"Mangak8": "y did u ban corki?",
				"Mangak8": "I will play mid",
				"FullMetalBr0": "hecarim mid ftw, gona rekt em",
				"notaReaper": "I like trains :)",
				"FullMetalBr0": "feed or troll 24/7 bruh",
				"Extenz": "We are gonna loose this one..",
				"notaReaper": "I like to smell glue :)",
				"FullMetalBr0": "reaper shut up retard",
				"Extenz": "I always get to play with idiots",
				"FullMetalBr0": "extenz just for you i will feed",
				"Extenz": "This is not happening right now ...",
				"Extenz": "Hecarim reported"
			};

			// console.log(messages);

			loadTimer();
			// for( var msg in messages ) writeComments(messages, msg, 0);
			commentsForm();
		}

		/**
		 * Clicking on the available champions must select them
		 * for the user playing the game.
		 * 
		 * @param  {obj} event The event (click in this case)
		 */
		var selectChampion = function (event) {
			var clickedImgUrl = $(event.toElement).attr('src');
			var currentImgUrl = $('.current-player .champ-icon img').attr('src');

			if( $('.current-player .champ-icon img').length == 0 || currentImgUrl != clickedImgUrl ) {
				$('.current-player .champ-icon img').remove();
				$('.current-player .champ-icon').append('<img src="' + clickedImgUrl + '">');
			}
		}

		/**
		 * Write some comments in the comment field to show interactivity.
		 */
		var writeComments = function( messages, msg, item ) {
			console.log(messages);
		}

		/**
		 * Toggle between "selected" class when picking a champion.
		 * This will allow to style it from CSS.
		 */
		var toggleTags = function () {
			$(this).siblings().removeClass('selected');
			$(this).addClass('selected');
		}

		/**
		 * Iterate through the champions and add .loaded class each 100 seconds.
		 * This will create smooth animation of showing them one by one.
		 * 
		 * @param  {string} The class for the icons.
		 */
		var loadIcons = function ( element, totalLoadTime ) {
			var time = 0;
			var delay = 100;

			if (undefined !== totalLoadTime) {
				delay = totalLoadTime / $(element).length;
			}

			$(element).each(function( el ) {
				var currElement = $(this);

				setTimeout( function(  ) {
					currElement.addClass('loaded');
				}, time);

				time += delay;
			});
		}

		var loadTimer = function () {

			var timer = setInterval( function() {
				if( _s.currentSeconds === 0) {
					clearInterval(timer);
				}
				$('.seconds').text(_s.currentSeconds--);

			}, LOAD_DELAY_TIME);

		}

		var selectFieldOpen = function(element) {
			var hasClass = $(this).hasClass('opened');

			$('.select-field.opened').removeClass('opened');

			if( ! hasClass ) {
				$(this).addClass('opened');
			}
		}

		var selectFieldUpdate = function () {
			var listText = $(this).text();
			var parentText = $(this).parent().parent().find('.text');

			parentText.text(listText);
		}

		var commentsForm = function () {
			$('.input-area').submit(function() {
				event.preventDefault();

				var inputContent = $('.chatbox-input').val();

				if( inputContent.trim().length > 0 ) {
					$('.chat-messages').append('<span class="chat-msg"><strong class="user">XavorTM:</strong> ' + inputContent + '</span>');
					$('.chatbox-input').val('');
				}

				$(".chat-messages").scrollTop($(".chat-messages")[0].scrollHeight);;
			});
		}

		/**
		 * Add message in the chat by appending <span> on enter.
		 */
		var chatSubmit = function() {
			var inputContent = $('.chatbox-input').val();

			if( inputContent.trim().length > 0 ) {
				$('.chat-messages').append('<span class="chat-msg"><strong class="user">XavorTM:</strong> ' + inputContent + '</span>');
				$('.chatbox-input').val('');
			}

		}

		/**
		 * Call the events.
		 * -> siteScripts.watch();
		 */
		return {
			watchEvents: events,
			init: init
		};

	})();

	/**
	 * How long to wait before adding the visible class
	 */
	setTimeout(function() {
		siteScripts.watchEvents(); // Begin watching for events.
		siteScripts.init();

		$('.client-window').addClass('visible');
	}, LOAD_DELAY_TIME);
	

});
