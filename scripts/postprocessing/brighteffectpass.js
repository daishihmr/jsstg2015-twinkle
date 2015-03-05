(function() {
    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");
    var consts = require("../consts");
    var addBlendShader = require("./addblendshader");
    var brightShader = require("./brightshader");

    var BrightEffectPass = tm.createClass({
        init: function(scene, camera) {
            this.scene = scene;
            this.camera = camera;

            this.renderToScreen = false;
            this.clear = true;
            this.needsSwap = true;
            this.enabled = true;

            this.brightLayer = createRenderTarget();
            this.currentBuffer = createRenderTarget();
            this.zanzoBuffer = createRenderTarget();

            this.brightMaterial = new THREE.ShaderMaterial(brightShader);
            this.zanzoMaterial = new THREE.ShaderMaterial(addBlendShader);

            // オフスクリーンレンダリング用
            this.osCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            this.osScene = new THREE.Scene();
            this.osScreen = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), this.zanzoMaterial);
            this.osScene.add(this.osScreen);
        },
        render: function(renderer, writeBuffer, readBuffer) {
            this._renderBrightLayer(renderer);

            this.brightMaterial.uniforms.f.value = consts.GLOW_EFFECT_BLUR_VALUE;
            this.brightMaterial.uniforms.tDiffuseBase.value = readBuffer;
            this.brightMaterial.uniforms.tDiffuseBright.value = this.brightLayer;
            this.osScreen.material = this.brightMaterial;
            if (this.renderToScreen) {
                renderer.render(this.osScene, this.osCamera);
            } else {
                renderer.render(this.osScene, this.osCamera, writeBuffer, this.clear);
            }
        },
        _renderBrightLayer: function(renderer) {
            // 前のフレームのbrightLayerをzanzoBufferに退避
            var temp = this.zanzoBuffer;
            this.zanzoBuffer = this.brightLayer;
            this.brightLayer = temp;

            // 光るマテリアル以外を真っ黒にする
            this.scene.traverseVisible(function(obj) {
                if (obj instanceof THREE.Mesh) {
                    changeMaterial(obj);
                }
            });

            // シーンをcurrentBufferにレンダリング
            renderer.render(this.scene, this.camera, this.currentBuffer, true);

            // マテリアルを元に戻す
            this.scene.traverseVisible(function(obj) {
                if (obj instanceof THREE.Mesh) {
                    rechangeMaterial(obj);
                }
            });

            // currentBufferとzanzoBufferをブレンドしてbrightLayerにレンダリング
            this.zanzoMaterial.uniforms.tDiffuse1.value = this.zanzoBuffer;
            this.zanzoMaterial.uniforms.level1.value = 0.8;
            this.zanzoMaterial.uniforms.tDiffuse2.value = this.currentBuffer;
            this.zanzoMaterial.uniforms.level2.value = 1.0;
            this.osScreen.material = this.zanzoMaterial;
            renderer.render(this.osScene, this.osCamera, this.brightLayer);
        },
    });

    var createRenderTarget = function() {
        return new THREE.WebGLRenderTarget(consts.W, consts.H, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBFormat,
            stencilBuffer: false
        });
    };

    /**
     * { 差し替え元のマテリアルUUID: 差し替え先マテリアル }
     */
    var cache = {};

    /**
     * MeshBasicMaterial以外を真っ黒に描画するためにマテリアルを差し替える
     */
    var changeMaterial = function(mesh) {
        if (!mesh.material) return;

        var orig = mesh.material;
        var uuid = orig.uuid;

        // MeshBasicMaterial以外を真っ黒に描画するためのマテリアル
        var materialForBright;

        if (uuid) {
            materialForBright = cache[uuid];
        } else {
            materialForBright = mesh._materialForBright;
        }

        if (!materialForBright) {
            if (orig instanceof THREE.MeshBasicMaterial) {
                return;
            } else if (orig instanceof THREE.MeshFaceMaterial) {
                materialForBright = new THREE.MeshFaceMaterial(
                    orig.materials.map(function(m) {
                        if (m instanceof THREE.MeshBasicMaterial) {
                            return m.clone();
                        } else {
                            return new THREE.MeshBasicMaterial({
                                color: 0x000000
                            });
                        }
                    })
                );
            } else {
                materialForBright = new THREE.MeshBasicMaterial({
                    color: 0x000000
                });
            }

            if (uuid) {
                cache[uuid] = materialForBright;
            } else {
                mesh._materialForBright = materialForBright;
            }
        }

        mesh._backupMaterial = mesh.material;
        mesh.material = materialForBright;
    };

    /**
     * changeMaterialで差し替えたマテリアルを元に戻す
     */
    var rechangeMaterial = function(mesh) {
        if (mesh._backupMaterial) {
            mesh.material = mesh._backupMaterial;
        }
    };

    module.exports = BrightEffectPass;
})();
