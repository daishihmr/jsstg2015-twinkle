var tm = require("../../../libs/tmlib");

(function() {

    tm.define("tm.input.Gamepad", {

        init: function(gamepadIndex) {
            this.gamepadIndex = gamepadIndex || 0;

            this.keys = {};

            this.press = {};
            this.down = {};
            this.up = {};
            this.last = {};

            this.axes = null;

            this.getGamepads = null;
            if (window.navigator.getGamepads) {
                this.getGamepads = function() {
                    return window.navigator.getGamepads();
                }
            } else if (window.navigator.webkitGetGamepads) {
                this.getGamepads = function() {
                    return window.navigator.webkitGetGamepads();
                }
            } else if (window.navigator.mozGetGamepads) {
                this.getGamepads = function() {
                    return window.navigator.mozGetGamepads();
                }
            }

            if (this.getGamepads && this.getGamepads()) {
                this.enabled = true;
            } else {
                console.warn("ゲームパッド未対応");
                this.enabled = false;
            }
        },

        _update: function() {
            if (!this.enabled) return this;

            var i, il;

            var gamepads = this.getGamepads();
            var gamepad = gamepads[this.gamepadIndex];
            if (!gamepad || !gamepad.connected) {
                this.enabled = false;
                return;
            }

            var buttons = gamepad.buttons;
            for (i = 0, il = buttons.length; i < il; i++) {
                this.keys[i] = buttons[i].pressed;

                this.last[i] = this.press[i];
                this.press[i] = this.key[i];

                this.down[i] = (this.press[i] ^ this.last[i]) & this.press[i];
                this.up[i] = (this.press[i] ^ this.last[i]) & this.last[i];
            }

            if (gamepad.axes) {
                this.axes = gamepad.axes.clone();
            } else {
                this.axes = null;
            }

            return this;
        },

        getKey: function(key) {
            if (typeof(key) == "string") {
                key = tm.input.Gamepad.KEY_CODE[key];
            }
            return this.press[key] === true;
        },

        getKeyDown: function(key) {
            if (typeof(key) == "string") {
                key = tm.input.Gamepad.KEY_CODE[key];
            }
            return this.down[key] === true;
        },

        getKeyUp: function(key) {
            if (typeof(key) == "string") {
                key = tm.input.Gamepad.KEY_CODE[key];
            }
            return this.up[key] === true;
        },

        getKeyAngle: function() {
            if (!this.enabled) {

                return null;

            } else if (this.axes) {

                return Math.atan2(this.axes[1], this.axes[0]) * Math.RAD_TO_DEG;

            } else {
                var angle = null;
                var arrowBit =
                    (this.getKey("left") << 3) |
                    (this.getKey("up") << 2) |
                    (this.getKey("right") << 1) |
                    (this.getKey("down"));

                if (arrowBit !== 0 && ARROW_BIT_TO_ANGLE_TABLE.hasOwnProperty(arrowBit)) {
                    angle = ARROW_BIT_TO_ANGLE_TABLE[arrowBit];
                }

                return angle;
            }
        },

        getKeyDirection: function() {
            if (!this.enabled) {

                return 0;

            } else if (this.axes) {

                return tm.geom.Vector2(this.axes[0], this.axes[1]);

            } else {
                var direction = tm.geom.Vector2(0, 0);

                if (this.getKey("left")) {
                    direction.x = -1;
                } else if (this.getKey("right")) {
                    direction.x = 1;
                }
                if (this.getKey("up")) {
                    direction.y = -1;
                } else if (this.getKey("down")) {
                    direction.y = 1;
                }

                if (direction.x && direction.y) {
                    direction.div(Math.SQRT2);
                }

                return direction;
            }
        },

    });

    var ARROW_BIT_TO_ANGLE_TABLE = {
        /* @property 下 */
        0x01: 270,
        /* @property 右 */
        0x02: 0,
        /* @property 上 */
        0x04: 90,
        /* @property 左 */
        0x08: 180,

        /* @property 右上 */
        0x06: 45,
        /* @property 右下 */
        0x03: 315,
        /* @property 左上 */
        0x0c: 135,
        /* @property 左下 */
        0x09: 225,

        // 三方向同時押し対応
        // 想定外の操作だが対応しといたほうが無難
        /* @property 右上左 */
        0x0e: 90,
        /* @property 上左下 */
        0x0d: 180,
        /* @property 左下右 */
        0x0b: 270,
        /* @property 下右上 */
        0x07: 0,
    };

    tm.input.Gamepad.KEY_CODE = {
        "up": 12,
        "left": 14,
        "right": 15,
        "down": 13,
        "a": 0,
        "b": 1,
        "x": 2,
        "y": 3,
        "l1": 4,
        "l2": 6,
        "l3": 10,
        "r1": 5,
        "r2": 7,
        "r3": 11,
        "start": 9,
        "select": 8,
    };

})();
