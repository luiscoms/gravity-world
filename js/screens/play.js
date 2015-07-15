game.PlayScreen = me.ScreenObject.extend({
    init : function () {},

    onLevelLoaded : function(levelName) {
        // console.log('onLevelLoaded')
        game.Rock = me.game.world.getChildByName("Rock")[0];

        me.sys.gravity = 0.98; // default value: 0.98 (earth gravity)

        if ('gravity' in me.game.currentLevel) {
            switch (me.game.currentLevel.gravity) {
                case 'up':
                    if (me.sys.gravity > 0) {
                        me.sys.gravity *= -1;
                        game.Rock.flipY(true);
                    }
                    break;
                case 'down':
                    if (me.sys.gravity < 0) {
                        game.Rock.flipY(false);
                        me.sys.gravity *= -1;
                    }
                    break;
            }
        }
    },

    drawButtons: function() {

// me.input.registerPointerEvent("pointerdown", me.game.viewport, function (event) {
//     me.event.publish("pointerdown", [ event ]);
// });

// me.input.registerPointerEvent("pointerup", me.game.viewport, function (event) {
//     me.event.publish("pointerdown", [ event ]);
// });

// this.pointerDown = me.event.subscribe("pointerdown", function (event) {
//     console.log("down", event.pointerId, event.gameX, event.gameY); // etc ...
// });

// this.pointerUp = me.event.subscribe("pointerup", function (event) {
//     console.log("up", event.pointerId, event.gameX, event.gameY); // etc ...
// });

    },
    onResetEvent: function(info) {
        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);

        me.game.onLevelLoaded = this.onLevelLoaded.bind(this);
        var stagename;
        if (info) {
            stagename = 'stage-' + strPad(info.world, 2, 0) + '.' + strPad(info.stage, 2, 0);
        } else {
            stagename = 'demo';
        }
        // load a level
        me.levelDirector.loadLevel(stagename);
    },
    onDestroyEvent: function() {
        // remove the HUD from the game world
        // me.game.world.removeChild(this.HUD);

        // me.event.unsubscribe(this.pointerDown);
    }
});
