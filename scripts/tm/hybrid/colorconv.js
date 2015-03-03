var tm = require("../../../libs/tmlib");
var THREE = require("../../../libs/three");

var colorConv = {
    hsl: function(h, s, l) {
        if (arguments.length === 1 && typeof(arguments[0]) === "string") {
            var m = arguments[0].split(" ").join("").match(/hsl\((\d+),(\d+)%,(\d+)%\)/);
            if (m) {
                h = m[1];
                s = m[2];
                l = m[3];
            } else {
                throw new Error("invalid argument " + arguments[0]);
            }
        }
        return new THREE.Color().setHSL(h / 360, s / 100, l / 100).getHex();
    },
};

module.exports = colorConv;
