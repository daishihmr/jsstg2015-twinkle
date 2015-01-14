var tm = require("../../libs/tmlib");

var consts = require("../consts.js");
var assets = require("../assets.js");

require("../tm/asset/font");
require("../tm/asset/threejson");

require("../tm/hybrid/hybridapp");
require("../scenes/titlescene");

tm.define("jsstg2015.app.Application", {
    superClass: "tm.hybrid.HybridApp",

    init: function() {
        tm.dom.Element("body").style.set("backgroundColor", "hsl(240, 40%, 10%)");
        var app = this;
        this.superInit();

        app.fps = 60;
        app.resize(consts.W, consts.H).fitWindow();

        // ゲームパッド対応
        app.gamepad = tm.input.Gamepad();

        var canvas2d = tm.dom.Element(app.element);
        var canvas3d = tm.dom.Element(app.threeCanvas);
        canvas3d.style.set("backgroundColor", "black");
        tm.dom.Element("body")
            .prepend(canvas2d)
            .prepend(canvas3d);

        // oggが再生できない環境ならmp3を使う
        var canPlayOgg = new Audio().canPlayType("audio/ogg");
        if (!canPlayOgg) {
            assets.$forIn(function(key) {
                if (typeof(assets[key]) === "string" && assets[key].match(/\.ogg$/)) {
                    assets[key] = assets[key].replace(/\.ogg$/, ".mp3");
                }
            });
        }

        app.pushScene(tm.ui.LoadingScene({
            nextScene: jsstg2015.scenes.TitleScene,
            width: consts.W,
            height: consts.H,
            assets: assets,
        }));

        // if (window.location.hostname === "localhost") {
            tm.util.Script.loadStats().on("load", function() {
                app.enableStats();
            });
        // }
    },

    update: function() {
        this.gamepad._update();
    },
});
