var tm = require("../libs/tmlib");
var THREE = require("../libs/three");
require("../scripts/tm/hybrid/application");

var consts = require("../scripts/consts");
var Bullets = require("../scripts/elements/bullets");

tm.main(function() {

    var app = tm.hybrid.Application("#c2", "#c3");
    app.fps = 60;
    app.resize(consts.W, consts.H).fitWindow();
    app.run();

    tm.asset.Script.loadStats().on("load", function() {
        app.enableStats();
    });

    app.replaceScene(tm.game.LoadingScene({
        assets: {
            "bullets": "../images/bullets.png",
        },
        nextScene: MainScene,
    }))

});

tm.define("MainScene", {
    superClass: "tm.hybrid.Scene",
    init: function() {
        this.superInit();
        
        this.bullets = Bullets().addChildTo(this);
        this.camera.z += 7;
    },

    update: function(app) {
        (7).times(function(i) {
            var v = tm.geom.Vector2().setAngle(app.frame * 3 + i * 360 / 7, 0.05);
            var b = this.bullets.get();
            if (b) {
                b.addChildTo(this);
                b.x = b.y = 0;
                b.v = v;
                b.type = Math.rand(0, 3);
                b.frame = 0;
                b.rotation = v.toAngle();
                if (!b.hasEventListener("enterframe")) {
                    b.on("enterframe", function(e) {
                        this.frame = 1 + ~~(e.app.frame / 4) % 3;
                        this.x += this.v.x;
                        this.y += this.v.y;
                        if (this.x * this.x + this.y * this.y > 8 * 8) {
                            this.remove();
                        }
                    });
                }
            }
        }.bind(this));
    }
});
