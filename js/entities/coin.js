/**
 * Coin Entity
 */
game.Coin = me.CollectableEntity.extend({
    init: function(x, y, settings) {
        settings.image = 'coin-64x64';
        settings.spritewidth = 64;

        // call the parent constructor
        this.parent(x, y, settings);
    },

    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function() {
        // give some score
        game.data.score += 1;

        // make sure it cannot be collected "again"
        this.collidable = false;
        // remove it
        me.game.world.removeChild(this);
    }
});
