(function() {
    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");
    require("../tm/hybrid/threeelement");

    var ParticleSystem = require("./particlesystem");

    var ParticleElement = tm.createClass({
        superClass: tm.hybrid.ThreeElement,

        init: function(param) {
            if (param) {
                this.param = {}.$extend(ParticleSystem.DEFAULT_PARAM, param);
                this.superInit(new ParticleSystem(this.param));
            } else {
                this.superInit();
            }

            this.now = 0;
        },

        setUniforms: function() {
            var param = this.param;
            var uniforms = this.threeObject.material.uniforms;
            uniforms.texture.value = param.texture;
            uniforms.scale.value = param.scale;
            uniforms.timeScale.value = param.timeScale;
            uniforms.positionEasing.value = param.positionEasing;
            uniforms.sizeEasing.value = param.sizeEasing;
            uniforms.texRotEasing.value = param.texRotEasing;
            uniforms.redEasing.value = param.redEasing;
            uniforms.greenEasing.value = param.greenEasing;
            uniforms.blueEasing.value = param.blueEasing;
            uniforms.alphaEasing.value = param.alphaEasing;

            uniforms.now.value = this.now;
        },

        update: function() {
            this.now += 1;
            this.setUniforms();

            if (this.now > 100) this.remove();
        },

        draw: function() {
        },

        clone: function() {
            var c = ParticleElement();
            c.threeObject = this.threeObject.clone();
            c.param = this.param;
            c.now = 0;
            return c;
        },
    });

    ParticleElement.EXPLODE_MINI = {"count":1220,"scale":51.9,"timeScale":11,"texture":null,"lifeTime":2.6583592938733123,"lifeTimeRandom":0,"startRandom":0,"distance":26.583592938733126,"distanceRandom":1.3,"sizeFrom":14,"sizeTo":33,"sizeDuration":2.649753347427766,"texRotFrom":1,"texRotTo":1,"texRotDuration":1,"redFrom":1,"redTo":1,"redDuration":0,"greenFrom":1,"greenTo":0,"greenDuration":1.7,"blueFrom":1,"blueTo":0,"blueDuration":0.8,"alphaFrom":0.05,"alphaTo":0,"alphaDuration":3.7,"positionEasing":"2","sizeEasing":"23","texRotEasing":0,"redEasing":0,"greenEasing":0,"blueEasing":0,"alphaEasing":0};

    module.exports = ParticleElement;
})();
