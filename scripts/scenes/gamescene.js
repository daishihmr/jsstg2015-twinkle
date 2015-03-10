(function() {
    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");
    require("../tm/hybrid/scene");

    var consts = require("../consts");
    var BrightEffectPass = require("../postprocessing/brighteffectpass");
    var Background = require("../elements/background");
    var Bullets = require("../elements/bullets");
    var Fighter = require("../elements/fighter");
    var GameBoard = require("../elements/gameboard");

    var GameScene = tm.createClass({
        superClass: tm.hybrid.Scene,

        init: function() {
            var scene = this;
            scene.superInit();

            var gameBoard = scene.gameBoard = GameBoard().addChildTo(scene.three);
            var fighter = scene.fighter = Fighter().addChildTo(scene.gameBoard);

            var light = this.directionalLight;
            var cameraTarget = new THREE.Vector3(0, 0, 0);
            var cameraMoveRate = new THREE.Vector3(0.25, 0, 0);
            scene.camera
                .setUp(new THREE.Vector3(0, 0, 1))
                .setPosition(consts.CAMERA_DEFAULT_POSITION_X, consts.CAMERA_DEFAULT_POSITION_Y, consts.CAMERA_DEFAULT_POSITION_Z)
                .on("enterframe", function() {
                    cameraTarget
                        .copy(fighter.position)
                        .multiply(cameraMoveRate)
                        .add(gameBoard.position);
                    this.lookAt(cameraTarget);
                    // this.lookAt(gameBoard);
                    light.setPosition(this.x, this.y, this.z);
                });

            /**
             * 弾プール
             */
            scene.bullets = {
                redSmall: Bullets(0).addChildTo(gameBoard),
                blueSmall: Bullets(240).addChildTo(gameBoard),
                redLarge: Bullets(0, 35).addChildTo(gameBoard),
                blueLarge: Bullets(240, 35).addChildTo(gameBoard),
            };

            var sceneRenderPass = new THREE.RenderPass(scene.three.scene, scene.three.camera.threeObject);
            var brightEffectPass = BrightEffectPass(scene.three.scene, scene.three.camera.threeObject);

            scene.one("enter", function(e) {
                var app = e.app;

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

        update: function(app) {},

        render: function(renderer) {
            this.effectComposer.render();
        },

    });

    module.exports = GameScene;
})();
