function strPad(input, length, string) {
    string = string || '0'; input = input + '';
    return input.length >= length ? input : new Array(length - input.length + 1).join(string) + input;
}



/*global me: true, game: true */
game.StageSelectScreen = me.ScreenObject.extend({

    onResetEvent: function() {
        // add SIDEMENU to the game world
        this.SIDEMENU = new game.SideMenu.Container();
        me.game.world.addChild(this.SIDEMENU);

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

        // Home
        me.game.world.addChild(
            new game.HUD.GUI_Button({
                "image" : "bt01-84x72",
                "subimage" : 'agear',
                'sidemenu' : this.SIDEMENU,
                x: 10,
                y: 10,
                "onClick" : function (event, settings) {
                    // me.state.change(me.state.READY);
                    settings.sidemenu.show();
                    return false;
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

            locked = game.stageLocked(num, me.save.levels);
            subimage = "a" + strPad(num, 2, 0);
            if (locked) {
                subimage = "alock";
            }
            // 1
            var x1 = me.video.getWidth()/2 - 42, // me.video.getWidth()/2 - 84(buttton width)/2
                x2 = 168; // (84 + 84)
            me.game.world.addChild(
                new game.HUD.GUI_Button({
                    "image" : "bt01-84x72",
                    "subimage" : subimage,
                    "locked" : locked,
                    "world" : 1,
                    "stage" : num,
                    x: x1 - x2 * 2,
                    y: y,
                    "onClick" : function (event, settings) {
                        if (!settings.locked) {
                            me.state.change(me.state.PLAY, { 'world': settings.world, 'stage': settings.stage });
                        }
                        return true;
                    }
                }),
                2 // z-index
            );
            num++;

            locked = game.stageLocked(num, me.save.levels);
            subimage = "a" + strPad(num, 2, 0);
            if (locked) {
                subimage = "alock";
            }
            // 2
            me.game.world.addChild(
                new game.HUD.GUI_Button({
                    "image" : "bt01-84x72",
                    "subimage" : subimage,
                    "locked" : locked,
                    "world" : 1,
                    "stage" : num,
                    x: x1 - x2,
                    y: y,
                    "onClick" : function (event, settings) {
                        if (!settings.locked) {
                            me.state.change(me.state.PLAY, { 'world': settings.world, 'stage': settings.stage });
                        }
                        return true;
                    }
                }),
                2 // z-index
            );
            num++;

            locked = game.stageLocked(num, me.save.levels);
            subimage = "a" + strPad(num, 2, 0);
            if (locked) {
                subimage = "alock";
            }
            // 3
            me.game.world.addChild(
                new game.HUD.GUI_Button({
                    "image" : "bt01-84x72",
                    "subimage" : subimage,
                    "locked" : locked,
                    "world" : 1,
                    "stage" : num,
                    centerX: true,
                    y: y,
                    "onClick" : function (event, settings) {
                        if (!settings.locked) {
                            me.state.change(me.state.PLAY, { 'world': settings.world, 'stage': settings.stage });
                        }
                        return true;
                    }
                }),
                2 // z-index
            );
            num++;

            locked = game.stageLocked(num, me.save.levels);
            subimage = "a" + strPad(num, 2, 0);
            if (locked) {
                subimage = "alock";
            }
            // 4
            me.game.world.addChild(
                new game.HUD.GUI_Button({
                    "image" : "bt01-84x72",
                    "subimage" : subimage,
                    "locked" : locked,
                    "world" : 1,
                    "stage" : num,
                    x: x1 + x2,
                    y: y,
                    "onClick" : function (event, settings) {
                        if (!settings.locked) {
                            me.state.change(me.state.PLAY, { 'world': settings.world, 'stage': settings.stage });
                        }
                        return true;
                    }
                }),
                2 // z-index
            );
            num++;

            locked = game.stageLocked(num, me.save.levels);
            subimage = "a" + strPad(num, 2, 0);
            if (locked) {
                subimage = "alock";
            }
            // 5
            me.game.world.addChild(
                new game.HUD.GUI_Button({
                    "image" : "bt01-84x72",
                    "subimage" : subimage,
                    "locked" : locked,
                    "world" : 1,
                    "stage" : num,
                    x: x1 + x2 * 2,
                    y: y,
                    "onClick" : function (event, settings) {
                        if (!settings.locked) {
                            me.state.change(me.state.PLAY, { 'world': settings.world, 'stage': settings.stage });
                        }
                        return true;
                    }
                }),
                2 // z-index
            );

            y += 82; // 72(image height)+10(padding-top)

        };


        // enable the demo stage
        if (document.location.hash === "#debug") {
            me.game.world.addChild(
                new game.HUD.GUI_Button({
                    "image" : "bt01-84x72",
                    // "subimage" : subimage,
                    "locked" : false,
                    centerX: true,
                    y: y,
                    "onClick" : function (event, settings) {
                        me.state.change(me.state.PLAY); //load demo
                        return true;
                    }
                }),
                2 // z-index
            );
        }
    },

    onDestroyEvent: function() {
        // remove the SIDEMENU from the game world
        me.game.world.removeChild(this.SIDEMENU);
    }
});
