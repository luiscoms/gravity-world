/*----------------
 a Up entity
------------------------ */
game.GravityEntity = me.CollectableEntity.extend({
	// extending the init function is not mandatory
	// unless you need to add some extra initialization
	init: function(x, y, settings) {
		// call the parent constructor
		this.parent(x, y, settings);
		//console.log('g', me.sys);

		//me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
	},

	// this function is called by the engine, when
	// an object is touched by something (here collected)
	onCollision: function() {
		// do something when collected

		// make sure it cannot be collected "again"
		this.collidable = false;
		// remove it
		me.game.remove(this);
	},

	update: function() {
		//this.updateMovement();
		//return true;
	}

});