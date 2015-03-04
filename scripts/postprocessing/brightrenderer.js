(function() {

    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");

    var consts = require("../consts");

    var BlurShader = require("./blurshader");
    var AddBlendShader = require("./addblendshader");

    tm.define("jsstg.postprocessing.BrightRenderer", {
        init: function() {
            this.brightLayer = new THREE.WebGLRenderTarget(consts.W, consts.H, {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBFormat,
                stencilBuffer: false
            });
            this.zanzoBuffer = new THREE.WebGLRenderTarget(consts.W, consts.H, {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBFormat,
                stencilBuffer: false
            });
            this.writeBuffer = new THREE.WebGLRenderTarget(consts.W, consts.H, {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBFormat,
                stencilBuffer: false
            });

            this.zanzoMaterial = new THREE.ShaderMaterial({
                uniforms: THREE.UniformsUtils.clone(AddBlendShader.uniforms),
                vertexShader: AddBlendShader.vertexShader,
                fragmentShader: AddBlendShader.fragmentShader
            });
            this.zanzoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            this.zanzoScene = new THREE.Scene();
            this.zanzoScreen = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), this.zanzoMaterial);
            this.zanzoScene.add(this.zanzoScreen);
        },

        renderBrightLayer: function(renderer, scene) {
            scene.three.traverseVisible(function(obj) {
                if (obj instanceof THREE.Mesh) {
                    changeMaterial.call(obj);
                }
            });

            var temp = this.zanzoBuffer;
            this.zanzoBuffer = this.brightLayer;
            this.brightLayer = temp;

            renderer.render(scene.three.scene, scene.three.camera.threeObject, this.writeBuffer, true);

            this.zanzoMaterial.uniforms.tDiffuse1.value = this.zanzoBuffer;
            this.zanzoMaterial.uniforms.tDiffuse2.value = this.writeBuffer;
            this.zanzoMaterial.uniforms.level1.value = 0.8;
            this.zanzoMaterial.uniforms.level2.value = 1.0;
            renderer.render(this.zanzoScene, this.zanzoCamera, this.brightLayer);

            scene.three.traverseVisible(function(obj) {
                if (obj instanceof THREE.Mesh) {
                    rechangeMaterial.call(obj);
                }
            });
        },

        getPass: function() {
            return jsstg.postprocessing.BrightPass(this);
        },
    });

    tm.define("jsstg.postprocessing.BrightPass", {
        init: function(brightRenderer) {
            this.brightRenderer = brightRenderer;

            this.renderToScreen = false;
            this.clear = true;
            this.needsSwap = true;
            this.enabled = true;

            this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            this.scene = new THREE.Scene();

            this.screen = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
            this.scene.add(this.screen);

            this.blurMaterial = new THREE.ShaderMaterial({
                uniforms: THREE.UniformsUtils.clone(BlurShader.uniforms),
                vertexShader: BlurShader.vertexShader,
                fragmentShader: BlurShader.fragmentShader
            });
        },
        render: function(renderer, writeBuffer, readBuffer, delta, maskActive) {
            this.blurMaterial.uniforms.f.value = consts.GLOW_EFFECT_BLUR_VALUE;
            this.blurMaterial.uniforms.tDiffuseBase.value = this.readBuffer;
            this.blurMaterial.uniforms.tDiffuseBlur.value = this.brightRenderer.brightLayer;
            this.screen.material = this.blurMaterial;
            if (this.renderToScreen) {
                renderer.render(this.scene, this.camera);
            } else {
                renderer.render(this.scene, this.camera, writeBuffer, this.clear);
            }
        },
    });

    /**
     * @this {THREE.Mesh}
     */
    var changeMaterial = function() {
        if (this.material instanceof THREE.MeshBasicMaterial) {
            return;
        } else if (this.material instanceof THREE.MeshFaceMaterial) {
            if (this._materialForBright === undefined) {
                this._materialForBright = new THREE.MeshFaceMaterial(
                    this.material.materials.map(function(m) {
                        if (m instanceof THREE.MeshBasicMaterial) {
                            return m.clone();
                        } else {
                            return new THREE.MeshBasicMaterial({
                                color: 0x000000
                            });
                        }
                    })
                );
            }
        } else {
            if (this._materialForBright === undefined) {
                this._materialForBright = new THREE.MeshBasicMaterial({
                    color: 0x000000
                });
            }
        }
        this._backupMaterial = this.material;
        this.material = this._materialForBright;
    };

    /**
     * @this {THREE.Mesh}
     */
    var rechangeMaterial = function() {
        if (this._backupMaterial) {
            this.material = this._backupMaterial;
        }
    };

})();
