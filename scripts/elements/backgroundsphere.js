(function() {
    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");

    var BackgroundSphere = tm.createClass({
        superClass: tm.hybrid.Mesh,

        init: function(texture) {
            this.superInit();

            var material = new THREE.ShaderMaterial({
                uniforms: {
                    "map": {
                        type: "t",
                        value: tm.hybrid.Texture(texture),
                    },
                },
                vertexShader: vs,
                fragmentShader: fs,
                side: THREE.BackSide,
            });

            this
                .setGeometry(new THREE.SphereGeometry(800, 32, 32))
                .setMaterial(material);
        }
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
        "",
        "varying vec2 vUv;",
        "",
        "void main() {",
        "    gl_FragColor = texture2D(map, vUv);",
        "}",
    ].join("\n");

    module.exports = BackgroundSphere;
})();
