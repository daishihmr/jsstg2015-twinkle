(function() {
    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");
    require("../tm/hybrid/scene");
    require("../tm/hybrid/texture");

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

            this.directionalLight.setPosition(consts.CAMERA_DEFAULT_POSITION_X, consts.CAMERA_DEFAULT_POSITION_Y, consts.CAMERA_DEFAULT_POSITION_Z);

            scene.camera.target = new THREE.Vector3(0, 0, 0);
            scene.camera.moveRate = new THREE.Vector3(0.25, 0, 0);
            scene.camera
                .setUp(new THREE.Vector3(0, 1, 0))
                .setPosition(consts.CAMERA_DEFAULT_POSITION_X, consts.CAMERA_DEFAULT_POSITION_Y, consts.CAMERA_DEFAULT_POSITION_Z)
                .on("enterframe", function() {
                    this.target
                        .copy(fighter.position)
                        .multiply(this.moveRate);
                    this.lookAt(this.target);
                })
                .addChildTo(gameBoard);
            scene.camera.lookAt(fighter.position);

            this.backgroundSphere = tm.hybrid.Mesh()
                .setGeometry(new THREE.SphereGeometry(500, 32, 32))
                .setMaterial(new THREE.MeshPhongMaterial({
                    side: THREE.BackSide,
                    ambient: new THREE.Color(0xffffff),
                    specular: new THREE.Color(0x000000),
                    shininess: 0,
                    map: tm.hybrid.Texture("earth"),
                }))
                .addChildTo(this)
                .on("enterframe", function() {
                    this.position.copy(scene.gameBoard.position);
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
