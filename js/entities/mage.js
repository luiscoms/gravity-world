/**
 * Mage Entity
 */
game.Mage = me.Container.extend({
    init: function(x, y, settings) {
        // call the constructor
        this._super(me.Container, 'init', [x, y, settings]);
        // make sure our object is always draw first
        this.z = Infinity;
        this.name = 'MageContainer';

        // persistent across level change
        this.isPersistent = false;

        var phrase = (settings.phrase || '!').replace(/\{n\}/g, '\n');

        var MageNPC = me.GUI_Object.extend({
            init: function(x, y) {
                var settings = {};
                settings.image = 'mage';
                settings.spritewidth = settings.width = 75;
                settings.spriteheight = settings.height = 95;

                // call the constructor
                this._super(me.GUI_Object, 'init', [x, y, settings]);
                this.name = 'MageNPC';

                // this.body.setCollisionMask(me.collision.types.NO_OBJECT);
            }
        });

        var hideMage = function() {
            console.log('hideMage')
            me.game.world.removeChild(me.game.world.getChildByName('MageContainer')[0]);
            me.game.world.removeChild(me.game.world.getChildByName('SpeakBalloon')[0]);
            me.game.world.removeChild(me.game.world.getChildByName('SpeakText')[0]);
            me.game.world.removeChild(me.game.world.getChildByName('SpeakArrow')[0]);
            me.game.world.removeChild(me.game.world.getChildByName('MageNPC')[0]);
        }

        var Arrow = me.GUI_Object.extend({
            init: function (x, y) {
                var settings = {};
                settings.image = 'speak-arrow';
                settings.spritewidth = me.loader.getImage(settings.image).width;
                settings.spriteheight = me.loader.getImage(settings.image).height;

                // call the parent constructor
                this._super(me.GUI_Object, 'init', [
                    x-me.loader.getImage(settings.image).width-10,
                    y-me.loader.getImage(settings.image).height/2,
                    settings
                ]);
                this.flipX(true);
                // define the object z order
                this.z = settings.z;
                this.name = 'SpeakArrow';
            }//,
            // onClick: hideMage
        });

        var Balloon = me.GUI_Object.extend({
            init: function (x, y) {
                settings = {};
                settings.image = 'speak01';
                settings.spritewidth = me.loader.getImage(settings.image).width;
                settings.spriteheight = me.loader.getImage(settings.image).height;

                // call the parent constructor
                x = x-me.loader.getImage(settings.image).width/2-40;
                y = y-me.loader.getImage(settings.image).height;
                this._super(me.GUI_Object, 'init', [
                    x,
                    y,
                    settings
                ]);
                this.flipX(true);
                this.name = 'SpeakBalloon';

                var Speak = me.Renderable.extend({
                    init: function(x, y) {
                        // call the parent constructor
                        // (size does not matter here)
                        this._super(me.Renderable, 'init', [x, y, 10, 10]);

                        // create a font
                        this.font = new me.Font("Marker-Felt, Arial, sans-serif", 40, 'black', 'center');
                        this.name = 'SpeakText';

                        // make sure we use screen coordinates
                        // this.floating = true;
                    },
                    // update: function () {
                    // },
                    draw: function (renderer) {
                        // Get the renderer context
                        var context = renderer.getContext();
                        this.font.draw(context, phrase, this.pos.x, this.pos.y);
                    }
                });
                x += me.loader.getImage(settings.image).width/2;
                y += 40;
                me.game.world.addChild(new Speak(x, y), 10);
            }//,
            // onClick: hideMage
        });
        me.game.world.addChild(new MageNPC(x, y), 10);
        me.game.world.addChild(new Arrow(x, y), 10);
        me.game.world.addChild(new Balloon(x, y), 9);

        // hide mage on press Enter or click/tap
        me.input.bindKey(me.input.KEY.ENTER, 'enter', true);
        me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === 'enter') {
                hideMage();
            }
        });
    },

    onActivateEvent : function () {
    },

    onDeactivateEvent : function () {
        console.log('onDestroyEvent')
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindPointer(me.input.mouse.LEFT);
        me.event.unsubscribe(this.handler);
    }
});
