/*-------------------
a player entity
-------------------------------- */
game.PlayerEntity = me.ObjectEntity.extend({
	/* -----
	constructor
	------ */

	init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 15);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		this.gravity = 0.98;	// default value: 0.98 (earth gravity)

		// sets animation orientation
		gravity = 'bottom';

		// stores init values so it can be reset on death
		this.initX = x;
		this.initY = y - 2;	// -2 because player is 42 px tall
		this.initGravity = this.gravity;

		// player animations
		this.alwaysUpdate = true;
		this.renderable.addAnimation("rock_walk", [1, 2, 3, 4, 5, 6, 7, 8, 9]);
		this.renderable.addAnimation("rock_stand", [0]);
		this.renderable.setCurrentAnimation("rock_stand");
		this.flipX(true);

		// snowstorm ticker
		lastTicked = me.timer.getTime();
	},

	onDestroyEvent: function() {

		console.log('onDestroyEvent');

	},


	/* -----
	update the player pos
	------ */
	update: function() {
		//console.log(this.inViewport);
		if (!this.inViewport) {
			this.alive = false;
			return false;
		}
		if (me.input.isKeyPressed('left'))
		{
			this.renderable.setCurrentAnimation("rock_walk", "rock_stand");

			// flip the sprite axis on left movement
			this.flipX(false);

			// update the player velocity
			this.vel.x -= this.accel.x * me.timer.tick;

			//me.audio.play("walk");
		}
		else if (me.input.isKeyPressed('right'))
		{
			this.renderable.setCurrentAnimation("rock_walk", "rock_stand");
			this.flipX(true);
			this.vel.x += this.accel.x * me.timer.tick;
			//me.audio.play("walk");
		}
		else
		{
			this.renderable.setCurrentAnimation("rock_stand");
			this.vel.x = 0;
		}

		// check & update player movement
		updated = this.updateMovement();

		// check for collision
        var res = me.game.world.collide(this);

		if (res) {
			if (res.obj.name == 'up' || res.obj.name == 'down') {
				switch (gravity) {
					// changing gravity
					case 'bottom':
						if (res.obj.name == 'up' && this.vel.y === 0) {
							this.gravity *= -1;
							//this.renderable.setCurrentAnimation("rock_stand");
							// flip sprite on y-axis
							this.flipY(true);
							gravity = 'top';
							//me.audio.play("gravity");
						}
						break;
					case 'top':
						if (res.obj.name == 'down' && this.vel.y === 0) {
							this.gravity *= -1;
							//this.renderable.setCurrentAnimation("rock_stand");
							this.flipY(false);
							gravity = 'bottom';
							//me.audio.play("gravity");
						}
						break;
				}
			}
			// if we collide with an enemy
		}

		// update animation if necessary
		if (updated || this.vel.x!==0 || this.vel.y!==0) {
			// update object animation
			this.parent(this);

			return true;
		}

		// else inform the engine we did not perform
		// any update (e.g. position, animation)
		return updated || false;
	}
});
