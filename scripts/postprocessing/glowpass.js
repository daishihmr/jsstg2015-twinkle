var tm = require("../../libs/tmlib");
var THREE = require("../../libs/three");

var consts = require("../consts");

var BlurShader = require("./blurshader");
var AddBlendShader = require("./addblendshader");

tm.define("jsstg.postprocessing.GlowPass", {
    init: function() {
        this.renderToScreen = false;
        this.clear = false;
        this.needsSwap = true;
        this.enabled = true;

        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.scene = new THREE.Scene();

        this.screen = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
        this.scene.add(this.screen);

        this.baseMaterial = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.clone(THREE.CopyShader.uniforms),
            vertexShader: THREE.CopyShader.vertexShader,
            fragmentShader: THREE.CopyShader.fragmentShader
        });

        this.baseBuffer = new THREE.WebGLRenderTarget(consts.W, consts.H, {
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

        this.baseMaterial.uniforms.tDiffuse.value = readBuffer;
        this.screen.material = this.baseMaterial;
        renderer.render(this.scene, this.camera, this.baseBuffer, this.clear);

        this.blurMaterial.uniforms.tDiffuse.value = readBuffer;
        this.blurMaterial.uniforms.f.value = consts.GLOW_EFFECT_BLUR_VALUE;
        this.screen.material = this.blurMaterial;
        renderer.render(this.scene, this.camera, this.blurBuffer, this.clear);

        this.blendMaterial.uniforms.tDiffuse1.value = this.baseBuffer;
        this.blendMaterial.uniforms.tDiffuse2.value = this.blurBuffer;
        this.screen.material = this.blendMaterial;

        if (this.renderToScreen) {
            renderer.render(this.scene, this.camera);
        } else {
            renderer.render(this.scene, this.camera, writeBuffer, this.clear);
        }
    },
});

jsstg.postprocessing.GlowPass.prototype.accessor("glowLevel", {
    get: function() {
        return this.blendMaterial.uniforms.glowLevel.value
    },
    set: function(v) {
        this.blendMaterial.uniforms.glowLevel.value = v;
    },
});
