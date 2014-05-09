/*global game: true, me: true */
/**
 * a HUD container and child items
 */
game.HUD = game.HUD || {};

game.HUD.Container = me.ObjectContainer.extend({

    init: function() {
        // call the constructor
        this.parent();

        // persistent across level change
        this.isPersistent = true;

        // non collidable
        this.collidable = false;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        // add our child score object at the right-top position
        this.addChild(new game.HUD.ScoreItem(950, 5));

        var HiddenButton = me.DraggableEntity.extend({
            init: function (x, y, settings) {
                // call the parent constructor
                this.parent(x, y, settings);
                // set the direction of button
                this.direction = settings.direction;
            },
            update: function () {
                switch (game.Rock.walking) {
                    case "right":
                        game.Rock.walkRight();
                        break;
                    case "left":
                        game.Rock.walkLeft();
                        break;
                }

                return true;
            },
            draw: function (context) {
                //context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
            },
            dragStart: function (e) {
                // call the parent function
                this.parent(e);
                game.Rock.walking = this.direction;
            },
            dragEnd: function (e) {
                // call the parent function
                this.parent(e);
                game.Rock.walking = false;
                game.Rock.stop();
            },
            dragMove: function () {}
        });

        this.addChild(
            new game.HUD.GUI_Button({
                "image" : "bt-84x72",
                "subimage" : "bback",
                "opacity" : 0.5,
                x: 10,
                y: 560//,
                // "onClick" : function () {
                //     me.state.change(me.state.PLAY);
                //     return true;
                // }
            }),
            2 // z-index
        );

        // Add a button
        this.addChild(
            new HiddenButton(10, 560, { width: 84, height: 72, "direction" : "left" })
        );

        this.addChild(
            new game.HUD.GUI_Button({
                "image" : "bt-84x72",
                "subimage" : "bfront",
                "opacity" : 0.5,
                x: 870,
                y: 560//,
                // "onClick" : function () {
                //     me.state.change(me.state.PLAY);
                //     return true;
                // }
            }),
            2 // z-index
        );

        // Add a button
        this.addChild(
            new HiddenButton(870, 560, { width: 84, height: 72, "direction" : "right" })
        );

        this.addChild(
            new game.HUD.Joystick()
        );
    }
});

game.HUD.Joystick = me.ObjectContainer.extend({
    update : function() {
        if (!game.Rock.walking && me.input.isKeyPressed('left')) {
            game.Rock.walkLeft();
        } else if (!game.Rock.walking && me.input.isKeyPressed('right')) {
            game.Rock.walkRight();
        } else if (!game.Rock.walking) {
            game.Rock.stop();
        }
    }
});

/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {

        // call the parent constructor
        // (size does not matter here)
        this.parent(new me.Vector2d(x, y), 10, 10);

        // create a font
        this.font = new me.Font("Marker-Felt, Arial, sans-serif", 20, "black", "right");

        // local copy of the global score
        this.score = -1;

        // make sure we use screen coordinates
        this.floating = true;
    },

    /**
     * update function
     */
    update : function () {
        // we don't do anything fancy here, so just
        // return true if the score has been updated
        if (this.score !== game.data.score) {
            this.score = game.data.score;
            return true;
        }
        return false;
    },

    /**
     * draw the score
     */
    draw : function (context) {
        this.font.draw(context, game.data.score, this.pos.x, this.pos.y);
    }
});

game.HUD.GUI_Button = me.ObjectContainer.extend({
    init: function (settings) {
        console.log("GUI_Button init!");
        // call the parent constructor
        this.parent();

        var x = settings.x || 0, y = settings.y || 0, z = 1;

        if (settings.centerX) {
            x = (960 / 2) - (me.loader.getImage(settings.image).width / 2);
        }
        if (settings.centerY) {
            y = (640 / 2) - (me.loader.getImage(settings.image).height / 2);
        }

        var ImageButton = me.GUI_Object.extend({
            init: function (x, y, settings) {
                // call the parent constructor
                this.parent(x, y, settings);

                this.setOpacity(settings.opacity);
            },
            onClick : function() {
                if (typeof settings.onClick === 'function') {
                    settings.onClick();
                }
            }
        });

        // Add a button
        this.addChild(
            new ImageButton(x, y, { "image" : settings.image, "opacity" : settings.opacity }), z
        );

        if (settings.subimage) {
            // centralize subimage
            x += (me.loader.getImage(settings.image).width - me.loader.getImage(settings.subimage).width) / 2;
            y += (me.loader.getImage(settings.image).height - me.loader.getImage(settings.subimage).height) / 2;
            // Add a textimage
            this.addChild(
                new ImageButton(x, y, { "image" : settings.subimage, "opacity" : settings.opacity  }), z+1
            );
        }

        return true;
    }
});
