/**
 * Lock Entity
 */
game.Lock = me.ObjectEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "lock-66x68";

        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.spritewidth = settings.width = 64;
        settings.spriteheight = settings.height = 68;

        // call the parent constructor
        this.parent(x, y, settings);

        this.gravity = me.sys.gravity;
        this.collidable = true;
        this.setVelocity(5, 15);

        this.name = "Lock";
        this.type = "solid";
    },

    onCollision: function(res, obj) {
        // console.log(this.name, 'collision with', obj.name);
        obj.vel.x = 0;
        obj.vel.y = 0;
        obj.pos.x -= res.x;
        obj.pos.y -= res.y;
        try { // if is the player
            obj.stop();
        } catch(e){}
    }
});
