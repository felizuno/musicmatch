(function() {
	window.Models = {};

	Models.MatchGame = Backbone.Model.extend({
		defaults: function() {
			this.top100 = [];
			this.usedAlbums = [];
			this.playerScore = 0;
			this.playerWins = 0;
			this.roundNumber = 1;
			//this.difficulty: 'easy' SHOULD INITIALIZE WITH THE DIFFICULTY
		},
		
		initialize: function() { 
			// THIS WILL BE INVOKED AUTOMATICALLY WHEN THE MODEL IS CREATED
			this.on('change:round', function(model) {
				alert('Round: ' + model.get('round')); // JUST FOR TESTING
				// DON'T FORGET THAT THE VIEW CAN ALSO LISTEN FOR CHANGES TO THE MODEL
				// SO THERE IS NO NEED TO DO ANY VIEW LISTENING HERE
			});
		},

		getGoal: function() {
			// MAKE A TEMPORARY ARRAY OF ALL THE ALBUMS IN this.top100 NOT ALREADY IN this.usedAlbums
			// SET A TEMP VARIABLE TO A RANDOM ALBUM FROM THAT TEMP ARRAY
			// THEN ADD THAT ALBUM TO this.usedAlbums
			// THEN REMOVE ALL THE TRACKS EXCEPT THE ONE WE WANT AS THE SAMPLE
			// THEN RETURN THAT ALBUM TO THE GAME
		},

		getFiller: function(gameGoal) {
			// CREATE A TEMP ARRAY FOR THE ALBUMS ALREADY CHOSEN AS FILLER
			// READ THE DIFFICULTY OF THE GAME AND USE A FOR LOOP TO MAKE SURE WE GENERATE THE RIGHT NUMBER OF FILLER ALBUMS
			// IN THE LOOP, FIND A RANDOM ALBUM THAT'S NOT ALREADY BEEN CHOSEN AND DOESN'T MATCH THE gameGoal PARAM
			// AFTER THE LOOP IS DONE, RETURN THE TEMP ARRAY OF FILLER ALBUMS
		}
	});

	Models.Round = Backbone.Model.extend({
		defaults: function() {
			// this.difficulty: '',  WHEN YOU MAKE A NEW ROUND, INITIALIZE IT WITH A DIFFICULTY ATTRIBUTE
			this.id = MM.game.get('roundNumber');
			// this.goal = MM.getGoal();
			// this.filler = MM.getFiller(this.goal);
			this.timer = 30;
		},

		initialize: function() {
			// THIS WILL BE INVOKED AUTOMATICALLY WHEN THE MODEL IS CREATED
		},

		getGameSong: function() {
			return this.goal.tracks[0];
		},

		changeTileBG: function() {},

		countdown: function() {
				if (this.timer >=1) {
					this.timer--;
					setTimeout(this.countdown, 1000);
				} else {
					// THIS IS PROBS DUMB, WHEN THE CHANGE TRIGGERS AND THE timer = 0, JUST REACT TO THAT
					//this.trigger('timeIsUp'); 
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
			// i.e. - 'click .pause': 'pause'
		},

		initialize: function() {
			this.updateTimer();
			this.listenTo(this.model, 'change:timer', this.updateTimer);
		},

		render: function() {},

		updateTimer: function() {
			console.log('$$$$');
			$('.timer').text(this.model.timer);
		},

		animateFlip: function() {}
	});
})();