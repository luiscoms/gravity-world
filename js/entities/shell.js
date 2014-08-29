/**
 * Shell Entity
 */
game.Shell = game.PushableEntity.extend({
    init: function(x, y, settings) {
        settings.image = "shellA";
        settings.spritewidth = settings.width = 63;
        settings.spriteheight = settings.height = 64;

        // call the parent constructor
        this.parent(x, y, settings);
    },
});
