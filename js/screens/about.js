/*global me: true, game: true */
game.AboutScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        // Load background
        me.game.world.addChild(
            new me.ImageLayer('background', 0, 0, 'background-hello-world'),
            0 // z-index
        );

        // Load foreground
        me.game.world.addChild(
            new me.ImageLayer('foreground', 0, 0, 'about-pannel'),
            1 // z-index
        );

        // change to play state on press Enter or click/tap
        me.input.bindKey(me.input.KEY.ENTER, 'enter', true);
        me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === 'enter') {
                // play something on tap / enter
                // this will unlock audio on mobile devices
                // me.audio.play("cling");
                me.state.change(me.state.MENU);
            }
        });
    },

    update: function () {
        if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.MENU);
        }
        return true;
    },

    onDestroyEvent : function () {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindPointer(me.input.mouse.LEFT);
        me.event.unsubscribe(this.handler);
    }
});
