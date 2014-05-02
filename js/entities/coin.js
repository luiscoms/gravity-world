/**
 * Coin Entity
 */
game.CoinEntity = me.CollectableEntity.extend({

    init: function (x, y, settings) {
        // call the parent constructor
        this.parent(x, y , settings);
    },

    onCollision : function () {
        // do something when collide
        //me.audio.play("cling");
        // give some coins
        game.data.coins += 1;
        // make sure it cannot be collected "again"
        this.collidable = false;
        // remove it
        me.game.world.removeChild(this);
    }
});
