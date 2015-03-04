var AddBlendShader = {

    uniforms: {

        "tDiffuse1": { type: "t", value: null },
        "tDiffuse2": { type: "t", value: null },
        "level1": { type: "f", value: 0.5 },
        "level2": { type: "f", value: 0.5 },

    },

    vertexShader: [

        "varying vec2 vUv;",

        "void main() {",

            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

        "}"

    ].join("\n"),

    fragmentShader: [

        "uniform float level1;",
        "uniform float level2;",

        "uniform sampler2D tDiffuse1;",
        "uniform sampler2D tDiffuse2;",

        "varying vec2 vUv;",

        "void main() {",

            "vec4 texel1 = texture2D( tDiffuse1, vUv );",
            "vec4 texel2 = texture2D( tDiffuse2, vUv );",
            "gl_FragColor = texel1 * level1 + texel2 * level1;",

        "}"

    ].join("\n")

};

module.exports = AddBlendShader;
