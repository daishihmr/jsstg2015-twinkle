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
        this.camera.z += 15;
    },

    update: function(app) {
        (20).times(function() {
            var v = tm.geom.Vector2().setRandom().mul(0.1);
            var b = this.bullets.get();
            if (b) {
                b.rotation = v.toAngle();
                b.on("enterframe", function() {
                    this.x += v.x;
                    this.y += v.y;
                    if (this.x < -10 || 10 < this.x || this.y < -10 || 10 < this.y) {
                        this.remove();
                        this.dispose();
                    }
                });
                b.addChildTo(this);
            }
        }.bind(this));
    }
});
