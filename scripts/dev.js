(function() {
    var tm = require("../libs/tmlib");
    var THREE = require("../libs/three");
    require("./tm/hybrid/threeelement");

    var GameScene = require("./scenes/gamescene");
    var Easing = require("./shader/easing.js");
    var SoundManager = require("./soundmanager");
    var ParticleSystem = require("./elements/particlesystem");
    var Cloud = require("./elements/cloud");

    var Dev = tm.createClass({
        superClass: GameScene,

        init: function() {
            var scene = this;
            scene.superInit();

            // var geo = new THREE.Geometry();
            // var box = new THREE.BoxGeometry(10, 10, 10);
            // var matrix = new THREE.Matrix4();
            // for (var x = -200; x < 200; x += 75) {
            //     for (var y = -400; y < 400; y += 75) {
            //         for (var z = -200; z < 200; z += 75) {
            //             matrix.identity().setPosition({
            //                 x: x,
            //                 y: y,
            //                 z: z,
            //             });
            //             geo.merge(box, matrix);
            //         }
            //     }
            // }
            // tm.hybrid.Mesh()
            //     .setGeometry(geo)
            //     .setMaterial(new THREE.MeshBasicMaterial({
            //         color: 0x442200
            //     }))
            //     .addChildTo(this)
            //     .on("enterframe", function() {
            //         this.z -= 2;
            //         if (this.z < -400) this.z += 800;
            //     });
            // tm.hybrid.Mesh()
            //     .setZ(400)
            //     .setGeometry(geo)
            //     .setMaterial(new THREE.MeshBasicMaterial({
            //         color: 0x004422
            //     }))
            //     .addChildTo(this)
            //     .on("enterframe", function() {
            //         this.z -= 2;
            //         if (this.z < -400) this.z += 800;
            //     });

            var cloud = Cloud("clouddark")
                .setY(-160)
                .addChildTo(this.first)
                .on("enterframe", function() {
                    this.z -= 0.6;
                });

            this.fogColor = new THREE.Color(0x000000);
            this.fogNear = 100;
            this.fogFar = 500;
            this.tweener.clear()
                .to({
                    fogNear: 1000,
                    fogFar: 1500
                }, 60 * 1000);

            var groundScale = 800;

            var ground = tm.hybrid.Mesh("stage1/ground")
                .setScale(groundScale)
                .setY(-500)
                .on("enterframe", function() {
                    this.z -= 0.2;
                })
                .addChildTo(this);
            ground.material.materials.forEach(function(m) {
                m.shading = THREE.SmoothShading;
                m.side = THREE.DoubleSide;
            });
            var ground2 = tm.hybrid.Mesh("stage1/ground")
                .setScale(groundScale, groundScale, -groundScale)
                .setY(-500)
                .on("enterframe", function() {
                    this.z -= 0.2;
                })
                .addChildTo(this);
            ground2.material.materials.forEach(function(m) {
                m.shading = THREE.SmoothShading;
                m.side = THREE.DoubleSide;
            });

            ground.geometry.computeBoundingBox();
            console.log(ground.geometry.boundingBox);

            var l = ground.geometry.boundingBox.max.z * 2 * groundScale;
            ground2.z = l;

            ground.on("enterframe", function() {
                if (this.z < -l) {
                    this.z += l * 2;
                }
            });
            ground2.on("enterframe", function() {
                if (this.z < -l) {
                    this.z += l * 2;
                }
            });

            this.ambientLight.color = new THREE.Color(0x666666);

            var particleSystem = ParticleSystem({
                count: 750,
                life: 20,
                lifeRandom: 0.5,
                emitRange: 5,
                distance: 20,
                distanceRandom: 0.5,
                easing: Easing.QUAD_IN,
                sizeFrom: 10.0,
                sizeTo: 40.0,
                sizeEasing: 2,
                greenTo: 0.0,
                blueTo: 0.0,
                blueDuration: 0.5,
                alphaFrom: 0.5,
            }).addChildTo(this.gameBoard);
            this.on("enterframe", function(e) {
                if (e.app.frame % 30 === 0) {
                    particleSystem.createEmitter(60, 5)
                        .setPosition(this.fighter.x, this.fighter.y, this.fighter.z)
                        .on("enterframe", function() {
                            this.y += 5;
                        });
                    particleSystem.createEmitter(60, 5)
                        .setPosition(this.fighter.x, this.fighter.y, this.fighter.z)
                        .on("enterframe", function() {
                            this.x -= 2;
                            this.y += 4.5;
                        });
                    particleSystem.createEmitter(60, 5)
                        .setPosition(this.fighter.x, this.fighter.y, this.fighter.z)
                        .on("enterframe", function() {
                            this.x += 2;
                            this.y += 4.5;
                        });
                }
            });

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

            // var count = 100;
            // var geometry = new THREE.BufferGeometry();

            // var position = [];
            // var positionChange = [];
            // var size = [];
            // var sizeChange = [];
            // var start = [];
            // var end = [];

            // var i;
            // for (i = 0; i < count; i++) {
            //     var p = new THREE.Vector3(Math.randf(-1, 1), Math.randf(-1, 1), Math.randf(-1, 1));
            //     p.normalize().multiplyScalar(Math.randf(1, 5));
            //     position.push(p);

            //     var c = new THREE.Vector3(Math.randf(-1, 1), Math.randf(-1, 1), Math.randf(-1, 1));
            //     c.normalize().multiplyScalar(Math.randf(30, 60));
            //     positionChange[i] = c;

            //     size[i] = 50;
            //     sizeChange[i] = 0;

            //     start[i] = Math.randf(0.0, 0.5);
            //     end[i] = Math.randf(0.5, 1.0);
            // }

            // var positionAttr = new THREE.BufferAttribute(new Float32Array(count * 3), 3);
            // for (i = 0; i < position.length; i++) {
            //     positionAttr.setXYZ(i, position[i].x, position[i].y, position[i].z);
            // }
            // var positionChangeAttr = new THREE.BufferAttribute(new Float32Array(count * 3), 3);
            // for (i = 0; i < positionChange.length; i++) {
            //     positionChangeAttr.setXYZ(i, positionChange[i].x, positionChange[i].y, positionChange[i].z);
            // }

            // geometry.addAttribute("position", positionAttr);
            // geometry.addAttribute("positionChange", positionChangeAttr);
            // geometry.addAttribute("size", new THREE.BufferAttribute(new Float32Array(size), 1));
            // geometry.addAttribute("sizeChange", new THREE.BufferAttribute(new Float32Array(sizeChange), 1));
            // geometry.addAttribute("start", new THREE.BufferAttribute(new Float32Array(start), 1));
            // geometry.addAttribute("end", new THREE.BufferAttribute(new Float32Array(end), 1));

            // var image = tm.graphics.Canvas()
            //     .resize(32, 32)
            //     .setFillStyle(tm.graphics.RadialGradient(16, 16, 0, 16, 16, 12)
            //         .addColorStopList([{
            //             offset: 0.0,
            //             color: "hsl(50,100%,80%)",
            //         }, {
            //             offset: 0.5,
            //             color: "hsl(50,100%,70%)",
            //         }, {
            //             offset: 1.0,
            //             color: "hsl(0,100%,40%)",
            //         }, ])
            //         .toStyle()
            //     )
            //     .fillCircle(16, 16, 12)
            //     .element;
            // var texture = new THREE.Texture(image);
            // texture.needsUpdate = true;

            // var material = new THREE.ShaderMaterial({
            //     attributes: {
            //         position: {
            //             type: "v3",
            //             value: [],
            //         },
            //         positionChange: {
            //             type: "v3",
            //             value: [],
            //         },

            //         size: {
            //             type: "f",
            //             value: [],
            //         },
            //         sizeChange: {
            //             type: "f",
            //             value: [],
            //         },

            //         start: {
            //             type: "f",
            //             value: [],
            //         },
            //         end: {
            //             type: "f",
            //             value: [],
            //         },
            //     },
            //     uniforms: {
            //         color: {
            //             type: "c",
            //             value: new THREE.Color(0xffffff),
            //         },
            //         texture: {
            //             type: "t",
            //             value: texture,
            //         },
            //         time: {
            //             type: "f",
            //             value: 0,
            //         },
            //     },

            //     vertexShader: [
            //         // "attribute vec3 position;",
            //         "attribute vec3 positionChange;",
            //         "",
            //         "attribute float size;",
            //         "attribute float sizeChange;",
            //         "",
            //         "attribute float start;",
            //         "attribute float end;",
            //         "",
            //         "uniform float time;",
            //         "",
            //         "varying float vTime;",
            //         "varying float vT;",
            //         "",
            //         Easing,
            //         "",
            //         "void main() {",
            //         "    vTime = time;",
            //         "    float t = 1.0 / (end - start) * (time - start);",
            //         "    vT = t;",
            //         "",
            //         "    vec3 p = position + (positionChange - position) * easeOutQuad(t);",
            //         "    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);",
            //         "",
            //         "    float s = size + (sizeChange - size) * easeInOutQuad(t);",
            //         "    gl_PointSize = s * (150.0 / length(mvPosition.xyz));",
            //         "",
            //         "    gl_Position = projectionMatrix * mvPosition;",
            //         "}",
            //     ].join("\n"),
            //     fragmentShader: [
            //         "uniform vec3 color;",
            //         "uniform sampler2D texture;",
            //         "",
            //         "varying float vTime;",
            //         "varying float vT;",
            //         "",
            //         "void main() {",
            //         "    if (vT <= 0.0 || 1.0 < vT) discard;",
            //         "    if (vTime <= 0.0 || 1.0 < vTime) discard;",
            //         "",
            //         "    vec4 outColor = texture2D(texture, gl_PointCoord);",
            //         "",
            //         "    if (outColor.a < 0.5) discard;",
            //         "",
            //         "    gl_FragColor = outColor * vec4(color, 1.0);",
            //         "",
            //         "    float depth = gl_FragCoord.z / gl_FragCoord.w;",
            //         "    const vec3 fogColor = vec3(0.0);",
            //         "",
            //         "    float fogFactor = smoothstep(200.0, 600.0, depth);",
            //         "    gl_FragColor = mix(gl_FragColor, vec4(fogColor, gl_FragColor.w), fogFactor);",
            //         "}",
            //     ].join("\n"),
            //     blending: THREE.AdditiveBlending,
            //     depthTest: false,
            //     transparent: true,
            // });

            // scene.on("enterframe", function(e) {
            //     var f = e.app.frame;
            //     material.uniforms.time.value = Math.clamp((f - 160) / 300, -0.1, 1.1);
            //     console.log(material.uniforms.time.value);
            // });

            // var explosion = new THREE.PointCloud(geometry, material);
            // explosion.sortParticles = true;
            // explosion.frustumCulled = false;

            // var exp = tm.hybrid.ThreeElement(explosion);
            // exp.addChildTo(scene.gameBoard);

            // var test = tm.hybrid.Mesh("test").setScale(10).addChildTo(scene.gameBoard).on("enterframe", function(e) {
            //     if (e.app.keyboard.getKey("w")) this.y += 0.1;
            //     if (e.app.keyboard.getKey("s")) this.y -= 0.1;
            //     if (e.app.keyboard.getKey("a")) this.x -= 0.1;
            //     if (e.app.keyboard.getKey("d")) this.x += 0.1;

            //     if (e.app.keyboard.getKey("left")) this.rotationY -= 0.1;
            //     if (e.app.keyboard.getKey("right")) this.rotationY += 0.1;
            //     if (e.app.keyboard.getKey("up")) this.rotationX += 0.1;
            //     if (e.app.keyboard.getKey("down")) this.rotationX -= 0.1;
            // });
            // console.log(test);

        },
    });

    module.exports = Dev;
})();
