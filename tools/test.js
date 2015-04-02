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
        (512).times(function() {
            var v = tm.geom.Vector2().setRandom().mul(Math.randf(0.05, 0.09));
            var b = this.bullets.get();
            if (b) {
                b.type = Math.rand(0, 3);
                b.frame = 0;
                b.rotation = v.toAngle();
                b.on("enterframe", function(e) {
                    this.frame = 1 + ~~(e.app.frame / 4) % 3;
                    this.x += v.x;
                    this.y += v.y;
                    if (this.x * this.x + this.y * this.y > 20*20) {
                        this.remove();
                        this.dispose();
                    }
                });
                b.addChildTo(this);
            }
        }.bind(this));
    }
});
