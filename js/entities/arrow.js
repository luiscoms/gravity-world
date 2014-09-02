/**
 * Arrow Entity
 */
game.Arrow = me.LevelEntity.extend({
    init: function(x, y, settings) {
        if (settings.visible) {
            settings.image = 'arrow-64x64';
        }
        // call the parent constructor
        this.parent(x, y, settings);

        if (settings.visible && 'direction' in settings) {
            switch (settings.direction) {
                case 'left':
                    this.flipX(true);
                    break;
                case 'right':
                    this.flipX(false);
                    break;
            }
        }
    },

    onCollision : function(res, obj) {
        if (obj.type !== 'player') return false;
        this.parent(res, obj);
    }
});
