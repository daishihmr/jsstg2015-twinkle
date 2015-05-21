(function() {
    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");
    require("../tm/hybrid/texture");
    var consts = require("../consts");

    var countSq = 16;

    var Bullets = tm.createClass({
        superClass: tm.hybrid.ThreeElement,

        init: function() {
            var geometry = this._createGeometry();
            var material = this._createMaterial();

            this.superInit(new THREE.Mesh(geometry, material));

            this.pooledBullets = Array.range(0, countSq * countSq).map(function(index) {
                return Bullet(this, index);
            }.bind(this));
            this.waiting = Array.range(0, countSq * countSq);
            this.maxActiveIndex = -1;

            this.activeBullets = [];
        },

        update: function() {
            var geometry = this.threeObject.geometry;
            var material = this.threeObject.material;

            material.uniforms.time.value += 0.001;

            var uv = geometry.getAttribute("uv");
            var uposition = geometry.getAttribute("uposition");
            var urotation = geometry.getAttribute("urotation");
            var ubright = geometry.getAttribute("ubright");

            if (this.maxActiveIndex >= 0) {
                uv.needsUpdate = 
                    uposition.needsUpdate = 
                    urotation.needsUpdate = 
                    ubright.needsUpdate = true;

                uv.updateRange.count = (this.maxActiveIndex + 1) * 4 * 2;
                uposition.updateRange.count = (this.maxActiveIndex + 1) * 4 * 3;
                urotation.updateRange.count = (this.maxActiveIndex + 1) * 4 * 1;
                ubright.updateRange.count = (this.maxActiveIndex + 1) * 4 * 1;

                var uvArray = uv.array;
                var upositionArray = uposition.array;
                var urotationArray = urotation.array;
                var ubrightArray = ubright.array;

                for (var i = 0, len = this.activeBullets.length; i < len; i++) {
                    var bullet = this.activeBullets[i];
                    var index = bullet.index;
                    var index4 = index * 4;

                    var u = bullet.frame;
                    var v = bullet.type;
                    var umin = u * 1 / 8;
                    var umax = (u + 1) * 1 / 8;
                    var vmin = v * 1 / 8;
                    var vmax = (v + 1) * 1 / 8;

                    uvArray[(index4 + 0) * 2 + 0] = umin;
                    uvArray[(index4 + 0) * 2 + 1] = 1 - vmin;
                    uvArray[(index4 + 1) * 2 + 0] = umax;
                    uvArray[(index4 + 1) * 2 + 1] = 1 - vmin;
                    uvArray[(index4 + 2) * 2 + 0] = umax;
                    uvArray[(index4 + 2) * 2 + 1] = 1 - vmax;
                    uvArray[(index4 + 3) * 2 + 0] = umin;
                    uvArray[(index4 + 3) * 2 + 1] = 1 - vmax;

                    upositionArray[(index4 + 0) * 3 + 0] =
                        upositionArray[(index4 + 1) * 3 + 0] =
                        upositionArray[(index4 + 2) * 3 + 0] =
                        upositionArray[(index4 + 3) * 3 + 0] = bullet.x;
                    upositionArray[(index4 + 0) * 3 + 1] =
                        upositionArray[(index4 + 1) * 3 + 1] =
                        upositionArray[(index4 + 2) * 3 + 1] =
                        upositionArray[(index4 + 3) * 3 + 1] = bullet.y;

                    urotationArray[index4 + 0] =
                        urotationArray[index4 + 1] =
                        urotationArray[index4 + 2] =
                        urotationArray[index4 + 3] = bullet.rotation;

                    ubrightArray[index4 + 0] =
                        ubrightArray[index4 + 1] =
                        ubrightArray[index4 + 2] =
                        ubrightArray[index4 + 3] = bullet.bright;
                };
            }
        },

        get: function() {
            var pool = this.pooledBullets;
            var bullet = pool[this.waiting.shift()];
            if (bullet !== undefined) {
                var index = bullet.index;
                var uvisible = this.threeObject.geometry.getAttribute("uvisible");
                uvisible.needsUpdate = true;
                uvisible.array[index * 4 + 0] =
                    uvisible.array[index * 4 + 1] =
                    uvisible.array[index * 4 + 2] =
                    uvisible.array[index * 4 + 3] = 1;

                this.activeBullets.push(bullet);

                this.maxActiveIndex = Math.max(index, this.maxActiveIndex);

                return bullet;
            }

            return null;
        },

        dispose: function(bullet) {
            var index = bullet.index;
            this.waiting.unshift(index);

            this.activeBullets.erase(bullet);

            var uvisible = this.threeObject.geometry.getAttribute("uvisible");
            uvisible.needsUpdate = true;
            uvisible.array[index * 4 + 0] =
                uvisible.array[index * 4 + 1] =
                uvisible.array[index * 4 + 2] =
                uvisible.array[index * 4 + 3] = 0;

            if (this.waiting.length === countSq * countSq) {
                this.waiting.sort();
                this.maxActiveIndex = -1;
            }
            this.waiting.sort();
        },

        _createGeometry: function() {
            var geometry = new THREE.BufferGeometry();

            var vertices = [];
            var indices = [];
            var uvs = [];
            var upos = [];
            var urot = [];
            var ubright = [];
            var uvisible = [];
            for (var x = 0; x < countSq; x++) {
                for (var y = 0; y < countSq; y++) {
                    var i = y * countSq + x;

                    vertices.push([x * 1.1 + 0.05, y * 1.1 + 0.05, 0]);
                    vertices.push([x * 1.1 + 1.05, y * 1.1 + 0.05, 0]);
                    vertices.push([x * 1.1 + 1.05, y * 1.1 + 1.05, 0]);
                    vertices.push([x * 1.1 + 0.05, y * 1.1 + 1.05, 0]);

                    indices.push([i * 4 + 0, i * 4 + 1, i * 4 + 2]);
                    indices.push([i * 4 + 0, i * 4 + 2, i * 4 + 3]);

                    uvs.push([0, 0]);
                    uvs.push([1, 0]);
                    uvs.push([1, 1]);
                    uvs.push([0, 1]);

                    upos.push([0, 0, 0]);
                    upos.push([0, 0, 0]);
                    upos.push([0, 0, 0]);
                    upos.push([0, 0, 0]);

                    urot.push(0);
                    urot.push(0);
                    urot.push(0);
                    urot.push(0);

                    ubright.push(1);
                    ubright.push(1);
                    ubright.push(1);
                    ubright.push(1);

                    uvisible.push(0);
                    uvisible.push(0);
                    uvisible.push(0);
                    uvisible.push(0);
                }
            }

            geometry.addAttribute("position", new THREE.DynamicBufferAttribute(new Float32Array(vertices.flatten()), 3));
            geometry.addAttribute("index", new THREE.DynamicBufferAttribute(new Uint32Array(indices.flatten()), 3));
            geometry.addAttribute("uv", new THREE.DynamicBufferAttribute(new Float32Array(uvs.flatten()), 2));
            geometry.addAttribute("uposition", new THREE.DynamicBufferAttribute(new Float32Array(upos.flatten()), 3));
            geometry.addAttribute("urotation", new THREE.DynamicBufferAttribute(new Float32Array(urot), 1));
            geometry.addAttribute("ubright", new THREE.DynamicBufferAttribute(new Float32Array(ubright), 1));
            geometry.addAttribute("uvisible", new THREE.BufferAttribute(new Float32Array(uvisible), 1));

            return geometry;
        },

        _createMaterial: function() {
            var material = new THREE.ShaderMaterial({
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                side: THREE.DoubleSide,
                transparent: true,
                depthTest: false,
                blending: THREE.AdditiveBlending,
                attributes: {
                    "uposition": {
                        type: "v3",
                        value: null,
                    },
                    "urotation": {
                        type: "f",
                        value: null,
                    },
                    "ubright": {
                        type: "f",
                        value: null,
                    },
                    "uvisible": {
                        type: "f",
                        value: null,
                    },
                },
                uniforms: {
                    "time": {
                        type: "f",
                        value: 0,
                    },
                    "texture": {
                        type: "t",
                        value: tm.hybrid.Texture("bullets"),
                    },
                },
            });

            return material;
        },
    });

    var vertexShader = [

        "attribute vec3 uposition;",
        "attribute float urotation;",
        "attribute float ubright;",
        "attribute float uvisible;",

        "uniform float time;",

        "varying vec2 vUv;",
        "varying float vBright;",
        "varying float vVisible;",

        "void main() {",
        "    vUv = uv;",
        "    vBright = ubright;",
        "    vVisible = uvisible;",

        "    if (vVisible == 0.0) {",
        "        gl_Position = vec4(0.0, 0.0, 0.0, 0.0);",
        "        return;",
        "    }",

        "    float idx = floor(position.y / 1.1) * " + countSq + ".0 + floor(position.x / 1.1);",
        "    vec3 leftBottom = vec3(floor(position.x / 1.1) * 1.1, floor(position.y / 1.1) * 1.1, 0.0);",
        "    vec3 mid = leftBottom + vec3(0.55, 0.55, 0.0);",
        "    vec3 pos = position - mid;",

        "    mat4 m = ",
        "    mat4(",
        "        1.0, 0.0, 0.0, 0.0,",
        "        0.0, 1.0, 0.0, 0.0,",
        "        0.0, 0.0, 1.0, 0.0,",
        "        uposition.x, uposition.y, uposition.z, 1.0",
        "    )",
        "    *",
        "    mat4(",
        "        cos(urotation), sin(urotation), 0.0, 0.0,",
        "       -sin(urotation), cos(urotation), 0.0, 0.0,",
        "        0.0, 0.0, 1.0, 0.0,",
        "        0.0, 0.0, 0.0, 1.0",
        "    )",
        "    *",
        "    mat4(",
        "       30.0, 0.0, 0.0, 0.0,",
        "        0.0,30.0, 0.0, 0.0,",
        "        0.0, 0.0,30.0, 0.0,",
        "        0.0, 0.0, 0.0, 1.0",
        "    );",

        "    vec4 p = m * vec4(pos, 1.0);",
        "    gl_Position = projectionMatrix * modelViewMatrix * p;",

        "}",

    ].join("\n");

    var fragmentShader = [
        "uniform sampler2D texture;",

        "varying vec2 vUv;",
        "varying float vBright;",
        "varying float vVisible;",

        "void main() {",
        "    if (vVisible == 0.0) {",
        "        discard;",
        "    }",

        "    vec4 color = texture2D(texture, vUv);",
        "    gl_FragColor = vec4(color.rgb * vBright, color.a);",

        "}",

    ].join("\n");

    var Bullet = tm.createClass({
        superClass: tm.app.Element,

        init: function(bullets, index) {
            this.superInit();

            this.bullets = bullets;
            this.index = index;

            this.runner = null;

            this.x = 0;
            this.y = 0;
            this.rotation = 0;

            // 明るさ
            this.bright = 1;

            // 弾種
            this.type = 0;

            // アニメーションフレーム
            this.frame = 0;
        },

        onremoved: function() {
            this.bullets.dispose(this);
        },

        update: function(app) {},

    });

    module.exports = Bullets;
})();
