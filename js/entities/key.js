/**
 * Key Entity
 */
game.Key = game.PushableEntity.extend({
    init: function(x, y, settings) {
        settings.image = 'key';
        settings.spritewidth = 64;
        settings.spriteheight = 48;

        // call the parent constructor
        this.parent(x, y, settings);
        this.type = 'pushable-collectable';
    },

    onCollision: function(res, obj) {
        this.parent(res, obj);

        if (obj.type !== 'player') return false;

        // increase keys count
        game.data.keys += 1;

        // make sure it cannot be collected "again"
        this.collidable = false;
        // remove it
        me.game.world.removeChild(this);
    }
});
