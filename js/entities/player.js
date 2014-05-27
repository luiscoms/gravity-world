/**
 * @class
 * @extends me.ObjectEntity
 * @memberOf game
 * @constructor
 */
game.Player = me.ObjectEntity.extend(
/** @scope game.Player.prototype */
{
    /**
     * @ignore
     */
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);

        /**
         * Name of the player
         * @memberOf game.Player
         * @type String
         * @default Rock
         * @name name
         */
        this.name = "Rock";
        this.walking = false;

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(5, 15);

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

    /**
     * update function called by the game manager on each game loop
     * @name update
     * @memberOf game.Player
     * @function
     * @protected
     * @param {Number} dt time since the last update in milliseconds.
     * @return {Boolean}
     **/
    update: function(dt) {
        // set gravity from the global value
        this.gravity = me.sys.gravity;

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
