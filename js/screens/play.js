game.PlayScreen = me.ScreenObject.extend({
	 // constructor
	init: function() {
		this.parent(true);
		me.input.bindKey(me.input.KEY.ESC, 'escape', true);
	},

	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		console.log('hehe');// play the audio track
		//me.audio.playTrack("DST-InertExponent");

		// load a level
		me.levelDirector.loadLevel("level1.1");
		// add a default HUD to the game mngr
		me.game.addHUD(0, 0, 480, 22, '#CCCCCC');
		// add a new HUD item
		me.game.HUD.addItem("coins", new game.CoinsObject(465, 0));
		// make sure everything is in the right order
		me.game.sort();
	},
	update: function() {
		alive = true;
		try {
			alive = me.game.getEntityByName('rock')[0].alive;
		} catch (e) {}
		// loads menu
		if (!alive || me.input.isKeyPressed('escape')) {
			me.state.change(me.state.PLAY);
		}
		return true;
	},

	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD
		me.game.disableHUD();

		// stop the current audio track
		me.audio.stopTrack();
	}
});
