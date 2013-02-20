(function() {
	window.MM = {
		init: function() {
			MM.game = new Models.MatchGame({ difficulty: 'easy'});


			MM.game.newRound();
			MM.roundView = new Views.RoundView({
				model: MM.game.round,
				el: $('#game')
			});
			
	        R.ready(function() {
	            R.request({
	                method: getTopCharts,
	                content: {
	                    type: 'Album',
	                    count: 100,
	                    extras: '-*,name,key,icon,url,artist,trackKeys'
	                },
	                success: function(data) {
	                	MM.game.set('top100', data.result);
	                }
	            });
	        });
		}
	};

	$(document).ready(function() {
		MM.init();
	});
})()