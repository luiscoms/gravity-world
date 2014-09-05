/**
 * Mage Entity
 */
game.Mage = me.ObjectContainer.extend({
    init: function(x, y, settings) {
        // call the constructor
        this.parent();
        // make sure our object is always draw first
        this.z = Infinity;
        this.name = 'MageContainer';

        // persistent across level change
        this.isPersistent = false;

        var phrase = (settings.phrase || '!').replace(/\{n\}/g, '\n');

        var MageNPC = me.ObjectEntity.extend({
            init: function(x, y) {
                settings = {};
                settings.image = 'mage';
                settings.spritewidth = settings.width = 75;
                settings.spriteheight = settings.height = 95;

                // call the constructor
                this.parent(x, y, settings);
                this.name = 'MageNPC';
            }
        });

        var hideMage = function() {
            me.game.world.removeChild(me.game.world.getChildByName('MageContainer')[0]);
            me.game.world.removeChild(me.game.world.getChildByName('SpeakBalloon')[0]);
            me.game.world.removeChild(me.game.world.getChildByName('SpeakText')[0]);
            me.game.world.removeChild(me.game.world.getChildByName('SpeakArrow')[0]);
            me.game.world.removeChild(me.game.world.getChildByName('MageNPC')[0]);
        }

        var Arrow = me.GUI_Object.extend({
            init: function (x, y) {
                settings = {};
                settings.image = 'speak-arrow';
                settings.spritewidth = me.loader.getImage(settings.image).width;
                settings.spriteheight = me.loader.getImage(settings.image).height;

                // call the parent constructor
                this.parent(
                    x-me.loader.getImage(settings.image).width-10,
                    y-me.loader.getImage(settings.image).height/2,
                    settings);
                this.flipX(true);
                // define the object z order
                this.z = settings.z;
                this.name = 'SpeakArrow';
            },
            onClick: hideMage
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
                this.parent(
                    x,
                    y,
                    settings);
                this.flipX(true);
                this.name = 'SpeakBalloon';

                var Speak = me.Renderable.extend({
                    init: function(x, y) {
                        // call the parent constructor
                        // (size does not matter here)
                        this.parent(new me.Vector2d(x, y), 10, 10);

                        // create a font
                        this.font = new me.Font("Marker-Felt, Arial, sans-serif", 40, 'black', 'center');
                        this.name = 'SpeakText';

                        // make sure we use screen coordinates
                        // this.floating = true;
                    },
                    // update: function () {
                    // },
                    draw: function (context) {
                        this.font.draw(context, phrase, this.pos.x, this.pos.y);
                    }
                });
                x += me.loader.getImage(settings.image).width/2;
                y += 40;
                me.game.world.addChild(new Speak(x, y), 10);
            },
            onClick: hideMage
        });
        me.game.world.addChild(new MageNPC(x, y), 10);
        me.game.world.addChild(new Arrow(x, y), 10);
        me.game.world.addChild(new Balloon(x, y), 9);

    }
});
