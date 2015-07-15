/**
 * Detonator Entity
 */
game.Detonator = game.PushableEntity.extend({
    init: function(x, y, settings) {
        this.name = "Detonator";

        // define this here instead of tiled
        settings.image = "bombdet-64x64";

        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.width = 55;
        settings.spritewidth = 64;
        settings.spriteheight = settings.height = 64;

        // call the parent constructor
        this._super(game.PushableEntity, 'init', [x, y, settings]);
    },

    onCollision: function (res, obj) {
        this._super(game.PushableEntity, 'onCollision', [res, obj]);

        var bombs = me.game.world.getChildByName('bomb');
        if (obj.type !== 'player' || res.y <= 0) return false;

        for (var i in bombs) {
            me.game.world.removeChild(bombs[i]);
        }

        this.collidable = false;
        // remove it
        me.game.world.removeChild(this);
    }
});
