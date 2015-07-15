/**
 * Shell Entity
 */
game.Shell = game.PushableEntity.extend({
    init: function(x, y, settings) {
        settings.image = "shellA";
        settings.spritewidth = 68;
        settings.spriteheight = 72;

        // call the parent constructor
        this._super(game.PushableEntity, 'init', [x, y, settings]);
    },
});
