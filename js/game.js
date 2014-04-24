
/* Game namespace */
var game = {
    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init("screen", 480, 320, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

		// add "#debug" to the URL to enable the debug Panel
		if (document.location.hash === "#debug") {
			window.onReady(function () {
				me.plugin.register.defer(debugPanel, "debug");
			});
			me.debug.renderHitBox = true;
		}

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

	// Run on game resources loaded.
	"loaded" : function () {
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());

		// set a global fading transition for the screen
		me.state.transition("fade", "#FFFFFF", 250);

		// add our player entity in the entity pool
		me.entityPool.add("Rock", game.PlayerEntity);
		me.entityPool.add("Up", game.GravityEntity);
		me.entityPool.add("Down", game.GravityEntity);
		me.entityPool.add("Coin", game.CoinEntity);

		// enable the keyboard
	//	me.input.bindKey(me.input.KEY.SPACE, "jump", true);
		me.input.bindKey(me.input.KEY.LEFT,   "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");

		// Start the game.
		me.state.change(me.state.MENU);
	}
};
