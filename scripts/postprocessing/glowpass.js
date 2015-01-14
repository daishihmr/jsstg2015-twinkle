var tm = require("../../libs/tmlib");
var THREE = require("../../libs/three");

var consts = require("../consts");

var BlurShader = require("./blurshader");
var AddBlendShader = require("./addblendshader");

tm.define("jsstg2015.postprocessing.GlowPass", {
    init: function() {
        this.renderToScreen = false;
        this.clear = false;
        this.needsSwap = true;
        this.enabled = true;

        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.scene = new THREE.Scene();

        this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
        this.scene.add(this.quad);

        this.backupMaterial = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.clone(THREE.CopyShader.uniforms),
            vertexShader: THREE.CopyShader.vertexShader,
            fragmentShader: THREE.CopyShader.fragmentShader
        });

        this.backupBuffer = new THREE.WebGLRenderTarget(consts.W, consts.H, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBFormat,
            stencilBuffer: false,
        });

        this.blurMaterial = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.clone(BlurShader.uniforms),
            vertexShader: BlurShader.vertexShader,
            fragmentShader: BlurShader.fragmentShader
        });

        this.blurBuffer = new THREE.WebGLRenderTarget(consts.W, consts.H, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBFormat,
            stencilBuffer: false,
        });

        this.blendMaterial = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.clone(AddBlendShader.uniforms),
            vertexShader: AddBlendShader.vertexShader,
            fragmentShader: AddBlendShader.fragmentShader
        });
    },

    render: function(renderer, writeBuffer, readBuffer, delta, maskActive) {

        this.backupMaterial.uniforms.tDiffuse.value = readBuffer;
        this.quad.material = this.backupMaterial;
        renderer.render(this.scene, this.camera, this.backupBuffer, this.clear);

        this.blurMaterial.uniforms.tDiffuse.value = readBuffer;
        this.blurMaterial.uniforms.f.value = consts.GLOW_EFFECT_BLUR_VALUE;
        this.quad.material = this.blurMaterial;
        renderer.render(this.scene, this.camera, this.blurBuffer, this.clear);

        this.blendMaterial.uniforms.tDiffuse1.value = this.backupBuffer;
        this.blendMaterial.uniforms.tDiffuse2.value = this.blurBuffer;
        this.quad.material = this.blendMaterial;

        if (this.renderToScreen) {
            renderer.render(this.scene, this.camera);
        } else {
            renderer.render(this.scene, this.camera, writeBuffer, this.clear);
        }
    },
});
