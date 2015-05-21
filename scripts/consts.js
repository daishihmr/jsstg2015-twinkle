(function() {
    var tm = require("../libs/tmlib");

    var consts = {

        W: 360,
        H: 480,

        THREE_QUALITY: tm.isMobile ? 0.5 : 2,

        // X_MIN: -100.0,
        // X_MAX: +100.0,
        // Y_MIN: -92.0,
        // Y_MAX: +102.0,

        X_MIN: -100.0 * 100,
        X_MAX: +100.0 * 100,
        Y_MIN: -92.0 * 100,
        Y_MAX: +102.0 * 100,

        CAMERA_DEFAULT_POSITION_X: 0,
        CAMERA_DEFAULT_POSITION_Y: 0,
        CAMERA_DEFAULT_POSITION_Z: 300,

        GLOW_EFFECT_BLUR_VALUE: 0.003,
        GLOW_LEVEL_RATE: 4.0,
        BLUR_LEVEL_RATE: 0.005,

        FIGHTER_SPEED: 2.0,

        DEBUG: true,

    };

    module.exports = consts;
})();
