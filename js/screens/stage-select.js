function strPad(input, length, string) {
    string = string || '0'; input = input + '';
    return input.length >= length ? input : new Array(length - input.length + 1).join(string) + input;
}
/*global me: true, game: true */
game.StageSelectScreen = me.ScreenObject.extend({
    onResetEvent: function() {
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

        // Home
        me.game.world.addChild(
            new game.HUD.GUI_Button({
                "image" : "bt01-84x72",
                "subimage" : "ahome",
                x: 10,
                y: 10,
                "onClick" : function () {
                    me.state.change(me.state.READY);
                    return true;
                }
            }),
            2 // z-index
        );

        var y = 162,//72(button height) + 10(padding-top) + 80(title height)
            num = '',
            subimage = '',
            locked = true;
        for (var i = 1; i <= 3; i++) {
            switch(i){
                case 1:
                    num = 1;
                break;
                case 2:
                    num = 6;
                break;
                case 3:
                    num = 11;
                break;
            }
            locked = num !== 1 && !game.data.levels[num-1].reached;
            subimage = "a" + strPad(num++, 2, 0);
            if (locked) {
                subimage = "alock";
            }
            // 1
            me.game.world.addChild(
                new game.HUD.GUI_Button({
                    "image" : "bt01-84x72",
                    "subimage" : subimage,
                    "locked" : locked,
                    "world" : 1,
                    "stage" : num,
                    x: me.video.getWidth()/2 - 84/2 - (84 + 84) * 2,
                    y: y,
                    "onClick" : function (settings) {
                        if (!settings.locked) {
                            me.state.change(me.state.PLAY, { 'world': settings.world, 'stage': settings.stage });
                        }
                        return true;
                    }
                }),
                2 // z-index
            );

            locked = !game.data.levels[num-1].reached;
            subimage = "a" + strPad(num++, 2, 0);
            if (locked) {
                subimage = "alock";
            }
            // 2
            me.game.world.addChild(
                new game.HUD.GUI_Button({
                    "image" : "bt01-84x72",
                    "subimage" : subimage,
                    "locked" : locked,
                    x: me.video.getWidth()/2 - 84/2 - (84 + 84),
                    y: y,
                    "onClick" : function (settings) {
                        if (!settings.locked) {
                            me.state.change(me.state.PLAY);
                        }
                        return true;
                    }
                }),
                2 // z-index
            );

            locked = !game.data.levels[num-1].reached;
            subimage = "a" + strPad(num++, 2, 0);
            if (locked) {
                subimage = "alock";
            }
            // 3
            me.game.world.addChild(
                new game.HUD.GUI_Button({
                    "image" : "bt01-84x72",
                    "subimage" : subimage,
                    "locked" : locked,
                    centerX: true,
                    y: y,
                    "onClick" : function (settings) {
                        if (!settings.locked) {
                            me.state.change(me.state.PLAY);
                        }
                        return true;
                    }
                }),
                2 // z-index
            );

            locked = !game.data.levels[num-1].reached;
            subimage = "a" + strPad(num++, 2, 0);
            if (locked) {
                subimage = "alock";
            }
            // 4
            me.game.world.addChild(
                new game.HUD.GUI_Button({
                    "image" : "bt01-84x72",
                    "subimage" : subimage,
                    "locked" : locked,
                    x: me.video.getWidth()/2 - 84/2 + (84 + 84),
                    y: y,
                    "onClick" : function (settings) {
                        if (!settings.locked) {
                            me.state.change(me.state.PLAY);
                        }
                        return true;
                    }
                }),
                2 // z-index
            );

            locked = !game.data.levels[num-1].reached;
            subimage = "a" + strPad(num++, 2, 0);
            if (locked) {
                subimage = "alock";
            }
            // 5
            me.game.world.addChild(
                new game.HUD.GUI_Button({
                    "image" : "bt01-84x72",
                    "subimage" : subimage,
                    "locked" : locked,
                    x: me.video.getWidth()/2 - 84/2 + (84 + 84) * 2,
                    y: y,
                    "onClick" : function (settings) {
                        if (!settings.locked) {
                            me.state.change(me.state.PLAY);
                        }
                        return true;
                    }
                }),
                2 // z-index
            );

            y += 82; // 72(image height)+10(padding-top)

        };

        // // back
        // me.game.world.addChild(
        //     new game.HUD.GUI_Button({
        //         "image" : "bt01-84x72",
        //         // "subimage" : "bback",
        //         x: me.video.getWidth()/2 - 84/2 + (84 + 84) * 2,
        //         y: y,
        //         "onClick" : function () {
        //             me.state.change(me.state.PLAY);
        //             return true;
        //         }
        //     }),
        //     2 // z-index
        // );

        // // Load title image
        // me.game.world.addChild(
        //     new game.HUD.GUI_Button({
        //         "image" : "title",
        //         centerX: true,
        //         y: 80
        //     }),
        //     //new me.ImageLayer("title", 200, 0, "title"),
        //     //new me.SpriteObject((960 / 2) - (602 / 2), (640 / 2) - (306 / 2), me.loader.getImage("title")),
        //     2 // z-index
        // );
    }
});
