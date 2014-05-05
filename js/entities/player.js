game.Player = me.ObjectEntity.extend({

    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);

        this.name = "Rock";

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 15);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.renderable.addAnimation("rock_stand", [0]);
        this.renderable.addAnimation("rock_walk", [1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.renderable.setCurrentAnimation("rock_stand");
    },

    walkLeft: function() {
        if (!this.renderable.isCurrentAnimation("rock_walk")) {
            this.renderable.setCurrentAnimation("rock_walk", "rock_stand");
        }
        // flip the sprite on horizontal axis
        this.flipX(false);
        // update the entity velocity
        this.vel.x -= this.accel.x * me.timer.tick;
    },

    walkRight: function() {
        if (!this.renderable.isCurrentAnimation("rock_walk")) {
            this.renderable.setCurrentAnimation("rock_walk", "rock_stand");
        }
        // unflip the sprite
        this.flipX(true);
        // update the entity velocity
        this.vel.x += this.accel.x * me.timer.tick;
    },

    stop: function() {
        this.renderable.setCurrentAnimation("rock_stand");
        this.vel.x = 0;
    },

    update: function(dt) {
        // set gravity from the global value
        this.gravity = me.sys.gravity;

        if (me.input.isKeyPressed('left')) {
            this.walkLeft();
        } else if (me.input.isKeyPressed('right')) {
            this.walkRight();
        } else {
            //this.stop();
        }

        // check & update player movement
        var updated = this.updateMovement();

        // check if we fell into a hole
        if (!this.inViewport ||
                (this.gravity > 0 && this.pos.y > me.video.getHeight()) ||
                (this.gravity < 0 && this.pos.y < -this.getBounds().height)) {

            // if yes reset the game
            //me.game.world.removeChild(this);

            me.state.change(me.state.MENU);//me.levelDirector.reloadLevel();
            return true;
        }

        // check for collision
        me.game.world.collide(this);

        // update animation if necessary
        if (this.vel.x !== 0 || this.vel.y !== 0) {
            // update object animation
            this.parent(dt);
            return true;
        }

        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return updated || false;
    }

});
