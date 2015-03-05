(function() {
    var consts = require("./consts");
    var utils = {};

    utils.isInScreen = function(position) {
        return consts.X_MIN * 1.1 <= position.x && position.x < consts.X_MAX * 1.1 && consts.Y_MIN * 1.1 <= position.y && position.y < consts.Y_MAX * 1.1;
    };
    utils.isOutScreen = function(position) {
        return position.x < consts.X_MIN * 1.1 || consts.X_MAX * 1.1 <= position.x || position.y < consts.Y_MIN * 1.1 || consts.Y_MAX * 1.1 <= position.y;
    };

    module.exports = utils;

})();
