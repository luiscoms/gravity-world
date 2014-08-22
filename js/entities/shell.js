/**
 * Shell Entity
 */
game.Shell = me.ObjectEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);

        this.type = 'pushable';
        this.gravity = me.sys.gravity;
        this.collidable = true;
        this.setVelocity(5, 15);
    },

    onCollision: function(res, obj) {
        // console.log(this.name, 'collision with', obj.name, res);
        // if we collide with the player
        if (obj.type == 'player') {
            // this.pos.x += res.x;
            obj.pos.x -= res.x;
            obj.pos.y -= res.y;
            if (res.y == 0) {
                if (res.x < 0) {
                    this.vel.x -= this.accel.x * me.timer.tick;
                } else {
                    this.vel.x += this.accel.x * me.timer.tick;
                }
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
        if (collision) {
            // if we collide with the player
            if (collision.obj.name == "Rock") {
                if (res.xprop.type == "solid") {
                    collision.obj.stop();
                }
            }
        } else {
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


game.Detonator = game.Shell.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        this.name = "Detonator";

        // define this here instead of tiled
        settings.image = "bombdet-64x64";

        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.spritewidth = settings.width = 64;
        settings.spriteheight = settings.height = 64;

        // call the parent constructor
        this.parent(x, y, settings);
    }
});


game.Bomb = game.Shell.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        this.name = "Bomb";

        // define this here instead of tiled
        settings.image = "bombset01-64x60";

        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.spritewidth = settings.width = 64;
        settings.spriteheight = settings.height = 60;

        // call the parent constructor
        this.parent(x, y, settings);
    }
});
