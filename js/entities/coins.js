
game.CoinsObject = me.HUD_Item.extend({
	init: function(x, y) {
		// call the parent constructor
		this.parent(x, y);
		// create a font
		//this.font = new me.BitmapFont("32x32_font", 32);
		//this.font.set("right");
		this.font = new me.Font("Arial", 20, "black", "right");

		// create a font
		this.background = me.loader.getImage("coin");
// console.log(this.background)
		//this.icons = new me.AnimationSheet(this.pos.x,this.pos.y, "coin", 32);
		this.icons = new me.AnimationSheet(0, 0, 'coin', 32);
		// this.icons.addAnimation( "default", 0 );
		// this.icons.setCurrentAnimation( "default" );
	},

	/* -----
	draw our score
	------ */
	draw: function(context, x, y) {
		var qtd = this.value;
		while (qtd.toString().length < 4) qtd = '0'+qtd;
		this.font.draw(context, 'x'+qtd, this.pos.x + x, this.pos.y + y);

		//context.drawImage(this.background, this.pos.x-100, this.pos.y+y);
		// this.icons.draw(context);
	}

});