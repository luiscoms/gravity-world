/*global me: true, game: true */
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init("screen", 960, 640, true, 'auto')) {
            window.alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(this, debugPanel, "debug");
            });
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

        // register our entities in the object pool
        me.pool.register("Rock", game.Player);
        me.pool.register("Coin", game.Coin);
        me.pool.register("Down", game.GravityEntity);
        me.pool.register("Up", game.GravityEntity);
        me.pool.register("Shell", game.Shell);

        // enable the keyboard
        me.input.bindKey(me.input.KEY.ESC, "esc");
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");

        // Start the game.
        me.state.change(me.state.MENU);
    }
};


