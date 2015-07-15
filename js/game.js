/*global me: true, game: true */
/** @namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        sound : false,
        score : 0,
        keys : 0,
        levels: [
            { reached: false },//1
            { reached: false },
            { reached: false },
            { reached: false },
            { reached: false },//5
            { reached: false },
            { reached: false },
            { reached: false },
            { reached: false },
            { reached: false },//10
            { reached: false },
            { reached: false },
            { reached: false },
            { reached: false },
            { reached: false },//15
        ]
    },

    stageLocked: function(stage, levels) {
        if (stage <= 1 || (levels[stage - 2] && levels[stage - 2].reached)) {
            return false;
        }
        if (levels[stage - 1] && !levels[stage - 1].reached) {
            return true;
        }
        return false;
    },

    reachStage: function(stage) {
        if (!isNaN(stage)) {
            game.data.levels[stage - 1].reached = true;
        }
        me.save.levels = game.data.levels;
        if (typeof social === "object") {
            social.reachStage(stage);
        }
    },

    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init('screen', me.video.CANVAS, 960, 640, true, 'auto')) {
            window.alert("Your browser does not support HTML5 canvas.");
            return;
        }

        //initialize saved data
        me.save.add(this.data);
        // this.data = me.save;

        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(this, debugPanel, "debug");
            });
        }

        // Initialize the audio.
        me.audio.init('ogg,mp3');

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.set(me.state.LOADING, new game.LoadingScreen());
        me.state.change(me.state.LOADING);
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.StageSelectScreen());
        me.state.set(me.state.READY, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.set(me.state.CREDITS, new game.AboutScreen());

        // set a global fading transition for the screen
        me.state.transition("fade", "#FFFFFF", 250);

        // register our entities in the object pool
        me.pool.register("Arrow", game.Arrow);
        me.pool.register("Rock", game.Player);
        me.pool.register("Mage", game.Mage);
        me.pool.register("Coin", game.Coin);
        me.pool.register("Down", game.GravityEntity);
        me.pool.register("Up", game.GravityEntity);
        me.pool.register("Shell", game.Shell);
        me.pool.register("Lock", game.Lock);
        me.pool.register("Detonator", game.Detonator);
        me.pool.register("Bomb", game.Bomb);
        me.pool.register("Key", game.Key);

        // enable the keyboard
        me.input.bindKey(me.input.KEY.ESC, "esc");
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");

        // Start the game.
        me.state.change(me.state.READY);
    }
};
