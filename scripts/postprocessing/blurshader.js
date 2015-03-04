var BlurShader = {

    uniforms: {

        "tDiffuseBase": { type: "t", value: null },
        "tDiffuseBlur": { type: "t", value: null },
        "f":        { type: "f", value: 1.0 / 512.0 }

    },

    vertexShader: [

        "varying vec2 vUv;",

        "void main() {",

            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

        "}"

    ].join("\n"),

    fragmentShader: [

        "uniform sampler2D tDiffuseBase;",
        "uniform sampler2D tDiffuseBlur;",
        "uniform float f;",

        "varying vec2 vUv;",

        "void main() {",

            "vec4 sum = vec4( 0.0 );",

            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 4.0 * f, vUv.y - 4.0 * f ) ) * 0.05100 * 0.05100;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 3.0 * f, vUv.y - 4.0 * f ) ) * 0.09180 * 0.05100;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 2.0 * f, vUv.y - 4.0 * f ) ) * 0.12245 * 0.05100;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 1.0 * f, vUv.y - 4.0 * f ) ) * 0.15310 * 0.05100;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 0.0 * f, vUv.y - 4.0 * f ) ) * 0.16330 * 0.05100;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 1.0 * f, vUv.y - 4.0 * f ) ) * 0.15310 * 0.05100;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 2.0 * f, vUv.y - 4.0 * f ) ) * 0.12245 * 0.05100;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 3.0 * f, vUv.y - 4.0 * f ) ) * 0.09180 * 0.05100;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 4.0 * f, vUv.y - 4.0 * f ) ) * 0.05100 * 0.05100;",

            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 4.0 * f, vUv.y - 3.0 * f ) ) * 0.05100 * 0.09180;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 3.0 * f, vUv.y - 3.0 * f ) ) * 0.09180 * 0.09180;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 2.0 * f, vUv.y - 3.0 * f ) ) * 0.12245 * 0.09180;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 1.0 * f, vUv.y - 3.0 * f ) ) * 0.15310 * 0.09180;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 0.0 * f, vUv.y - 3.0 * f ) ) * 0.16330 * 0.09180;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 1.0 * f, vUv.y - 3.0 * f ) ) * 0.15310 * 0.09180;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 2.0 * f, vUv.y - 3.0 * f ) ) * 0.12245 * 0.09180;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 3.0 * f, vUv.y - 3.0 * f ) ) * 0.09180 * 0.09180;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 4.0 * f, vUv.y - 3.0 * f ) ) * 0.05100 * 0.09180;",

            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 4.0 * f, vUv.y - 2.0 * f ) ) * 0.05100 * 0.12245;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 3.0 * f, vUv.y - 2.0 * f ) ) * 0.09180 * 0.12245;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 2.0 * f, vUv.y - 2.0 * f ) ) * 0.12245 * 0.12245;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 1.0 * f, vUv.y - 2.0 * f ) ) * 0.15310 * 0.12245;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 0.0 * f, vUv.y - 2.0 * f ) ) * 0.16330 * 0.12245;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 1.0 * f, vUv.y - 2.0 * f ) ) * 0.15310 * 0.12245;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 2.0 * f, vUv.y - 2.0 * f ) ) * 0.12245 * 0.12245;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 3.0 * f, vUv.y - 2.0 * f ) ) * 0.09180 * 0.12245;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 4.0 * f, vUv.y - 2.0 * f ) ) * 0.05100 * 0.12245;",

            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 4.0 * f, vUv.y - 1.0 * f ) ) * 0.05100 * 0.15310;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 3.0 * f, vUv.y - 1.0 * f ) ) * 0.09180 * 0.15310;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 2.0 * f, vUv.y - 1.0 * f ) ) * 0.12245 * 0.15310;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 1.0 * f, vUv.y - 1.0 * f ) ) * 0.15310 * 0.15310;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 0.0 * f, vUv.y - 1.0 * f ) ) * 0.16330 * 0.15310;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 1.0 * f, vUv.y - 1.0 * f ) ) * 0.15310 * 0.15310;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 2.0 * f, vUv.y - 1.0 * f ) ) * 0.12245 * 0.15310;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 3.0 * f, vUv.y - 1.0 * f ) ) * 0.09180 * 0.15310;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 4.0 * f, vUv.y - 1.0 * f ) ) * 0.05100 * 0.15310;",

            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 4.0 * f, vUv.y + 0.0 * f ) ) * 0.05100 * 0.16330;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 3.0 * f, vUv.y + 0.0 * f ) ) * 0.09180 * 0.16330;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 2.0 * f, vUv.y + 0.0 * f ) ) * 0.12245 * 0.16330;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 1.0 * f, vUv.y + 0.0 * f ) ) * 0.15310 * 0.16330;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 0.0 * f, vUv.y + 0.0 * f ) ) * 0.16330 * 0.16330;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 1.0 * f, vUv.y + 0.0 * f ) ) * 0.15310 * 0.16330;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 2.0 * f, vUv.y + 0.0 * f ) ) * 0.12245 * 0.16330;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 3.0 * f, vUv.y + 0.0 * f ) ) * 0.09180 * 0.16330;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 4.0 * f, vUv.y + 0.0 * f ) ) * 0.05100 * 0.16330;",

            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 4.0 * f, vUv.y + 1.0 * f ) ) * 0.05100 * 0.15310;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 3.0 * f, vUv.y + 1.0 * f ) ) * 0.09180 * 0.15310;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 2.0 * f, vUv.y + 1.0 * f ) ) * 0.12245 * 0.15310;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 1.0 * f, vUv.y + 1.0 * f ) ) * 0.15310 * 0.15310;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 0.0 * f, vUv.y + 1.0 * f ) ) * 0.16330 * 0.15310;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 1.0 * f, vUv.y + 1.0 * f ) ) * 0.15310 * 0.15310;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 2.0 * f, vUv.y + 1.0 * f ) ) * 0.12245 * 0.15310;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 3.0 * f, vUv.y + 1.0 * f ) ) * 0.09180 * 0.15310;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 4.0 * f, vUv.y + 1.0 * f ) ) * 0.05100 * 0.15310;",

            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 4.0 * f, vUv.y + 2.0 * f ) ) * 0.05100 * 0.12245;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 3.0 * f, vUv.y + 2.0 * f ) ) * 0.09180 * 0.12245;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 2.0 * f, vUv.y + 2.0 * f ) ) * 0.12245 * 0.12245;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 1.0 * f, vUv.y + 2.0 * f ) ) * 0.15310 * 0.12245;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 0.0 * f, vUv.y + 2.0 * f ) ) * 0.16330 * 0.12245;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 1.0 * f, vUv.y + 2.0 * f ) ) * 0.15310 * 0.12245;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 2.0 * f, vUv.y + 2.0 * f ) ) * 0.12245 * 0.12245;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 3.0 * f, vUv.y + 2.0 * f ) ) * 0.09180 * 0.12245;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 4.0 * f, vUv.y + 2.0 * f ) ) * 0.05100 * 0.12245;",

            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 4.0 * f, vUv.y + 3.0 * f ) ) * 0.05100 * 0.09180;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 3.0 * f, vUv.y + 3.0 * f ) ) * 0.09180 * 0.09180;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 2.0 * f, vUv.y + 3.0 * f ) ) * 0.12245 * 0.09180;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 1.0 * f, vUv.y + 3.0 * f ) ) * 0.15310 * 0.09180;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 0.0 * f, vUv.y + 3.0 * f ) ) * 0.16330 * 0.09180;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 1.0 * f, vUv.y + 3.0 * f ) ) * 0.15310 * 0.09180;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 2.0 * f, vUv.y + 3.0 * f ) ) * 0.12245 * 0.09180;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 3.0 * f, vUv.y + 3.0 * f ) ) * 0.09180 * 0.09180;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 4.0 * f, vUv.y + 3.0 * f ) ) * 0.05100 * 0.09180;",

            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 4.0 * f, vUv.y + 4.0 * f ) ) * 0.05100 * 0.05100;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 3.0 * f, vUv.y + 4.0 * f ) ) * 0.09180 * 0.05100;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 2.0 * f, vUv.y + 4.0 * f ) ) * 0.12245 * 0.05100;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x - 1.0 * f, vUv.y + 4.0 * f ) ) * 0.15310 * 0.05100;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 0.0 * f, vUv.y + 4.0 * f ) ) * 0.16330 * 0.05100;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 1.0 * f, vUv.y + 4.0 * f ) ) * 0.15310 * 0.05100;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 2.0 * f, vUv.y + 4.0 * f ) ) * 0.12245 * 0.05100;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 3.0 * f, vUv.y + 4.0 * f ) ) * 0.09180 * 0.05100;",
            "sum += texture2D( tDiffuseBlur, vec2( vUv.x + 4.0 * f, vUv.y + 4.0 * f ) ) * 0.05100 * 0.05100;",

            "gl_FragColor = texture2D(tDiffuseBase, vUv) + sum * 3.0;",

        "}"

    ].join("\n")

};

module.exports = BlurShader;
