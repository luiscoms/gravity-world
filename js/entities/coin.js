game.CoinEntity = me.CollectableEntity.extend({
	// extending the init function is not mandatory
	// unless you need to add some extra initialization
	init: function(x, y, settings) {
		settings.image = 'coin';
		//settings.spritewidth = 32;

		// call the parent constructor
		this.parent(x, y, settings);
	},

    // this function is called by the engine, when
    // an object is touched by something (here collected)
	 onCollision : function () {
		// do something when collected
		// play a "coin collected" sound
		//me.audio.play("cling");

		// give some score
		me.game.HUD.updateItemValue("coins", 1);

		// make sure it cannot be collected "again"
		this.collidable = false;
		// remove it
		me.game.remove(this);
	}
});