/**
 * Bomb Entity
 */
game.Bomb = game.Solid.extend({
    init: function(x, y, settings) {
        this.name = "Bomb";

        // define this here instead of tiled
        settings.image = "bombset01-64x60";

        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.spritewidth = settings.width = 64;
        settings.spriteheight = settings.height = 60;

        // call the parent constructor
        this._super(game.Solid, 'init', [x, y, settings]);
    }
});
