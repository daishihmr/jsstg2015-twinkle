var tm = require("../../libs/tmlib");
var THREE = require("../../libs/three");

var consts = require("../consts");

require("../tm/hybrid/hybridscene");
require("../tm/hybrid/mesh");
require("../tm/hybrid/shape");
require("../tm/hybrid/directionallight");
require("../postprocessing/brighteffectpass");
require("../elements/background");
require("../elements/bullets");
require("../elements/fighter");
require("../elements/gameboard");

tm.define("jsstg.scenes.GameScene", {
    superClass: "tm.hybrid.HybridScene",

    init: function() {
        var scene = this;
        scene.superInit();

        var background = scene.background = jsstg.elements.Background().addChildTo(scene.three);
        var gameBoard = scene.gameBoard = jsstg.elements.GameBoard().addChildTo(scene.three);
        var fighter = scene.fighter = jsstg.elements.Fighter(); //.addChildTo(scene.gameBoard);

        var cameraTarget = new THREE.Vector3(0, 0, 0);
        var cameraMoveRate = new THREE.Vector3(0.25, 0, 0);
        scene.camera
            .setPosition(0, 0, -200)
            .on("enterframe", function() {
                cameraTarget
                    .copy(fighter.position)
                    .multiply(cameraMoveRate)
                    .add(gameBoard.position);
                this.lookAt(cameraTarget);
            })
            .addChildTo(gameBoard);

        /**
         * 弾プール
         */
        scene.bullets = {
            redSmall: jsstg.elements.Bullets(0).addChildTo(gameBoard),
            blueSmall: jsstg.elements.Bullets(240).addChildTo(gameBoard),
            redLarge: jsstg.elements.Bullets(0, 35).addChildTo(gameBoard),
            blueLarge: jsstg.elements.Bullets(240, 35).addChildTo(gameBoard),
        };

        var sceneRenderPass = new THREE.RenderPass(scene.three.scene, scene.three.camera.threeObject);
        var brightEffectPass = jsstg.postprocessing.BrightEffectPass(scene.three.scene, scene.three.camera.threeObject);

        scene.one("enter", function(e) {
            var app = e.app;

            tm.dom.Element(app.element).visible = false;

            var composer = scene.effectComposer = new THREE.EffectComposer(
                app.threeRenderer,
                new THREE.WebGLRenderTarget(consts.W, consts.H, {
                    minFilter: THREE.LinearFilter,
                    magFilter: THREE.LinearFilter,
                    format: THREE.RGBFormat,
                    stencilBuffer: false,
                })
            );

            composer.addPass(sceneRenderPass);
            // composer.addPass(new THREE.ShaderPass(THREE.CopyShader));
            composer.addPass(brightEffectPass);

            composer.passes.forEach(function(pass, i, passes) {
                pass.renderToScreen = i === passes.length - 1;
            });
        });
    },

    update: function(app) {
    },

    render: function(renderer) {
        this.effectComposer.render();
    },

});
