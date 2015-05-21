var tm = require("../libs/tmlib");
var THREE = require("../libs/three");
require("../scripts/tm/hybrid/application");
require("../scripts/tm/hybrid/mesh");

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

        var gameboard = tm.hybrid.ThreeElement()
            .addChildTo(this);
        
        this.bullets = Bullets().addChildTo(gameboard);
        this.bullets.on("enterframe", function() {
            this.x -= -0.02;
        });

        tm.hybrid.Mesh()
            .setGeometry(new THREE.BoxGeometry(0.5, 0.5, 0.5))
            .setMaterial(new THREE.MeshNormalMaterial())
            .addChildTo(this.bullets);
        
        this.camera.z = 300;


        this.frame = -1;
    },

    update: function(app) {
        this.camera.lookAt(this.bullets);

        this.frame += 1;

        if (this.frame % 20 !== 0) return;

        (10).times(function(i) {
            var v = tm.geom.Vector2(2, 0);
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
                        if (this.x * this.x + this.y * this.y > 10000) {
                            this.remove();
                        }
                    });
                }
            }
        }.bind(this));
    }
});
