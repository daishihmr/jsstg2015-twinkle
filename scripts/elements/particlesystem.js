(function() {

    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");
    var easing = require("../shader/easing");
    require("../tm/hybrid/threeelement");

    var ParticleSystem = tm.createClass({
        superClass: tm.hybrid.ThreeElement,

        init: function(param) {
            this.param = {}.$extend(ParticleSystem.DEFAULT_PARAM, param);

            this.geometry = this._createGeometry(this.param);
            this.material = this._createMaterial(this.param);
            this.superInit(new THREE.PointCloud(this.geometry, this.material));

            this.particles = [];
            for (var i = 0; i < this.param.count; i++) {
                this.particles.push({
                    startTime: 0,
                    endTime: -1,
                    positionFrom: [0, 10000, 0],
                    positionTo: [0, 10000, 0],
                    index: i,
                });
            }

            this.now = 0;
            this.needsUpdate = false;
        },

        _createGeometry: function(param) {
            var geometry = new THREE.BufferGeometry();

            var count = param.count;

            var startTime = new Float32Array(count);
            var endTime = new Float32Array(count);
            var positionFrom = new Float32Array(count * 3);
            var positionTo = new Float32Array(count * 3);
            var positionEasing = new Int32Array(count);
            var sizeInfo = new Float32Array(count * 3);
            var texRotInfo = new Float32Array(count * 3);
            var redInfo = new Float32Array(count * 3);
            var greenInfo = new Float32Array(count * 3);
            var blueInfo = new Float32Array(count * 3);
            var alphaInfo = new Float32Array(count * 3);
            var texRot = new Float32Array(count);

            var vec = new THREE.Vector3();
            for (var i = 0; i < count; i++) {

                startTime[i] = 0;
                endTime[i] = -1;

                positionFrom[i * 3 + 0] = 0;
                positionFrom[i * 3 + 1] = 0;
                positionFrom[i * 3 + 2] = 0;

                positionTo[i * 3 + 0] = 0;
                positionTo[i * 3 + 1] = 0;
                positionTo[i * 3 + 2] = 0;

                sizeInfo[i * 3 + 0] = param.sizeFrom;
                sizeInfo[i * 3 + 1] = param.sizeTo;
                sizeInfo[i * 3 + 2] = param.sizeDuration;

                texRotInfo[i * 3 + 0] = param.texRotFrom;
                texRotInfo[i * 3 + 1] = param.texRotTo;
                texRotInfo[i * 3 + 2] = param.texRotDuration;

                redInfo[i * 3 + 0] = param.redFrom;
                redInfo[i * 3 + 1] = param.redTo;
                redInfo[i * 3 + 2] = param.redDuration;

                greenInfo[i * 3 + 0] = param.greenFrom;
                greenInfo[i * 3 + 1] = param.greenTo;
                greenInfo[i * 3 + 2] = param.greenDuration;

                blueInfo[i * 3 + 0] = param.blueFrom;
                blueInfo[i * 3 + 1] = param.blueTo;
                blueInfo[i * 3 + 2] = param.blueDuration;

                alphaInfo[i * 3 + 0] = param.alphaFrom;
                alphaInfo[i * 3 + 1] = param.alphaTo;
                alphaInfo[i * 3 + 2] = param.alphaDuration;
            }

            geometry.addAttribute("startTime", new THREE.BufferAttribute(startTime, 1));
            geometry.addAttribute("endTime", new THREE.BufferAttribute(endTime, 1));
            geometry.addAttribute("position", new THREE.BufferAttribute(positionFrom, 3));
            geometry.addAttribute("positionTo", new THREE.BufferAttribute(positionTo, 3));
            geometry.addAttribute("sizeInfo", new THREE.BufferAttribute(sizeInfo, 3));
            geometry.addAttribute("texRotInfo", new THREE.BufferAttribute(texRotInfo, 3));
            geometry.addAttribute("redInfo", new THREE.BufferAttribute(redInfo, 3));
            geometry.addAttribute("greenInfo", new THREE.BufferAttribute(greenInfo, 3));
            geometry.addAttribute("blueInfo", new THREE.BufferAttribute(blueInfo, 3));
            geometry.addAttribute("alphaInfo", new THREE.BufferAttribute(alphaInfo, 3));

            return geometry;
        },

        _createMaterial: function(param) {
            var material = new THREE.ShaderMaterial({
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                attributes: {
                    startTime: {
                        type: "f",
                        value: null
                    },
                    endTime: {
                        type: "f",
                        value: null
                    },
                    positionTo: {
                        type: "v3",
                        value: null
                    },
                    sizeInfo: {
                        type: "v3",
                        value: null
                    },
                    texRotInfo: {
                        type: "v3",
                        value: null
                    },
                    redInfo: {
                        type: "v3",
                        value: null
                    },
                    greenInfo: {
                        type: "v3",
                        value: null
                    },
                    blueInfo: {
                        type: "v3",
                        value: null
                    },
                    alphaInfo: {
                        type: "v3",
                        value: null
                    },
                },
                uniforms: {
                    texture: {
                        type: "t",
                        value: param.texture
                    },
                    now: {
                        type: "f",
                        value: 0.0
                    },
                    positionEasing: {
                        type: "i",
                        value: param.easing
                    },
                    sizeEasing: {
                        type: "i",
                        value: param.sizeEasing
                    },
                    texRotEasing: {
                        type: "i",
                        value: param.texRotEasing
                    },
                    redEasing: {
                        type: "i",
                        value: param.redEasing
                    },
                    greenEasing: {
                        type: "i",
                        value: param.greenEasing
                    },
                    blueEasing: {
                        type: "i",
                        value: param.blueEasing
                    },
                    alphaEasing: {
                        type: "i",
                        value: param.alphaEasing
                    },
                },
                blending: param.blending,
                alphaTest: false,
                depthTest: false,
                transparent: true,
            });

            return material;
        },

        update: function(app) {
            this.now += 0.001;

            // this._checkEnd();
            if (this.needsUpdate) {
                this._setAttributes();
                this.needsUpdate = false;
            }
            this._setUniforms();
        },

        _checkEnd: function() {
            var particles = this.particles;
            for (var i = particles.length - 1; i >= 0; i--) {
                var p = particles[i];
                if (0 < p.endTime && p.endTime < this.now) {
                    p.startTime = 0;
                    p.endTime = -1;
                    p.positionFrom = [0, 10000, 0];
                    p.positionTo = [0, 10000, 0];
                    this.needsUpdate = true;
                }
            }
        },

        _setAttributes: function() {
            var particles = this.particles;
            var geometry = this.geometry;

            var startTimeAttrs = geometry.getAttribute("startTime");
            var endTimeAttrs = geometry.getAttribute("endTime");
            var positionFromAttrs = geometry.getAttribute("position");
            var positionToAttrs = geometry.getAttribute("positionTo");

            startTimeAttrs.needsUpdate = true;
            endTimeAttrs.needsUpdate = true;
            positionFromAttrs.needsUpdate = true;
            positionToAttrs.needsUpdate = true;

            var i = 0;
            var len = particles.length;
            for (; i < len; i++) {
                var p = particles[i];
                var index = p.index;
                startTimeAttrs.array[index] = p.startTime;
                endTimeAttrs.array[index] = p.endTime;

                var positionFrom = p.positionFrom;
                var positionTo = p.positionTo;

                positionFromAttrs.array[index * 3 + 0] = positionFrom[0];
                positionFromAttrs.array[index * 3 + 1] = positionFrom[1];
                positionFromAttrs.array[index * 3 + 2] = positionFrom[2];
                positionToAttrs.array[index * 3 + 0] = positionTo[0];
                positionToAttrs.array[index * 3 + 1] = positionTo[1];
                positionToAttrs.array[index * 3 + 2] = positionTo[2];
            }
        },

        _setUniforms: function() {
            var uniforms = this.material.uniforms;
            uniforms.now.value = this.now;
        },

        /**
         * @param {Number} life エミッタの寿命
         * @param {Number} epf 1フレームあたりのパーティクル生成数
         * @param {Number?} damping 生成量の減衰率
         */
        createEmitter: function(life, epf, damping) {
            life = life || 1;
            epf = epf || 1;
            damping = damping || 1;
            return ParticleEmitter(this, life, epf, damping).addChildTo(this.parent);
        },

        _lastI: 0,
        _emit: function(position) {
            var param = this.param;
            var particles = this.particles;

            var i = 0;
            var len = this.particles.length;
            for (; i < len; i++) {
                if (particles[i].endTime < this.now) break;
            }

            if (i === len) {
                console.warn("パーティクルが足りない");
                return;
            }

            var p = particles[i];

            p.startTime = this.now;
            if (param.lifeRandom !== 0) {
                p.endTime = this.now + param.life * Math.randf(1 - param.lifeRandom, 1 + param.lifeRandom) * 0.001;
            } else {
                p.endTime = this.now + param.life;
            }

            if (param.emitRange !== 0) {
                randomizeTempVector();
                tempVector.setLength(Math.randf(0, param.emitRange));
                p.positionFrom = [
                    position.x + tempVector.x,
                    position.y + tempVector.y,
                    position.z + tempVector.z,
                ];
            } else {
                p.positionFrom = [
                    position.x,
                    position.y,
                    position.z,
                ];
            }

            if (param.direction !== null) {
                tempVector.set(param.direction);
            } else {
                randomizeTempVector();
                tempVector.normalize();
            }

            if (param.distanceRandom !== 0) {
                tempVector.setLength(param.distance * Math.randf(1 - param.distanceRandom, 1 + param.distanceRandom));
            } else {
                tempVector.setLength(param.distance);
            }

            p.positionTo = [
                position.x + tempVector.x,
                position.y + tempVector.y,
                position.z + tempVector.z,
            ];

            this.needsUpdate = true;
        },
    });

    var tempVector = new THREE.Vector3();
    var randomizeTempVector = function() {
        tempVector.set(Math.randf(-1, 1), Math.randf(-1, 1), Math.randf(-1, 1));
        while (tempVector.lengthSq() > 1) {
            tempVector.set(Math.randf(-1, 1), Math.randf(-1, 1), Math.randf(-1, 1));
        }
        tempVector.normalize();
        return tempVector;
    };

    var DEFAULT_TEXTURE = (function() {
        var size = 256;
        var canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        var ctx = canvas.getContext("2d");
        var g = ctx.createRadialGradient(size * 0.5, size * 0.5, 0, size * 0.5, size * 0.5, size * 0.5);
        g.addColorStop(0.00, "hsla(  0,  80%, 100%, 1.0)");
        g.addColorStop(0.20, "hsla(  0,  80%, 100%, 1.0)");
        g.addColorStop(1.00, "hsla(  0,  80%, 100%, 0.0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, size, size);

        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    })();

    ParticleSystem.DEFAULT_PARAM = {
        // テクスチャ
        texture: DEFAULT_TEXTURE,
        // 頂点数
        count: 10000,
        // 寿命(フレーム)
        life: 60,
        // 寿命のランダム幅(life=1.0, lifeRandom=0.1 → life=0.9～1.1)
        lifeRandom: 0,
        // 生成範囲(エミッタからの距離)
        emitRange: 0,
        // 移動方向ベクトル(null時はランダム方向へ)
        direction: null,
        // 移動方向ランダム角
        directionRandom: 0,
        // 移動距離
        distance: 1.0,
        // 移動距離ランダム幅
        distanceRandom: 0,
        // 移動イージング
        easing: easing.LINEAR,
        // ブレンディング
        blending: THREE.AdditiveBlending,

        // サイズ初期値
        sizeFrom: 1.0,
        // サイズ最終値
        sizeTo: 1.0,
        // サイズ変化時間(lifeを1とした場合)
        sizeDuration: 1.0,
        // サイズイージング
        sizeEasing: easing.LINEAR,

        // 回転初期値
        texRotFrom: 0.0,
        // 回転最終値
        texRotTo: 0.0,
        // 回転変化時間(lifeを1とした場合)
        texRotDuration: 0.0,
        // 回転イージング
        texRotEasing: easing.LINEAR,

        // 赤成分初期値
        redFrom: 1.0,
        // 赤成分最終値
        redTo: 1.0,
        // 赤成分変化時間(lifeを1とした場合)
        redDuration: 1.0,
        // 赤成分イージング
        redEasing: easing.LINEAR,

        // 緑成分初期値
        greenFrom: 1.0,
        // 緑成分最終値
        greenTo: 1.0,
        // 緑成分変化時間(lifeを1とした場合)
        greenDuration: 1.0,
        // 緑成分イージング
        greenEasing: easing.LINEAR,

        // 青成分初期値
        blueFrom: 1.0,
        // 青成分最終値
        blueTo: 1.0,
        // 青成分変化時間(lifeを1とした場合)
        blueDuration: 1.0,
        // 青成分イージング
        blueEasing: easing.LINEAR,

        // アルファ成分初期値
        alphaFrom: 1.0,
        // アルファ成分最終値
        alphaTo: 0.0,
        // アルファ成分変化時間(lifeを1とした場合)
        alphaDuration: 1.0,
        // アルファ成分イージング
        alphaEasing: easing.LINEAR,
    };

    var ParticleEmitter = tm.createClass({
        superClass: tm.hybrid.ThreeElement,

        init: function(particleSystem, life, epf, damping) {
            this.superInit();
            this.particleSystem = particleSystem;
            this.life = life;
            this.epf = epf;
            this.damping = damping;
        },

        update: function(app) {
            for (var i = 0; i < this.epf; i++) {
                this.particleSystem._emit(this.position);
            }

            this.life -= 1;
            this.epf *= this.damping;
            if (this.life <= 0) {
                this.remove();
            }
        },
    });

    var vertexShader = [
        "attribute float startTime;",
        "attribute float endTime;",

        "attribute vec3  positionTo;",
        "uniform   int   positionEasing;",

        "attribute vec3  sizeInfo;",
        "uniform   int   sizeEasing;",

        "attribute vec3  texRotInfo;",
        "uniform   int   texRotEasing;",

        "attribute vec3  redInfo;",
        "uniform   int   redEasing;",

        "attribute vec3  greenInfo;",
        "uniform   int   greenEasing;",

        "attribute vec3  blueInfo;",
        "uniform   int   blueEasing;",

        "attribute vec3  alphaInfo;",
        "uniform   int   alphaEasing;",

        "uniform float now;",

        "varying mat3 vTexRot;",
        "varying float vVisible;",
        "varying vec4 vColor;",

        easing.definition,

        "void main() {",
        "    float sizeFrom      = sizeInfo[0];",
        "    float sizeTo        = sizeInfo[1];",
        "    float sizeDuration  = sizeInfo[2];",
        "",
        "    float texRotFrom    = texRotInfo[0];",
        "    float texRotTo      = texRotInfo[1];",
        "    float texRotDuration= texRotInfo[2];",
        "",
        "    float redFrom       = redInfo[0];",
        "    float redTo         = redInfo[1];",
        "    float redDuration   = redInfo[2];",
        "",
        "    float greenFrom     = greenInfo[0];",
        "    float greenTo       = greenInfo[1];",
        "    float greenDuration = greenInfo[2];",
        "",
        "    float blueFrom      = blueInfo[0];",
        "    float blueTo        = blueInfo[1];",
        "    float blueDuration  = blueInfo[2];",
        "",
        "    float alphaFrom     = alphaInfo[0];",
        "    float alphaTo       = alphaInfo[1];",
        "    float alphaDuration = alphaInfo[2];",
        "",
        "    float time = (now - startTime) / (endTime - startTime);",
        "    if (time < 0.0 || 1.0 <= time) {",
        "        vVisible = 0.0;",
        "        gl_PointSize = 0.0;",
        "        gl_Position = vec4(0.0);",
        "        return;",
        "    } else {",
        "        vVisible = 1.0;",
        "    }",
        "",
        "    float sizeTime  = (now - startTime) / (sizeDuration * (endTime - startTime));",
        "    float texRotTime= (now - startTime) / (texRotDuration * (endTime - startTime));",
        "    float redTime   = (now - startTime) / (redDuration * (endTime - startTime));",
        "    float greenTime = (now - startTime) / (greenDuration * (endTime - startTime));",
        "    float blueTime  = (now - startTime) / (blueDuration * (endTime - startTime));",
        "    float alphaTime = (now - startTime) / (alphaDuration * (endTime - startTime));",
        "",
        "    float texRot = texRotFrom + (texRotTo - texRotFrom) * ease(texRotEasing, texRotTime);",
        "    vTexRot = mat3(",
        "        1.0, 0.0, 0.0,",
        "        0.0, 1.0, 0.0,",
        "        0.5, 0.5, 1.0",
        "    ) * mat3(",
        "        cos(texRot), sin(texRot), 0.0,",
        "       -sin(texRot), cos(texRot), 0.0,",
        "        0.0, 0.0, 1.0",
        "    ) * mat3(",
        "        1.0, 0.0, 0.0,",
        "        0.0, 1.0, 0.0,",
        "       -0.5,-0.5, 1.0",
        "    );",
        "",
        "    vColor = vec4(",
        "        redFrom   + (redTo   - redFrom)   * ease(redEasing,   redTime),",
        "        greenFrom + (greenTo - greenFrom) * ease(greenEasing, greenTime),",
        "        blueFrom  + (blueTo  - blueFrom)  * ease(blueEasing,  blueTime),",
        "        alphaFrom + (alphaTo - alphaFrom) * ease(alphaEasing, alphaTime)",
        "    );",
        "",
        "    vec4 mvPosition = modelViewMatrix * vec4( position + (positionTo - position) * ease(positionEasing, time), 1.0 );",
        "    float s = sizeFrom + (sizeTo - sizeFrom) * ease(sizeEasing, sizeTime);",
        "    gl_PointSize = s * ( 300.0 / length( mvPosition.xyz ) );",
        "    gl_Position = projectionMatrix * mvPosition;",
        "}",
    ].join("\n");

    var fragmentShader = [
        "uniform sampler2D texture;",

        "varying mat3 vTexRot;",
        "varying float vVisible;",
        "varying vec4 vColor;",

        "void main() {",
        "    if (vVisible == 0.0) {",
        "        discard;",
        "    }",
        "    gl_FragColor = texture2D( texture, (vTexRot * vec3(gl_PointCoord, 1.0)).xy ) * vColor;",
        "}",
    ].join("\n");

    module.exports = ParticleSystem;
})();
