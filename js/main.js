(function() {
	window.MM = {
		init: function() {
			MM.game = new Models.MatchGame({ difficulty: 'easy'});
			MM.game.round = new Models.Round();
			MM.roundView = new Views.RoundView({
				model: MM.game.round,
				el: $('#game')
			});
		}
	};

	$(document).ready(function() {
		MM.init();
	});
})();