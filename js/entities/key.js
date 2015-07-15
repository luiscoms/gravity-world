/**
 * Key Entity
 */
game.Key = game.PushableEntity.extend({
    init: function(x, y, settings) {
        settings.image = 'key';
        settings.spritewidth = 66;
        settings.spriteheight = 48;

        // call the parent constructor
        this._super(game.PushableEntity, 'init', [x, y, settings]);
        this.type = 'pushable-collectable';
    },

    onCollision: function(res, obj) {
        this._super(game.PushableEntity, 'onCollision', [res, obj]);

        if (obj.type !== 'player') return false;

        // increase keys count
        game.data.keys += 1;

        // make sure it cannot be collected "again"
        this.collidable = false;
        // remove it
        me.game.world.removeChild(this);
    }
});
