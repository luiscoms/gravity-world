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

        // add our child coins object at the right-top position
        this.addChild(
            new game.HUD.ItemCount({
                'image' : 'key',
                'counter' : 'keys',
                'opacity' : 0.8,
                x: -330,
                y: 10
            }),
            2 // z-index
        );

        // add our child coins object at the right-top position
        this.addChild(
            new game.HUD.ItemCount({
                'image' : 'bcoin',
                'counter' : 'score',
                'opacity' : 0.8,
                x: -145,
                y: 10
            }),
            2 // z-index
        );

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

        // Home
        this.addChild(
            new game.HUD.GUI_Button({
                "image" : "bt01-84x72",
                "subimage" : "ahome",
                x: 10,
                y: 10,
                "onClick" : function () {
                    me.state.change(me.state.MENU);
                    return true;
                }
            }),
            2 // z-index
        );

        // Reload
        this.addChild(
            new game.HUD.GUI_Button({
                "image" : "bt01-84x72",
                "subimage" : "areload",
                x: 104,
                y: 10,
                "onClick" : function () {
                    me.levelDirector.reloadLevel();
                    return true;
                }
            }),
            2 // z-index
        );

        this.addChild(
            new game.HUD.GUI_Button({
                "image" : "bt02-84x72",
                "subimage" : "bback",
                "opacity" : 0.8,
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
                "image" : "bt02-84x72",
                "subimage" : "bfront",
                "opacity" : 0.8,
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
            /** Give some seasonal cheer. */
            game.Rock.stop();
        }
    }
});

game.HUD.ItemCount = me.ObjectContainer.extend({
    init: function (settings) {
        // call the parent constructor
        this.parent();

        var x = settings.x || 0, y = settings.y || 0, z = 1;
        x = x < 0 ? me.video.getWidth() + x : x;
        y = y < 0 ? me.video.getHeight() + y : y;

        if (settings.centerX) {
            x = (me.video.getWidth() / 2) - (me.loader.getImage(settings.image).width / 2);
        }
        if (settings.centerY) {
            y = (me.video.getHeight() / 2) - (me.loader.getImage(settings.image).height / 2);
        }

        var ImageButton = me.GUI_Object.extend({
            init: function (x, y, settings) {
                // call the parent constructor
                this.parent(x, y, settings);

                this.setOpacity(settings.opacity);
            }
        });

        var count = settings.counter;
        var Counter = me.Renderable.extend({
            init: function(x, y) {
                // call the parent constructor
                // (size does not matter here)
                this.parent(new me.Vector2d(x, y), 10, 10);

                // create a font
                this.font = new me.Font("Marker-Felt, Arial, sans-serif", 20, "black", "right");

                // local copy of the global score
                this.count = -1;

                // make sure we use screen coordinates
                this.floating = true;
            },
            update: function () {
                // we don't do anything fancy here, so just
                // return true if the score has been updated
                if (this.count !== game.data[count]) {
                    this.count = game.data[count];
                    return true;
                }
                return false;
            },
            draw: function (context) {
                this.font.draw(context, this.count, this.pos.x, this.pos.y);
            }
        });

        this.addChild(
            new ImageButton(
                x-me.loader.getImage(settings.image).width,
                y+5,
                {
                    'image': settings.image,
                    'opacity': settings.opacity
                }),
            z
        );

        this.addChild(
            new ImageButton(x, y, { 'image' : 'acoin', 'opacity' : settings.opacity }), z
        );

        this.addChild(
            new Counter(x+110, y+19), z+1
        );

        return true;
    }
});

game.HUD.GUI_Button = me.ObjectContainer.extend({
    init: function (settings) {
        // call the parent constructor
        this.parent();

        var x = settings.x || 0, y = settings.y || 0, z = 1;
        x = x < 0 ? me.video.getWidth() + x : x;
        y = y < 0 ? me.video.getHeight() + y : y;

        if (settings.centerX) {
            x = (me.video.getWidth() / 2) - (me.loader.getImage(settings.image).width / 2);
        }
        if (settings.centerY) {
            y = (me.video.getHeight() / 2) - (me.loader.getImage(settings.image).height / 2);
        }

        var ImageButton = me.GUI_Object.extend({
            init: function (x, y, settings) {
                // call the parent constructor
                this.parent(x, y, settings);

                this.setOpacity(settings.opacity);
                this.settings = settings;
            },
            onClick : function(event) {
                if (typeof this.settings.onClick === 'function') {
                    this.settings.onClick(event, settings);
                }
            }
        });

        // Add a button
        this.addChild(
            new ImageButton(x, y, { "image" : settings.image, "opacity" : settings.opacity, 'onClick': settings.onClick }), z
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
