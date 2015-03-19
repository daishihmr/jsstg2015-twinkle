(function() {
    if (typeof module !== 'undefined' && module.exports) {
        var THREE = require("../../libs/three");
        var easing = require("../shader/easing");
    } else {
        var THREE = window["THREE"];
        var easing = window["easing"];
    }

    var ParticleSystem = function(param) {
        if (arguments.length === 2) {
            return THREE.PointCloud.call(this, arguments[0], arguments[1]);
        }

        var count = param.count;

        var geometry = new THREE.BufferGeometry();

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

            var pos = param.position();

            startTime[i] = Math.random() * param.startRandom;
            endTime[i] = startTime[i] + param.lifeTime * (1.0 + Math.random() * param.lifeTimeRandom);

            positionFrom[i * 3 + 0] = pos.from.x;
            positionFrom[i * 3 + 1] = pos.from.y;
            positionFrom[i * 3 + 2] = pos.from.z;

            pos.to.setLength(param.distance * (1.0 + Math.random() * param.distanceRandom));

            positionTo[i * 3 + 0] = pos.to.x;
            positionTo[i * 3 + 1] = pos.to.y;
            positionTo[i * 3 + 2] = pos.to.z;

            sizeInfo[i * 3 + 0] = param.sizeFrom; // from
            sizeInfo[i * 3 + 1] = param.sizeTo; // to
            sizeInfo[i * 3 + 2] = param.sizeDuration; // duration

            texRotInfo[i * 3 + 0] = param.texRotFrom; // from
            texRotInfo[i * 3 + 1] = param.texRotTo; // to
            texRotInfo[i * 3 + 2] = param.texRotDuration; // duration

            redInfo[i * 3 + 0] = param.redFrom; // from
            redInfo[i * 3 + 1] = param.redTo; // to
            redInfo[i * 3 + 2] = param.redDuration; // duration

            greenInfo[i * 3 + 0] = param.greenFrom; // from
            greenInfo[i * 3 + 1] = param.greenTo; // to
            greenInfo[i * 3 + 2] = param.greenDuration; // duration

            blueInfo[i * 3 + 0] = param.blueFrom; // from
            blueInfo[i * 3 + 1] = param.blueTo; // to
            blueInfo[i * 3 + 2] = param.blueDuration; // duration

            alphaInfo[i * 3 + 0] = param.alphaFrom; // from
            alphaInfo[i * 3 + 1] = param.alphaTo; // to
            alphaInfo[i * 3 + 2] = param.alphaDuration; // duration
        }

        geometry.addAttribute('startTime', new THREE.BufferAttribute(startTime, 1));
        geometry.addAttribute('endTime', new THREE.BufferAttribute(endTime, 1));
        geometry.addAttribute('position', new THREE.BufferAttribute(positionFrom, 3));
        geometry.addAttribute('positionTo', new THREE.BufferAttribute(positionTo, 3));
        geometry.addAttribute('sizeInfo', new THREE.BufferAttribute(sizeInfo, 3));
        geometry.addAttribute('texRotInfo', new THREE.BufferAttribute(texRotInfo, 3));
        geometry.addAttribute('redInfo', new THREE.BufferAttribute(redInfo, 3));
        geometry.addAttribute('greenInfo', new THREE.BufferAttribute(greenInfo, 3));
        geometry.addAttribute('blueInfo', new THREE.BufferAttribute(blueInfo, 3));
        geometry.addAttribute('alphaInfo', new THREE.BufferAttribute(alphaInfo, 3));

        var material = new THREE.ShaderMaterial({
            type: "ParticleSystemMaterial",
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            attributes: {
                startTime: {
                    type: 'f',
                    value: null
                },
                endTime: {
                    type: 'f',
                    value: null
                },
                positionTo: {
                    type: 'v3',
                    value: null
                },
                sizeInfo: {
                    type: 'v3',
                    value: null
                },
                texRotInfo: {
                    type: 'v3',
                    value: null
                },
                redInfo: {
                    type: 'v3',
                    value: null
                },
                greenInfo: {
                    type: 'v3',
                    value: null
                },
                blueInfo: {
                    type: 'v3',
                    value: null
                },
                alphaInfo: {
                    type: 'v3',
                    value: null
                },
            },
            uniforms: {
                texture: {
                    type: "t",
                    value: ParticleSystem.DEFAULT_PARAM.texture
                },
                now: {
                    type: "f",
                    value: 0.0
                },
                scale: {
                    type: 'f',
                    value: ParticleSystem.DEFAULT_PARAM.scale
                },
                timeScale: {
                    type: "f",
                    value: ParticleSystem.DEFAULT_PARAM.timeScale
                },
                positionEasing: {
                    type: 'i',
                    value: ParticleSystem.DEFAULT_PARAM.positionEasing
                },
                sizeEasing: {
                    type: 'i',
                    value: ParticleSystem.DEFAULT_PARAM.sizeEasing
                },
                texRotEasing: {
                    type: 'i',
                    value: ParticleSystem.DEFAULT_PARAM.texRotEasing
                },
                redEasing: {
                    type: 'i',
                    value: ParticleSystem.DEFAULT_PARAM.redEasing
                },
                greenEasing: {
                    type: 'i',
                    value: ParticleSystem.DEFAULT_PARAM.greenEasing
                },
                blueEasing: {
                    type: 'i',
                    value: ParticleSystem.DEFAULT_PARAM.blueEasing
                },
                alphaEasing: {
                    type: 'i',
                    value: ParticleSystem.DEFAULT_PARAM.alphaEasing
                },
            },
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });

        THREE.PointCloud.call(this, geometry, material);
    };

    ParticleSystem.prototype = Object.create(THREE.PointCloud.prototype);
    ParticleSystem.prototype.constructor = ParticleSystem;

    var DEFAULT_TEXTURE = (function() {
        var radius = 1024;
        var canvas = document.createElement("canvas");
        canvas.width = radius;
        canvas.height = radius;
        var ctx = canvas.getContext("2d");
        var g = ctx.createRadialGradient(radius * 0.5, radius * 0.5, 0, radius * 0.5, radius * 0.5, radius * 0.5);
        g.addColorStop(0.00, "hsla(  0,  80%, 100%, 1.0)");
        g.addColorStop(0.20, "hsla(  0,  80%, 100%, 1.0)");
        g.addColorStop(1.00, "hsla(  0,  80%, 100%, 0.0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, radius, radius);

        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    })();

    ParticleSystem.DEFAULT_PARAM = {
        position: function() {
            return {
                from: new THREE.Vector3(0, 0, 0),
                to: new THREE.Vector3(Math.random() * 1 - 0.5, Math.random() * 1 - 0.5, Math.random() * 1 - 0.5).normalize(),
            };
        },
        count: 1000,
        scale: 1.0,
        timeScale: 60,
        texture: DEFAULT_TEXTURE,
        lifeTime: 1.0,
        lifeTimeRandom: 0.0,
        startRandom: 0,
        distance: 5,
        distanceRandom: 0,
        sizeFrom: 1.0,
        sizeTo: 1.0,
        sizeDuration: 1.0,
        texRotFrom: 1.0,
        texRotTo: 1.0,
        texRotDuration: 1.0,
        redFrom: 1.0,
        redTo: 1.0,
        redDuration: 1.0,
        greenFrom: 1.0,
        greenTo: 1.0,
        greenDuration: 1.0,
        blueFrom: 1.0,
        blueTo: 1.0,
        blueDuration: 1.0,
        alphaFrom: 1.0,
        alphaTo: 0.0,
        alphaDuration: 1.0,
        positionEasing: easing.easing.LINEAR,
        sizeEasing: easing.easing.LINEAR,
        texRotEasing: easing.easing.LINEAR,
        redEasing: easing.easing.LINEAR,
        greenEasing: easing.easing.LINEAR,
        blueEasing: easing.easing.LINEAR,
        alphaEasing: easing.easing.LINEAR,
    };

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
        "uniform float timeScale;",
        "uniform float scale;",

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
        "    float time = (now / timeScale - startTime) / (endTime - startTime);",
        "    if (time < 0.0) {",
        "        vVisible = 0.0;",
        "        return;",
        "    } else {",
        "        vVisible = 1.0;",
        "    }",
        "",
        "    float sizeTime  = (now / timeScale - startTime) / sizeDuration;",
        "    float texRotTime= (now / timeScale - startTime) / texRotDuration;",
        "    float redTime   = (now / timeScale - startTime) / redDuration;",
        "    float greenTime = (now / timeScale - startTime) / greenDuration;",
        "    float blueTime  = (now / timeScale - startTime) / blueDuration;",
        "    float alphaTime = (now / timeScale - startTime) / alphaDuration;",
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
        "    vec4 mvPosition = modelViewMatrix * vec4( position + (positionTo - position) * ease(positionEasing, time), 1.0 ) * scale;",
        "    float s = sizeFrom + (sizeTo - sizeFrom) * ease(sizeEasing, sizeTime);",
        "    gl_PointSize = s * ( 300.0 / length( mvPosition.xyz ) ) * scale;",
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

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ParticleSystem;
    } else {
        window["ParticleSystem"] = ParticleSystem;
    }

})();
