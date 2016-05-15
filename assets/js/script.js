$(window).load(function () {
    $('.preloader').addClass('loaded');
});

jQuery( document ).ready( function ( $ ) {
	'use strict';

	

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
		 * Fire all functions that will be used in the page.
		 */
		var events = function () {
			$('.champions-grid .champ-icon:not(.inactive)').click(selectChampion);
			$('.tag').click(toggleTags);
			$('.select-field').click(selectFieldOpen);
			$('.select-field li').click(selectFieldUpdate);
			$('.chat-submit').click(chatSubmit);
		};


		var init = function () {
			loadIcons('.champions-grid .champ-icon');
			loadIcons('.team-blue .champion-panel');
			loadIcons('.team-red .champion-panel');

			loadTimer();
			commentsForm();
		}

		var selectChampion = function (event) {
			var clickedImgUrl = $(event.toElement).attr('src');
			var currentImgUrl = $('.current-player .champ-icon img').attr('src');

			console.log(currentImgUrl);

			if( $('.current-player .champ-icon img').length == 0 || currentImgUrl != clickedImgUrl ) {
				$('.current-player .champ-icon img').remove();
				$('.current-player .champ-icon').append('<img src="' + clickedImgUrl + '">');
			}
		}

		var toggleTags = function () {
			$(this).siblings().removeClass('selected');
			$(this).addClass('selected');
		}

		var loadIcons = function ( element ) {
			var time = 0;

			$(element).each(function( el ) {
				var currElement = $(this);

				setTimeout( function(  ) {
					currElement.addClass('loaded');
				}, time);

				time += 100;
			});
		}

		var loadTimer = function () {

			var timer = setInterval( function() {
				if( _s.currentSeconds === 0) {
					clearInterval(timer);
				}
				$('.seconds').text(_s.currentSeconds--);


			}, 1000);

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
			});
		}

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

	setTimeout(function() {
		siteScripts.watchEvents(); // Begin watching for events.
		siteScripts.init();

		$('.client-window').addClass('visible');
	}, 1000);
	

});