(function() {
    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");

    var Cloud = tm.createClass({
        superClass: tm.hybrid.Mesh,

        init: function() {
            this.superInit();

            var geometry = new THREE.Geometry();
            var plane = new THREE.PlaneGeometry(512, 512);
            var matrix = new THREE.Matrix4();
            for (var i = 0; i < 5; i++) {
                matrix.identity();
                matrix.setPosition({
                    x: 0,
                    y: 0,
                    z: i * 512,
                });
                matrix.multiply(new THREE.Matrix4().makeRotationX(Math.PI * -0.5));
                geometry.merge(plane, matrix, 0);
            }

            var fog = new THREE.Fog(0x4584b4, -100, 3000);
            var material = new THREE.ShaderMaterial({
                uniforms: {
                    "map": {
                        type: "t",
                        value: tm.hybrid.Texture("cloud"),
                    },
                    "fogColor": {
                        type: "c",
                        value: fog.color,
                    },
                    "fogNear": {
                        type: "f",
                        value: fog.near,
                    },
                    "fogFar": {
                        type: "f",
                        value: fog.far,
                    },
                },
                vertexShader: vs,
                fragmentShader: fs,
                depthWrite: true,
                depthTest: true,
                transparent: true,
            });

            this
                .setGeometry(geometry)
                .setMaterial(material);

            console.log("ok");
        },
    });

    var vs = [
        "varying vec2 vUv;",
        "",
        "void main() {",
        "    vUv = uv;",
        "    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
        "}",
    ].join("\n");

    var fs = [
        "uniform sampler2D map;",
        "uniform vec3 fogColor;",
        "uniform float fogNear;",
        "uniform float fogFar;",
        "",
        "varying vec2 vUv;",
        "",
        "void main() {",
        "    float depth = gl_FragCoord.z / gl_FragCoord.w;",
        "    float fogFactor = smoothstep(fogNear, fogFar, depth);",
        "",
        "    gl_FragColor = texture2D(map, vUv);",
        "    gl_FragColor.w *= pow(gl_FragCoord.z, 20.0);",
        "    gl_FragColor = mix(gl_FragColor, vec4(fogColor, gl_FragColor.w), fogFactor);",
        "}",
    ].join("\n");

    module.exports = Cloud;
})();
