/**
 * Arrow Entity
 */
game.Arrow = me.LevelEntity.extend({
    init: function(x, y, settings) {
        if (settings.visible) {
            settings.image = 'arrow-64x64';
        }
        // call the parent constructor
        this._super(me.LevelEntity, 'init', [x, y, settings]);

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
        this.levelId = me.levelDirector.getCurrentLevelId();
    },

    onCollision : function(res, obj) {
        if (obj.type !== 'player') return false;
        game.reachStage(parseInt(this.levelId.replace(/.*\.(\d+)/, "$1"), 10));
        this._super(me.LevelEntity, 'onCollision', [res, obj]);
    }
});
