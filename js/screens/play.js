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
		// play the audio track
		//me.audio.playTrack("DST-InertExponent");

		// load a level
		me.levelDirector.loadLevel("demo1");

        game.data.score = 0;
        game.data.coins = 0;

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
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
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);

		// stop the current audio track
		me.audio.stopTrack();
	}
});
