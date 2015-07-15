/**
 * @class
 * @extends me.Entity
 * @memberOf game
 * @constructor
 */
game.Player = me.Entity.extend(
/** @scope game.Player.prototype */
{
    /**
     * @ignore
     */
    init: function(x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y, settings]);

        /**
         * Name of the player
         * @memberOf game.Player
         * @type String
         * @default Rock
         * @name name
         */
        this.name = "Rock";
        this.walking = false;
        this.type = "player";

        // set the default horizontal & vertical speed (accel vector)
        this.body.setVelocity(5, 15);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.renderable.addAnimation("rock_stand", [0]);
        this.renderable.addAnimation("rock_walk", [1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.renderable.setCurrentAnimation("rock_stand");
    },

    walkLeft: function() {
        try {
        if (!this.renderable.isCurrentAnimation("rock_walk")) {
            this.renderable.setCurrentAnimation("rock_walk", "rock_stand");
        }
        }catch(e){}
        // flip the sprite on horizontal axis
        this.flipX(false);
        // update the entity velocity
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
    },

    walkRight: function() {
        try {
        if (!this.renderable.isCurrentAnimation("rock_walk")) {
            this.renderable.setCurrentAnimation("rock_walk", "rock_stand");
        }
        }catch(e){}
        // unflip the sprite
        this.flipX(true);
        // update the entity velocity
        this.body.vel.x += this.body.accel.x * me.timer.tick;
    },

    stop: function() {
        this.renderable && this.renderable.setCurrentAnimation("rock_stand");
        try {
        this.body.vel.x = 0;
        }catch(e){}
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
        this.body.gravity = me.sys.gravity;

        // check & update player movement
        var updated = this.body.update();

        // check if we fell into a hole
        if (!this.inViewport ||
                (this.body.gravity > 0 && this.body.pos.y > me.video.renderer.getHeight()) ||
                (this.body.gravity < 0 && this.body.pos.y < -this.body.getBounds().height)) {

            // if yes reset the game
            //me.game.world.removeChild(this);

            me.state.change(me.state.MENU);//me.levelDirector.reloadLevel();
            return true;
        }

        // check for collision
        me.collision.check(this, true, this.collideHandler.bind(this), true);

        // update animation if necessary
        if (this.body && (this.body.vel.x !== 0 || this.body.vel.y !== 0)) {
            // update object animation
            this._super(me.Entity, 'update', [dt]);
            return true;
        }

        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return updated || false;
    },

    collideHandler: function(response) {
        // Update the entity bounds since we manually changed the position
        this.body && this.updateBounds();
    },

});
