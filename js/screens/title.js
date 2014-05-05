/*global me: true, game: true */
game.TitleScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        me.input.bindKey(me.input.KEY.ENTER, 'enter', true);
        me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action) {
            if (action === "enter") {
                me.state.change(me.state.PLAY);
            }
        });
        // Load title background
        me.game.world.addChild(
            new me.ImageLayer("background01-960x640", 0, 0, "background01-960x640"),
            0 // z-index
        );

        // Load title foreground
        me.game.world.addChild(
            new me.ImageLayer("foreground01-960x640", 0, 0, "foreground01-960x640"),
            1 // z-index
        );

        // Load title image
        me.game.world.addChild(
            //new me.ImageLayer("title", 200, 0, "title"),
            new me.SpriteObject((960 / 2) - (602 / 2), (640 / 2) - (306 / 2), me.loader.getImage("title")),
            2 // z-index
        );
    },

    update: function () {
        if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.PLAY);
        }
        return true;
    },

    onDestroyEvent : function () {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindPointer(me.input.mouse.LEFT);
        me.event.unsubscribe(this.handler);
    }
});
