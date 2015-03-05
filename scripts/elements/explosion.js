(function() {
    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");

    module.exports = {
        material: null,
        getMaterial: function() {
            if (!this.material) {
                material = new THREE.ShaderMaterial(ExplosionShader);
            }
            return material;
        },

        create: function() {
            var result = new THREE.Object3D();
            return result;
        },
    };

    var ExplosionShader = {

        attributes: null,

        uniforms: THREE.UniformsUtils.merge([

            {
                size: {
                    type: "f",
                    value: 10
                },
                scale: {
                    type: "f",
                    value: 1
                },
            },

            THREE.UniformsLib["particle"],
            THREE.UniformsLib["shadowmap"]

        ]),

        vertexShader: [

            "uniform float size;",
            "uniform float scale;",

            THREE.ShaderChunk["color_pars_vertex"],
            THREE.ShaderChunk["shadowmap_pars_vertex"],
            THREE.ShaderChunk["logdepthbuf_pars_vertex"],

            "void main() {",

            THREE.ShaderChunk["color_vertex"],

            "   vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",

            "   #ifdef USE_SIZEATTENUATION",
            "       gl_PointSize = size * ( scale / length( mvPosition.xyz ) );",
            "   #else",
            "       gl_PointSize = size;",
            "   #endif",

            "   gl_Position = projectionMatrix * mvPosition;",

            THREE.ShaderChunk["logdepthbuf_vertex"],
            THREE.ShaderChunk["worldpos_vertex"],
            THREE.ShaderChunk["shadowmap_vertex"],

            "}"

        ].join("\n"),

        fragmentShader: [

            "uniform vec3 psColor;",
            "uniform float opacity;",

            THREE.ShaderChunk["color_pars_fragment"],
            THREE.ShaderChunk["map_particle_pars_fragment"],
            THREE.ShaderChunk["fog_pars_fragment"],
            THREE.ShaderChunk["shadowmap_pars_fragment"],
            THREE.ShaderChunk["logdepthbuf_pars_fragment"],

            "void main() {",

            "   gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);",

            THREE.ShaderChunk["logdepthbuf_fragment"],
            THREE.ShaderChunk["map_particle_fragment"],
            THREE.ShaderChunk["alphatest_fragment"],
            THREE.ShaderChunk["color_fragment"],
            THREE.ShaderChunk["shadowmap_fragment"],
            THREE.ShaderChunk["fog_fragment"],

            "}"

        ].join("\n"),

    };
})();
