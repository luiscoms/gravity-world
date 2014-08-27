
/**
 * Shell Entity
 */
game.Shell = game.PushableEntity.extend({
    init: function(x, y, settings) {
        settings.image = "shellA";
        settings.spritewidth = settings.width = 64;
        settings.spriteheight = settings.height = 64;

        // call the parent constructor
        this.parent(x, y, settings);
    },
});


game.Detonator = game.PushableEntity.extend({
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
        this.parent(x, y, settings);
    }
});
