/**
 * Pushable Entity
 */
game.PushableEntity = me.ObjectEntity.extend({

    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);

        this.type = 'pushable';
        this.gravity = me.sys.gravity;
        this.setVelocity(5, 15);
    },

    onCollision: function(res, obj) {
        // console.log(this.name, 'collision with', obj.name, res);
        // if we collide with the player
        if (obj.type == 'player') {
            if (res.x != 0) {
                obj.pos.x -= res.x + (res.x < 0 ? 1 : -1);
            }
            if (res.y == 0) {
                if (res.x < 0) {
                    this.vel.x -= this.accel.x * me.timer.tick;
                } else {
                    this.vel.x += this.accel.x * me.timer.tick;
                }
            } else {
                obj.pos.y -= res.y + (res.y > 0 ? 1 : -1);
            }
        } else if (obj.type == 'solid') {
            this.vel.x = 0;
            this.pos.x += res.x;
        } else {
            obj.pos.x -= res.x;
            obj.pos.y -= res.y;

            if (res.y == 0) {
                if (res.x < 0) {
                    this.vel.x -= this.accel.x * me.timer.tick;
                } else {
                    this.vel.x += this.accel.x * me.timer.tick;
                }
            }
        }
    },

    update: function(dt) {
        this.gravity = me.sys.gravity;
        // update player position

        var res = this.updateMovement();
        // if (res.yprop.type && res.yprop.type != "solid") console.log("res.yprop.type", res.yprop.type);
        // if (res.xprop.type && res.xprop.type != "solid") console.log("res.xprop.type", res.xprop.type);

        // check for collision
        var collision = me.game.world.collide(this);

//         if (collision)
//             console.log("Collision with", collision.obj.name);
        if (!collision) {
            this.vel.x = 0;
        }

// check for collision result with the environment
// if (res.x != 0)
// {
//   // x axis
//   if (res.x<0)
//      console.log("x axis : left side !");
//   else
//      console.log("x axis : right side !");
// }
// else if (res.y != 0)
// {
//    // y axis
//    if (res.y<0)
//       console.log("y axis : top side !");
//    else
//       console.log("y axis : bottom side !");

//    // display the tile type
//    console.log(res.yprop.type);
// }

        if (this.vel.x !== 0 || this.vel.y !== 0) {
            this.parent(dt);
            // debugger;
            return true;
        }
        return false;
    }
});

/**
 * Solid Entity
 */
game.Solid = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);

        this.collidable = true;
        this.type = "solid";
    },

    update: function(dt) {
        // check for collision
        var collision = me.game.world.collide(this);
    },

    onCollision: function(res, obj) {
        obj.vel.x = 0;
        obj.vel.y = 0;
        obj.pos.x -= res.x;
        if (res.y != 0) {
            obj.pos.y -= res.y + (res.y > 0 ? 1 : -1);
        }
        // try { // if is the player
        //     obj.stop();
        // } catch(e){}
    }
});
