/**
 * Lock Entity
 */
game.Lock = game.Solid.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "lock-66x68";

        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.spritewidth = settings.width = 64;
        settings.spriteheight = settings.height = 68;

        // call the parent constructor
        this.parent(x, y, settings);
    },

    onCollision: function(res, obj) {
        // console.log(this.name, 'collision with', obj.name);
        if (obj.type == 'player' && game.data.keys > 0) {
            game.data.keys -= 1;
            // remove all locks
            var locks = me.game.world.getChildByName('lock');

            for (var i in locks) {
                me.game.world.removeChild(locks[i]);
            }
            return;
        }


        this.parent(res, obj);
    }
});
