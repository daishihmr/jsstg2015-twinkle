(function() {

    var BrightShader = {

        uniforms: {

            "tDiffuseBase": {
                type: "t",
                value: null
            },
            "tDiffuseBright": {
                type: "t",
                value: null
            },
            "blueLevel": {
                type: "f",
                value: 1.0 / 512.0
            }

        },

        vertexShader: [

            "varying vec2 vUv;",

            "void main() {",

            "    vUv = uv;",
            "    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

            "}"

        ].join("\n"),

        fragmentShader: [

            "uniform sampler2D tDiffuseBase;",
            "uniform sampler2D tDiffuseBright;",
            "uniform float blueLevel;",

            "varying vec2 vUv;",

            "void main() {",

            "    vec4 sum = vec4( 0.0 );",

            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 4.0 * blueLevel, vUv.y - 4.0 * blueLevel ) ) * 0.05100 * 0.05100;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 3.0 * blueLevel, vUv.y - 4.0 * blueLevel ) ) * 0.09180 * 0.05100;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 2.0 * blueLevel, vUv.y - 4.0 * blueLevel ) ) * 0.12245 * 0.05100;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 1.0 * blueLevel, vUv.y - 4.0 * blueLevel ) ) * 0.15310 * 0.05100;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 0.0 * blueLevel, vUv.y - 4.0 * blueLevel ) ) * 0.16330 * 0.05100;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 1.0 * blueLevel, vUv.y - 4.0 * blueLevel ) ) * 0.15310 * 0.05100;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 2.0 * blueLevel, vUv.y - 4.0 * blueLevel ) ) * 0.12245 * 0.05100;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 3.0 * blueLevel, vUv.y - 4.0 * blueLevel ) ) * 0.09180 * 0.05100;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 4.0 * blueLevel, vUv.y - 4.0 * blueLevel ) ) * 0.05100 * 0.05100;",

            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 4.0 * blueLevel, vUv.y - 3.0 * blueLevel ) ) * 0.05100 * 0.09180;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 3.0 * blueLevel, vUv.y - 3.0 * blueLevel ) ) * 0.09180 * 0.09180;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 2.0 * blueLevel, vUv.y - 3.0 * blueLevel ) ) * 0.12245 * 0.09180;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 1.0 * blueLevel, vUv.y - 3.0 * blueLevel ) ) * 0.15310 * 0.09180;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 0.0 * blueLevel, vUv.y - 3.0 * blueLevel ) ) * 0.16330 * 0.09180;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 1.0 * blueLevel, vUv.y - 3.0 * blueLevel ) ) * 0.15310 * 0.09180;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 2.0 * blueLevel, vUv.y - 3.0 * blueLevel ) ) * 0.12245 * 0.09180;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 3.0 * blueLevel, vUv.y - 3.0 * blueLevel ) ) * 0.09180 * 0.09180;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 4.0 * blueLevel, vUv.y - 3.0 * blueLevel ) ) * 0.05100 * 0.09180;",

            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 4.0 * blueLevel, vUv.y - 2.0 * blueLevel ) ) * 0.05100 * 0.12245;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 3.0 * blueLevel, vUv.y - 2.0 * blueLevel ) ) * 0.09180 * 0.12245;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 2.0 * blueLevel, vUv.y - 2.0 * blueLevel ) ) * 0.12245 * 0.12245;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 1.0 * blueLevel, vUv.y - 2.0 * blueLevel ) ) * 0.15310 * 0.12245;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 0.0 * blueLevel, vUv.y - 2.0 * blueLevel ) ) * 0.16330 * 0.12245;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 1.0 * blueLevel, vUv.y - 2.0 * blueLevel ) ) * 0.15310 * 0.12245;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 2.0 * blueLevel, vUv.y - 2.0 * blueLevel ) ) * 0.12245 * 0.12245;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 3.0 * blueLevel, vUv.y - 2.0 * blueLevel ) ) * 0.09180 * 0.12245;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 4.0 * blueLevel, vUv.y - 2.0 * blueLevel ) ) * 0.05100 * 0.12245;",

            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 4.0 * blueLevel, vUv.y - 1.0 * blueLevel ) ) * 0.05100 * 0.15310;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 3.0 * blueLevel, vUv.y - 1.0 * blueLevel ) ) * 0.09180 * 0.15310;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 2.0 * blueLevel, vUv.y - 1.0 * blueLevel ) ) * 0.12245 * 0.15310;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 1.0 * blueLevel, vUv.y - 1.0 * blueLevel ) ) * 0.15310 * 0.15310;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 0.0 * blueLevel, vUv.y - 1.0 * blueLevel ) ) * 0.16330 * 0.15310;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 1.0 * blueLevel, vUv.y - 1.0 * blueLevel ) ) * 0.15310 * 0.15310;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 2.0 * blueLevel, vUv.y - 1.0 * blueLevel ) ) * 0.12245 * 0.15310;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 3.0 * blueLevel, vUv.y - 1.0 * blueLevel ) ) * 0.09180 * 0.15310;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 4.0 * blueLevel, vUv.y - 1.0 * blueLevel ) ) * 0.05100 * 0.15310;",

            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 4.0 * blueLevel, vUv.y + 0.0 * blueLevel ) ) * 0.05100 * 0.16330;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 3.0 * blueLevel, vUv.y + 0.0 * blueLevel ) ) * 0.09180 * 0.16330;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 2.0 * blueLevel, vUv.y + 0.0 * blueLevel ) ) * 0.12245 * 0.16330;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 1.0 * blueLevel, vUv.y + 0.0 * blueLevel ) ) * 0.15310 * 0.16330;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 0.0 * blueLevel, vUv.y + 0.0 * blueLevel ) ) * 0.16330 * 0.16330;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 1.0 * blueLevel, vUv.y + 0.0 * blueLevel ) ) * 0.15310 * 0.16330;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 2.0 * blueLevel, vUv.y + 0.0 * blueLevel ) ) * 0.12245 * 0.16330;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 3.0 * blueLevel, vUv.y + 0.0 * blueLevel ) ) * 0.09180 * 0.16330;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 4.0 * blueLevel, vUv.y + 0.0 * blueLevel ) ) * 0.05100 * 0.16330;",

            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 4.0 * blueLevel, vUv.y + 1.0 * blueLevel ) ) * 0.05100 * 0.15310;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 3.0 * blueLevel, vUv.y + 1.0 * blueLevel ) ) * 0.09180 * 0.15310;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 2.0 * blueLevel, vUv.y + 1.0 * blueLevel ) ) * 0.12245 * 0.15310;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 1.0 * blueLevel, vUv.y + 1.0 * blueLevel ) ) * 0.15310 * 0.15310;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 0.0 * blueLevel, vUv.y + 1.0 * blueLevel ) ) * 0.16330 * 0.15310;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 1.0 * blueLevel, vUv.y + 1.0 * blueLevel ) ) * 0.15310 * 0.15310;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 2.0 * blueLevel, vUv.y + 1.0 * blueLevel ) ) * 0.12245 * 0.15310;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 3.0 * blueLevel, vUv.y + 1.0 * blueLevel ) ) * 0.09180 * 0.15310;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 4.0 * blueLevel, vUv.y + 1.0 * blueLevel ) ) * 0.05100 * 0.15310;",

            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 4.0 * blueLevel, vUv.y + 2.0 * blueLevel ) ) * 0.05100 * 0.12245;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 3.0 * blueLevel, vUv.y + 2.0 * blueLevel ) ) * 0.09180 * 0.12245;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 2.0 * blueLevel, vUv.y + 2.0 * blueLevel ) ) * 0.12245 * 0.12245;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 1.0 * blueLevel, vUv.y + 2.0 * blueLevel ) ) * 0.15310 * 0.12245;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 0.0 * blueLevel, vUv.y + 2.0 * blueLevel ) ) * 0.16330 * 0.12245;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 1.0 * blueLevel, vUv.y + 2.0 * blueLevel ) ) * 0.15310 * 0.12245;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 2.0 * blueLevel, vUv.y + 2.0 * blueLevel ) ) * 0.12245 * 0.12245;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 3.0 * blueLevel, vUv.y + 2.0 * blueLevel ) ) * 0.09180 * 0.12245;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 4.0 * blueLevel, vUv.y + 2.0 * blueLevel ) ) * 0.05100 * 0.12245;",

            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 4.0 * blueLevel, vUv.y + 3.0 * blueLevel ) ) * 0.05100 * 0.09180;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 3.0 * blueLevel, vUv.y + 3.0 * blueLevel ) ) * 0.09180 * 0.09180;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 2.0 * blueLevel, vUv.y + 3.0 * blueLevel ) ) * 0.12245 * 0.09180;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 1.0 * blueLevel, vUv.y + 3.0 * blueLevel ) ) * 0.15310 * 0.09180;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 0.0 * blueLevel, vUv.y + 3.0 * blueLevel ) ) * 0.16330 * 0.09180;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 1.0 * blueLevel, vUv.y + 3.0 * blueLevel ) ) * 0.15310 * 0.09180;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 2.0 * blueLevel, vUv.y + 3.0 * blueLevel ) ) * 0.12245 * 0.09180;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 3.0 * blueLevel, vUv.y + 3.0 * blueLevel ) ) * 0.09180 * 0.09180;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 4.0 * blueLevel, vUv.y + 3.0 * blueLevel ) ) * 0.05100 * 0.09180;",

            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 4.0 * blueLevel, vUv.y + 4.0 * blueLevel ) ) * 0.05100 * 0.05100;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 3.0 * blueLevel, vUv.y + 4.0 * blueLevel ) ) * 0.09180 * 0.05100;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 2.0 * blueLevel, vUv.y + 4.0 * blueLevel ) ) * 0.12245 * 0.05100;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x - 1.0 * blueLevel, vUv.y + 4.0 * blueLevel ) ) * 0.15310 * 0.05100;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 0.0 * blueLevel, vUv.y + 4.0 * blueLevel ) ) * 0.16330 * 0.05100;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 1.0 * blueLevel, vUv.y + 4.0 * blueLevel ) ) * 0.15310 * 0.05100;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 2.0 * blueLevel, vUv.y + 4.0 * blueLevel ) ) * 0.12245 * 0.05100;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 3.0 * blueLevel, vUv.y + 4.0 * blueLevel ) ) * 0.09180 * 0.05100;",
            "    sum += texture2D( tDiffuseBright, vec2( vUv.x + 4.0 * blueLevel, vUv.y + 4.0 * blueLevel ) ) * 0.05100 * 0.05100;",

            "    gl_FragColor = texture2D(tDiffuseBase, vUv) + sum * 3.0;",

            "}"

        ].join("\n")

    };

    module.exports = BrightShader;
})();
