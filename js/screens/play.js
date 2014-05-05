game.PlayScreen = me.ScreenObject.extend({
    onLevelLoaded : function(levelName) {

        // reset the score
        game.data.score = 0;
        me.sys.gravity = 0.98; // default value: 0.98 (earth gravity)

        game.Rock = me.game.world.getChildByName("Rock")[0];
        //console.log("onLevelLoaded", me.game.world.getChildByName("Rock").length, this, levelName);

        this.drawButtons();
    },

    drawButtons: function() {

        var ImageButton = me.GUI_Object.extend({
            "onClick" : function () {
                console.log("clicked!");
                return true;
            }
        });

        var TrueButton = me.DraggableEntity.extend({
            init: function (x, y, settings) {
                // call the parent constructor
                this.parent(x, y, settings);
                // set the color to white
                this.direction = settings.direction;
                // set the font we want to use
                this.font = new me.Font('Verdana', 15, 'black');
                this.font.bold();
                // set the text
                this.text = 'Drag me';
                this.walking = false;
            },
            /**
             * update function
             */
            update: function () {
                if (this.walking) {
                    console.log("vai")
                    if (this.direction == "right") {
                        game.Rock.walkRight();
                    } else {
                        game.Rock.walkLeft();
                    }
                }

                return true;
            },
            draw: function (context) {
                context.fillStyle = this.color;
                context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
                //this.font.draw(context, this.text, this.pos.x, this.pos.y);
            },
            dragStart: function (e) {
                // call the parent function
                this.parent(e);
                this.walking = true;
            },
            dragEnd: function (e) {
                // call the parent function
                this.parent(e);
                this.walking = false;
                game.Rock.stop();
            },
            dragMove: function () {}
        });

        // Add a button
        me.game.world.addChild(
            new ImageButton(10, 590, { "image" : "bback" }),
            2 // z-index
        );

        // Add a button
        me.game.world.addChild(
            new TrueButton(10, 590, { width: 40, height: 40, "direction" : "left" }),
            2 // z-index
        );

        // Add a button
        me.game.world.addChild(
            new ImageButton(910, 590, { width: 100, height: 100, "image" : "bfront" }),
            2 // z-index
        );
        // Add a button
        me.game.world.addChild(
            new TrueButton(910, 590, { width: 40, height: 40, "direction" : "right" }),
            2 // z-index
        );

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

    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.LEFT);
        // this.handler = me.event.subscribe(me.event.KEYDOWN, function (action) {
        //     if (action === "left") {
        //         console.log(action);
        //     }
        // });


        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);

        this.drawButtons();

        // me.event.subscribe(me.event.LEVEL_LOADED, function (a, b, c) {
        //     // console.log("loaded", this, b, c);
        //     // game.PlayScreen.drawButtons();
        // });

        me.game.onLevelLoaded = this.onLevelLoaded.bind(this);

        // load a level
        me.levelDirector.loadLevel("demo");
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        console.log("Destroy");
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);

        // me.event.unsubscribe(this.pointerDown);
    }
});
