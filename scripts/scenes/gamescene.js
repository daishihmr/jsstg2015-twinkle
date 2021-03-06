(function() {
    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");
    require("../tm/hybrid/scene");
    require("../tm/hybrid/texture");

    var consts = require("../consts");
    var Background = require("../elements/background");
    // var Bullets = require("../elements/bullets");
    var Fighter = require("../elements/fighter");
    var GameBoard = require("../elements/gameboard");
    var BackgroundSphere = require("../elements/backgroundsphere");
    var GameSceneManager = require("./gamescenemanager");
    var BrightEffectPass = require("../postprocessing/brighteffectpass");

    var GameScene = tm.createClass({
        superClass: tm.hybrid.Scene,

        init: function() {
            var scene = this;
            scene.superInit();

            GameSceneManager.gameScene = this;

            this.demoPlaying = false;

            var first = scene.first = tm.hybrid.ThreeElement().addChildTo(this);

            var gameBoard = scene.gameBoard = GameBoard().addChildTo(scene.three);
            var fighter = scene.fighter = Fighter().addChildTo(scene.gameBoard);

            this.directionalLight
                .setPosition(1, 0.2, 0)
                .setIntensity(0.6);

            gameBoard.rotationX = -90;

            var camera = scene.camera;
            camera.target = new THREE.Vector3(0, 0, 0);
            camera.moveRate = new THREE.Vector3(0.25, 0, 0);
            camera
                .setPosition(consts.CAMERA_DEFAULT_POSITION_X, consts.CAMERA_DEFAULT_POSITION_Y, consts.CAMERA_DEFAULT_POSITION_Z)
                .setUp(new THREE.Vector3(0, 1, 0))
                .on("enterframe", function() {
                    this.target
                        .copy(fighter.position)
                        .multiply(this.moveRate);
                    this.lookAt(this.target);
                })
                .addChildTo(gameBoard);
            camera.lookAt(fighter.position);

            this.backgroundSphere = BackgroundSphere("darksky")
                .addChildTo(this)
                .on("enterframe", function() {
                    this.position.set(0, 0, 0);
                    camera.localToGlobal(this.position);
                });

            var sceneRenderPass = this.sceneRenderPass = new THREE.RenderPass(scene.three.scene, scene.three.camera.threeObject);
            var brightEffectPass = this.brightEffectPass = BrightEffectPass(scene.three.scene, scene.three.camera.threeObject);

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
