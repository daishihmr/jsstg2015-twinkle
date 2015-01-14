var tm = require("../../libs/tmlib");
var THREE = require("../../libs/three");

var consts = require("../consts");

require("../dev");

tm.define("jsstg2015.scenes.TitleScene", {
    superClass: "tm.app.Scene",
    init: function() {
        this.superInit();
        this.fromJSON({
            children: [{
                type: "tm.display.Label",
                init: ["click to start", 30],
                x: consts.W * 0.5,
                y: consts.H * 0.2,
                interactive: true,
                onpointingend: function(e) {
                    e.app.replaceScene(Dev());
                },
            }, {
                type: "tm.display.Label",
                init: ["toggle fullscreen (F11)", 30],
                x: consts.W * 0.5,
                y: consts.H * 0.6,
                interactive: true,
                onpointingend: function() {
                    window.toggleFullscreen();
                },
            }, {
                type: "tm.display.Label",
                init: ["toNormalSize (F2)", 30],
                x: consts.W * 0.5,
                y: consts.H * 0.7,
                interactive: true,
                onpointingend: function() {
                    window.toNormalSize();
                },
            }, {
                type: "tm.display.Label",
                init: ["toDoubleSize (F3)", 30],
                x: consts.W * 0.5,
                y: consts.H * 0.8,
                interactive: true,
                onpointingend: function() {
                    window.toDoubleSize();
                },
            }, {
                type: "tm.display.Label",
                init: ["exit game (ESC)", 30],
                x: consts.W * 0.5,
                y: consts.H * 0.9,
                interactive: true,
                onpointingend: function() {
                    window.exitApplication();
                },
            }, ],
        });

        var start = function() {
            document.body.removeEventListener("click", start, false);
            document.body.removeEventListener("touchend", start, false);

            tm.sound.WebAudio.unlock();
        }.bind(this);

        document.body.addEventListener("click", start, false);
        document.body.addEventListener("touchend", start, false);

        this.one("enter", function() {
            tm.display.Label["default"].fontFamily = "uiFont";
        });
    }
});
