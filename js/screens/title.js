/*global me: true, game: true */
game.TitleScreen = me.ScreenObject.extend({
    init : function () {},

    onResetEvent: function() {
        if (me.save.sound) {
            me.audio.stopTrack();
            me.audio.playTrack('custom');
        }

        // me.input.bindKey(me.input.KEY.ENTER, 'enter', true);
        // me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
        // this.handler = me.event.subscribe(me.event.KEYDOWN, function (action) {
        //     if (action === "enter") {
        //         me.state.change(me.state.PLAY);
        //     }
        // });
        // Load title background
        me.game.world.addChild(
            new me.ImageLayer('background', 0, 0, 'background01'),
            0 // z-index
        );

        // Load title foreground
        me.game.world.addChild(
            new me.ImageLayer('foreground', 0, 0, 'foreground01'),
            1 // z-index
        );

        // Load title image
        me.game.world.addChild(
            new game.HUD.GUI_Button({
                "image" : "title",
                centerX: true,
                y: 80
            }),
            //new me.ImageLayer("title", 200, 0, "title"),
            //new me.SpriteObject((960 / 2) - (602 / 2), (640 / 2) - (306 / 2), me.loader.getImage("title")),
            2 // z-index
        );

        me.game.world.addChild(
            new game.HUD.GUI_Button({
                "image" : "bt01big",
                "subimage" : "aplaytext",
                centerX: true,
                y: 440,
                "onClick" : function () {
                    me.state.change(me.state.MENU);
                    return true;
                }
            }),
            3 // z-index
        );

        // change to play state on press Enter or click/tap
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "enter") {
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
        // me.audio.stopTrack();
        me.input.unbindKey(me.input.KEY.ENTER);
        // me.input.unbindPointer(me.input.mouse.LEFT);
        me.event.unsubscribe(this.handler);
    }
});
