/**
 * Pushable Entity
 */
game.PushableEntity = me.Entity.extend({

    init: function(x, y, settings) {
        // call the parent constructor
        this._super(me.Entity, 'init', [x, y, settings]);

        this.type = 'pushable';
        this.body.gravity = me.sys.gravity;
        this.body.setVelocity(5, 15);

        this.body.onCollision = this.onCollision.bind(this);
    },

    onCollision: function(res, obj) {
        console.log(this.name, 'collision with', obj.name, res);
        // if we collide with the player
        if (obj.type == 'player') {
            if (res.x != 0) {
                obj.pos.x -= res.x + (res.x < 0 ? 1 : -1);
            }
            if (res.y == 0) {
                if (res.x < 0) {
                    this.body.vel.x -= this.body.accel.x * me.timer.tick;
                } else {
                    this.body.vel.x += this.body.accel.x * me.timer.tick;
                }
            } else {
                obj.pos.y -= res.y + (res.y > 0 ? 1 : -1);
            }
        } else if (obj.type == 'solid') {
            this.body.vel.x = 0;
            this.body.pos.x += res.x;
        } else {
            obj.pos.x -= res.x;
            obj.pos.y -= res.y;

            if (res.y == 0) {
                if (res.x < 0) {
                    this.body.vel.x -= this.body.accel.x * me.timer.tick;
                } else {
                    this.body.vel.x += this.body.accel.x * me.timer.tick;
                }
            }
        }
    },

    update: function(dt) {
        this.body.gravity = me.sys.gravity;

        // check if we fell into a hole
        if (this.gravity > 0 && this.body.pos.y >= me.video.renderer.getHeight()-this.body.getBounds().height ||
            this.gravity < 0 && this.body.pos.y <= 0) {
            if (this.gravity > 0) {
                this.body.pos.y = me.video.getHeight()-this.body.getBounds().height;
            } else {
                this.body.pos.y = 0;
            }
            this.body.vel.y = 0;
            return false;
        }

        // update player position
        var res = this.body.update();

        // check if we fell into a hole
        if (!this.inViewport ||
                (this.body.gravity > 0 && this.body.pos.y > me.video.renderer.getHeight()) ||
                (this.body.gravity < 0 && this.body.pos.y < -this.body.getBounds().height)) {

            // if yes reset the game
            //me.game.world.removeChild(this);

            me.state.change(me.state.MENU);//me.levelDirector.reloadLevel();
            return true;
        }

        // if (res.yprop.type && res.yprop.type != "solid") console.log("res.yprop.type", res.yprop.type);
        // if (res.xprop.type && res.xprop.type != "solid") console.log("res.xprop.type", res.xprop.type);

        // check for collision
        // me.collision.check(this, true, this.collideHandler.bind(this), true);
        collision = me.collision.check(this, true, this.collideHandler.bind(this), true);
        if (!collision) { // || collision.obj.type == 'static-collectable') {
            this.body.vel.x = 0;
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

        if (this.body.vel.x !== 0 || this.body.vel.y !== 0) {
            this._super(me.Entity, 'update', [dt]);
            return true;
        }
        return false;
    },

    collideHandler: function(response) {

        if (response.obj.type == 'static-collectable') {
            this.body.vel.x = 0;
        }
        // Update the entity bounds since we manually changed the position
        this.updateBounds();
    },
});

/**
 * Solid Entity
 */
game.Solid = me.Entity.extend({
    init: function(x, y, settings) {
        // call the parent constructor
        this._super(me.Entity, 'init', [x, y, settings]);

        this.body.onCollision = this.onCollision.bind(this);
        this.type = 'solid';
    },

    onCollision: function(res, obj) {
        obj.body.vel.x = 0;
        obj.body.vel.y = 0;
        obj.body.pos.x -= res.x;
        if (res.y != 0) {
            obj.body.pos.y -= res.y + (res.y > 0 ? 1 : -1);
        }
        // try { // if is the player
        //     obj.stop();
        // } catch(e){}
    }
});
