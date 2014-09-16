/*global game: true, me: true */
/**
 * a SideMenu container and child items
 */
game.SideMenu = game.SideMenu || {};

game.SideMenu.Container = me.ObjectContainer.extend({

    init: function(x, y, width, height) {
        var imagebg = 'menubg';

        this.parent(x, y, width, height);

        // persistent across level change
        this.isPersistent = true;

        // non collidable
        this.collidable = true;

        // make sure our object is always draw first
        this.z = Infinity;


        // add a tween to change the object pos.y variable to 200 in 3 seconds
        var sideMenu = me.ObjectContainer.extend({
            init: function(x, y, width, height, settings) {
                this.parent(x, y, width, height);

                var self = this;
                this.initX = x;

                this.addChild(
                    new game.HUD.GUI_Button({
                        image: settings.image,
                        x: 0,
                        y: 0,
                    }),
                    4 // z-index
                );

                this.addChild(
                    new game.HUD.GUI_Button({
                        'image' : 'bt02-84x72',
                        'subimage' : 'bclose',
                        x: 100,
                        y: 10,
                        "onClick" : function (event, settings) {
                            console.log('clicked!');
                            event.preventDefault();
                            event.stopPropagation();
                            self.hide();
                            return false;
                        }
                    }),
                    5 // z-index
                );

                y = 180;
                // home
                this.addChild(
                    new game.HUD.GUI_Button({
                        'image' : 'bt01-84x72',
                        'subimage' : 'ahome',
                        x: 50,
                        y: y,
                        'onClick' : function (event, settings) {
                            console.log('clicked ahome!');
                            event.preventDefault();
                            event.stopPropagation();
                            me.state.change(me.state.READY);
                            return false;
                        }
                    }),
                    5 // z-index
                );

                y += 90;
                // sound
                this.addChild(
                    new game.HUD.GUI_Button({
                        'image' : 'bt01-84x72',
                        'subimage' : 'asoundon',
                        x: 50,
                        y: y,
                        'onClick' : function (event, settings) {
                            return false;
                        }
                    }),
                    5 // z-index
                );

            },
            show: function() {
                var tween = new me.Tween(this.pos).to({x: 0}, 200/*vel*/).easing(me.Tween.Easing.Linear.None);
                tween.start();
            },
            hide: function(){
                var tween = new me.Tween(this.pos).to({x: this.initX}, 200/*vel*/).easing(me.Tween.Easing.Linear.None);
                tween.start();

            },
        });

        width = me.loader.getImage(imagebg).width;
        height = me.loader.getImage(imagebg).height;

        this.sideMenu = new sideMenu(
            -me.loader.getImage(imagebg).width, // x
            0, // y
            width,
            height,
            {
                image: imagebg
            }
        );

        this.addChild(
            this.sideMenu,
            4 // z-index
        );


    },
    show: function() {
        this.sideMenu.show();
    },
    hide: function() {
        this.sideMenu.hide();
    },
});
