(function() {
	window.Models = {};

	Models.MatchGame = Backbone.Model.extend({
		defaults: function() {
			return {
				usedAlbums: [],
				playerScore: 0,
				playerWins: 0,
				roundCount: 0,
				difficulty: 'easy' //SHOULD INITIALIZE WITH THE DIFFICULTY
			}
		},
		
		initialize: function() { 
			// THIS WILL BE INVOKED AUTOMATICALLY WHEN THE MODEL IS CREATED
			this.on('change:roundCount', function(model) {
				console.log('Round: ' + model.get('roundCount'));
			});

			this.on('change:top100', function(model) {
				model.newRound();
			})
		},


		newRound: function() {
		// getGoal: function() {
		// 	// MAKE A TEMPORARY ARRAY OF ALL THE ALBUMS IN this.top100 NOT ALREADY IN this.usedAlbums
		// 	// SET A TEMP VARIABLE TO A RANDOM ALBUM FROM THAT TEMP ARRAY
		// 	// THEN ADD THAT ALBUM TO this.usedAlbums
		// 	// THEN REMOVE ALL THE TRACKS EXCEPT THE ONE WE WANT AS THE SAMPLE
		// 	// THEN RETURN THAT ALBUM TO THE GAME
		// },

		// getFiller: function(gameGoal) {
		// 	// CREATE A TEMP ARRAY FOR THE ALBUMS ALREADY CHOSEN AS FILLER
		// 	// READ THE DIFFICULTY OF THE GAME AND USE A FOR LOOP TO MAKE SURE WE GENERATE THE RIGHT NUMBER OF FILLER ALBUMS
		// 	// IN THE LOOP, FIND A RANDOM ALBUM THAT'S NOT ALREADY BEEN CHOSEN AND DOESN'T MATCH THE gameGoal PARAM
		// 	// AFTER THE LOOP IS DONE, RETURN THE TEMP ARRAY OF FILLER ALBUMS
		// },
			var newRoundNumber = (this.get('roundCount') + 1);
			
			this.round = new Models.Round({
				roundNumber: newRoundNumber,
				difficulty: this.get('difficulty')
			});

			this.set('roundCount', newRoundNumber);
		}
	});

	Models.Round = Backbone.Model.extend({
		defaults: function() {
			return {
			 // difficulty: '',  WHEN YOU MAKE A NEW ROUND, INITIALIZE IT WITH A DIFFICULTY ATTRIBUTE
			 // featuredAlbum: {},
			 // fillerAlbums: [],
				timer: 30,
				paused: true
			};
		},

		initialize: function() {
			// THIS WILL BE INVOKED AUTOMATICALLY WHEN THE MODEL IS CREATED
		},

		getGameSong: function() {
			return this.get('featuredAlbum').tracks[0];
		},

		changeTileBG: function() {},

		countdown: function() {
			if (this.get('paused')) {
				return;
			}

			var _timer = this.get('timer');
				if (_timer >=1) {
					this.set('timer', _timer - 1);
					setTimeout(_.bind(this.countdown, this), 1000);
				} else {
					this.trigger('timeIsUp'); 
				}
		}
	});
})();

(function() {
	window.Views = {};

	Views.RoundView = Backbone.View.extend({
		//el: $('#gameboard'),
		events: {
			// THE CLICK EVENTS FROM ANY HTML ELEMENTS INVOLVED IN THE ROUND
			// SHOULD BE HANDLED HERE
			//'click .tile': 'flip'
			// 'click .pause': 'NOT SURE HOW I TELL THE MODEL?'
		},

		initialize: function() {
			this.updateTimer();
			this.listenTo(this.model, 'change:timer', this.updateTimer);
			this.listenTo(this.model, 'timeIsUp', function() {_.bind(this.stopListening, this);});
		},

		render: function() {},

		updateTimer: function() {
			$('.timer').text(this.model.get('timer'));
		},

		animateFlip: function() {},
	});
})();