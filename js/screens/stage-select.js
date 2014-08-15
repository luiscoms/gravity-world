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
            locked = !game.data.levels[num-1];
            if (locked) {
                subimage = "alock";
            } else {
                subimage = "a" + strPad(num++, 2, 0);
            }
            // 1
            me.game.world.addChild(
                new game.HUD.GUI_Button({
                    "image" : "bt01-84x72",
                    "subimage" : subimage,
                    x: me.video.getWidth()/2 - 84/2 - (84 + 84) * 2,
                    y: y,
                    "onClick" : function () {
                        me.state.change(me.state.PLAY);
                        return true;
                    }
                }),
                2 // z-index
            );

            locked = !game.data.levels[num-1];
            if (locked) {
                subimage = "alock";
            } else {
                subimage = "a" + strPad(num++, 2, 0);
            }
            // 2
            me.game.world.addChild(
                new game.HUD.GUI_Button({
                    "image" : "bt01-84x72",
                    "subimage" : subimage,
                    x: me.video.getWidth()/2 - 84/2 - (84 + 84),
                    y: y,
                    "onClick" : function () {
                        me.state.change(me.state.PLAY);
                        return true;
                    }
                }),
                2 // z-index
            );

            locked = !game.data.levels[num-1];
            if (locked) {
                subimage = "alock";
            } else {
                subimage = "a" + strPad(num++, 2, 0);
            }
            // 3
            me.game.world.addChild(
                new game.HUD.GUI_Button({
                    "image" : "bt01-84x72",
                    "subimage" : subimage,
                    centerX: true,
                    y: y,
                    "onClick" : function () {
                        me.state.change(me.state.PLAY);
                        return true;
                    }
                }),
                2 // z-index
            );

            locked = !game.data.levels[num-1];
            if (locked) {
                subimage = "alock";
            } else {
                subimage = "a" + strPad(num++, 2, 0);
            }
            // 4
            me.game.world.addChild(
                new game.HUD.GUI_Button({
                    "image" : "bt01-84x72",
                    "subimage" : subimage,
                    x: me.video.getWidth()/2 - 84/2 + (84 + 84),
                    y: y,
                    "onClick" : function () {
                        me.state.change(me.state.PLAY);
                        return true;
                    }
                }),
                2 // z-index
            );

            locked = !game.data.levels[num-1];
            if (locked) {
                subimage = "alock";
            } else {
                subimage = "a" + strPad(num++, 2, 0);
            }
            // 5
            me.game.world.addChild(
                new game.HUD.GUI_Button({
                    "image" : "bt01-84x72",
                    "subimage" : subimage,
                    x: me.video.getWidth()/2 - 84/2 + (84 + 84) * 2,
                    y: y,
                    "onClick" : function () {
                        me.state.change(me.state.PLAY);
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
