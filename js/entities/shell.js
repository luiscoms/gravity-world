/**
 * Coin Entity
 */
game.Shell = me.ObjectEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);

        this.gravity = me.sys.gravity;
        this.collidable = true;
        this.setVelocity(5, 15);
    },

    update: function(dt) {
        this.gravity = me.sys.gravity;
        // update player position

        var res = this.updateMovement();
        // if (res.yprop.type && res.yprop.type != "solid") console.log("res.yprop.type", res.yprop.type);
        // if (res.xprop.type && res.xprop.type != "solid") console.log("res.xprop.type", res.xprop.type);

        // check for collision
        var collision = me.game.world.collide(this);

        if (collision)
            console.log("Collision with", collision.obj.name);
        if (collision && collision.obj.name == "Rock") {
            console.log("Collision with", collision.obj.name);

            // if we collide with the player
            if (collision.obj.name == "Rock") {
                if (res.xprop.type == "solid") {
                    collision.obj.stop();
                }
                if (collision.x > 0) {
                    this.vel.x -= this.accel.x * me.timer.tick;
                } else {
                    this.vel.x += this.accel.x * me.timer.tick;
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

// // check player status after collision check
// var updated = (this.vel.x!==0 || this.vel.y!==0);

        if (this.vel.x !== 0 || this.vel.y !== 0) {
            console.log("Shell vel.x", this.vel.x);
            this.parent(dt);
            // debugger;
            return true;
        }
        return false;
    },

    onTileBreak: function() {
            console.log("Shell onTileBreak");
        game.Rock.walking = false;
        game.Rock.stop();

        // this.vel.x += this.accel.x * me.timer.tick;

        // make sure it cannot be collected "again"
        //this.collidable = false;
        // remove it
        //me.game.world.removeChild(this);
    }
});


game.Lock = game.Shell.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        this.name = "Lock";

        // define this here instead of tiled
        settings.image = "lock-66x68";

        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.spritewidth = settings.width = 64;
        settings.spriteheight = settings.height = 68;

        // call the parent constructor
        this.parent(x, y, settings);
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
