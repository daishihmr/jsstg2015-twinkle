var tm = require("../libs/tmlib");
var THREE = require("../libs/three");

require("./scenes/gamescene");
require("./tm/hybrid/threeelement");
var Easing = require("./shader/easing.js");

var SoundManager = require("./soundmanager");

var Explosion = require("./elements/explosion");

tm.define("Dev", {
    superClass: "jsstg2015.scenes.GameScene",

    init: function() {
        var scene = this;
        scene.superInit();

        // var newBullet;
        // scene.on("enterframe", function(e) {
        //     if (e.app.frame % 50 === 0) {
        //         for (var i = 0; i < 13; i++) {
        //             newBullet = scene.bullets.redSmall.get();
        //             if (newBullet) newBullet.activate(-30, 40, i / 13 * Math.PI * 2);

        //             newBullet = scene.bullets.redLarge.get();
        //             if (newBullet) newBullet.activate(+30, 40, i / 13 * Math.PI * 2);

        //             newBullet = scene.bullets.blueSmall.get();
        //             if (newBullet) newBullet.activate(-15, 70, i / 13 * Math.PI * 2);

        //             newBullet = scene.bullets.blueLarge.get();
        //             if (newBullet) newBullet.activate(+15, 70, i / 13 * Math.PI * 2);
        //         }
        //     }
        // });

        // scene.one("enter", function(e) {
        //     SoundManager.playBgm("sounds/bgm1");
        // });

        var count = 100;
        var geometry = new THREE.BufferGeometry();

        var position = [];
        var change = [];
        var duration = [];
        var size = [];
        var sizeChange = [];
        var sizeDuration = [];
        var birth = [];

        var i;
        for (i = 0; i < count; i++) {
            var p = new THREE.Vector3(Math.randf(-1, 1), Math.randf(-1, 1), Math.randf(-1, 1));
            p.normalize().multiplyScalar(Math.randf(1, 5));
            position.push(p);

            var c = new THREE.Vector3(Math.randf(-1, 1), Math.randf(-1, 1), Math.randf(-1, 1));
            c.normalize().multiplyScalar(Math.randf(30, 60));
            change[i] = c;
            duration[i] = 50;

            size[i] = 10;
            sizeChange[i] = 50;
            sizeDuration[i] = 25

            birth[i] = Math.rand(10, 50);
        }

        var positionAttr = new THREE.BufferAttribute(new Float32Array(count * 3), 3);
        for (i = 0; i < position.length; i++) {
            positionAttr.setXYZ(i, position[i].x, position[i].y, position[i].z);
        }
        var changeAttr = new THREE.BufferAttribute(new Float32Array(count * 3), 3);
        for (i = 0; i < change.length; i++) {
            changeAttr.setXYZ(i, change[i].x, change[i].y, change[i].z);
        }

        geometry.addAttribute("position", positionAttr);
        geometry.addAttribute("change", changeAttr);
        geometry.addAttribute("duration", new THREE.BufferAttribute(new Float32Array(duration), 1));
        geometry.addAttribute("size", new THREE.BufferAttribute(new Float32Array(size), 1));
        geometry.addAttribute("sizeChange", new THREE.BufferAttribute(new Float32Array(sizeChange), 1));
        geometry.addAttribute("sizeDuration", new THREE.BufferAttribute(new Float32Array(sizeDuration), 1));
        geometry.addAttribute("birth", new THREE.BufferAttribute(new Float32Array(birth), 1));

        var image = tm.graphics.Canvas()
            .resize(32, 32)
            .setFillStyle(tm.graphics.RadialGradient(16, 16, 0, 16, 16, 12)
                .addColorStopList([{
                    offset: 0.0,
                    color: "hsl(50,100%,80%)",
                }, {
                    offset: 0.5,
                    color: "hsl(50,100%,70%)",
                }, {
                    offset: 1.0,
                    color: "hsl(0,100%,40%)",
                }, ])
                .toStyle()
            )
            .fillCircle(16, 16, 12)
            .element;
        var texture = new THREE.Texture(image);
        texture.needsUpdate = true;

        var material = new THREE.ShaderMaterial({
            attributes: {
                change: {
                    type: "v3",
                    value: [],
                },
                duration: {
                    type: "f",
                    value: [],
                },
                size: {
                    type: "f",
                    value: [],
                },
                sizeChange: {
                    type: "f",
                    value: [],
                },
                sizeDuration: {
                    type: "f",
                    value: [],
                },
                birth: {
                    type: "f",
                    value: [],
                },
            },
            uniforms: {
                amplitude: {
                    type: "f",
                    value: 1.0,
                },
                color: {
                    type: "c",
                    value: new THREE.Color(0xffffff),
                },
                texture: {
                    type: "t",
                    value: texture,
                },
                frame: {
                    type: "f",
                    value: 0,
                },
            },

            vertexShader: [
                "attribute vec3 change;",
                "attribute float duration;",
                "attribute float size;",
                "attribute float sizeChange;",
                "attribute float sizeDuration;",
                "attribute float birth;",
                "",
                "uniform float frame;",
                "",
                "varying float vTime;",
                "",
                Easing,
                "",
                "void main() {",
                "    float time = frame - birth;",
                "    vTime = time;",
                "",
                "    vec3 p = easeOutQuad(time, position, change, duration);",
                "    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);",
                "",
                "    float s = easeInOutQuad(time, size, sizeChange, sizeDuration);",
                "    gl_PointSize = s * (150.0 / length(mvPosition.xyz));",
                "",
                "    gl_Position = projectionMatrix * mvPosition;",
                "}",
            ].join("\n"),
            fragmentShader: [
                "uniform vec3 color;",
                "uniform sampler2D texture;",
                "",
                "varying float vTime;",
                "",
                "void main() {",
                "    if (vTime < 0.0) discard;",
                "",
                "    vec4 outColor = texture2D(texture, gl_PointCoord);",
                "",
                "    if (outColor.a < 0.5) discard;",
                "",
                "    gl_FragColor = outColor * vec4(color, 1.0);",
                "",
                "    float depth = gl_FragCoord.z / gl_FragCoord.w;",
                "    const vec3 fogColor = vec3(0.0);",
                "",
                "    float fogFactor = smoothstep(200.0, 600.0, depth);",
                "    gl_FragColor = mix(gl_FragColor, vec4(fogColor, gl_FragColor.w), fogFactor);",
                "}",
            ].join("\n"),
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true,
        });

        scene.on("enterframe", function() {
            material.uniforms.frame.value += 1;
        });

        var explosion = new THREE.PointCloud(geometry, material);
        explosion.sortParticles = true;
        explosion.frustumCulled = false;

        var exp = tm.hybrid.ThreeElement(explosion);
        exp.addChildTo(scene.gameBoard);

    },
});
