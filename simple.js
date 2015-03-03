var tm = require("./libs/tmlib.js");
require("./scripts/tm/asset/threejson.js");
require("./scripts/tm/hybrid/camera.js");
require("./scripts/tm/hybrid/colorconv.js");
require("./scripts/tm/hybrid/directionallight.js");
require("./scripts/tm/hybrid/hybridapp.js");
require("./scripts/tm/hybrid/hybridscene.js");
require("./scripts/tm/hybrid/mesh.js");
require("./scripts/tm/hybrid/orthocamera.js");
require("./scripts/tm/hybrid/shape.js");
require("./scripts/tm/hybrid/sprite.js");
require("./scripts/tm/hybrid/threeelement.js");
var THREE = require("./libs/three.js");

var app;
tm.main(function() {
    app = tm.hybrid.HybridApp("#app");
    app.resize(500, 500).fitWindow();
    app.run();

    app.replaceScene(tm.scene.LoadingScene({
        width: 500,
        height: 500,
        assets: {
            "test": {
                type: "three",
                url: "images/test.js",
            },
        },
        nextScene: SimpleScene,
    }))
});

tm.define("SimpleScene", {
    superClass: "tm.hybrid.HybridScene",

    init: function() {
        this.superInit();

        var test = this.test = tm.hybrid.Mesh("test");
        test.on("enterframe", function() {
            this.rotation.x += 0.1;
            this.rotation.y += 0.05;
        });
        test.addChildTo(this);

        this.orig = test.material.materials[0];

        this.blackMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
        });

        console.log(test.material);
    },

    update: function(app) {
        if (app.frame % 2 === 0) {
            this.test.material.materials[0] = this.blackMaterial;
        } else {
            this.test.material.materials[0] = this.orig;
        }
    },
});
