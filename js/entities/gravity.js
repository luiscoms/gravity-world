game.GravityEntity = game.PushableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);

        this.gravity = me.sys.gravity;

        this.collidable = true;
    },

    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
        this.parent(res, obj);

        if (obj.name !== "Rock") return false;
        // make sure it cannot be collected "again"
        this.collidable = false;
        // remove it
        me.game.world.removeChild(this);

        switch (this.name) {
        // changing gravity
        case 'up':
            if (me.sys.gravity > 0 && obj.vel.y === 0) {
                me.sys.gravity *= -1;
                obj.flipY(true);
            }
            break;
        case 'down':
            if (me.sys.gravity < 0 && obj.vel.y === 0) {
                obj.flipY(false);
                me.sys.gravity *= -1;
            }
            break;

        }
    }
});
