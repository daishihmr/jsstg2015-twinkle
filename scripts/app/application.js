(function() {
    var tm = require("../../libs/tmlib");
    var consts = require("../consts.js");
    var assets = require("../assets.js");
    require("../tm/asset/threejson");
    require("../tm/hybrid/application");

    var TitleScene = require("../scenes/titlescene");
    var GameSceneManager = require("../scenes/gamescenemanager");

    var Application = tm.createClass({
        superClass: tm.hybrid.Application,

        init: function() {
            var app = this;
            this.superInit("#canvas2d", "#canvas3d");

            GameSceneManager.application = this;

            app.fps = 60;
            app.resize(consts.W, consts.H);
            app.threeRenderer.setSize(consts.W * consts.THREE_QUALITY, consts.H * consts.THREE_QUALITY);
            app.fitWindow();

            // oggが再生できない環境ならmp3を使う
            var canPlayOgg = new Audio().canPlayType("audio/ogg");
            if (!canPlayOgg) {
                assets.$forIn(function(key) {
                    if (typeof(assets[key]) === "string" && assets[key].match(/\.ogg$/)) {
                        assets[key] = assets[key].replace(/\.ogg$/, ".mp3");
                    }
                });
            }

            app.pushScene(tm.game.LoadingScene({
                nextScene: TitleScene,
                width: consts.W,
                height: consts.H,
                assets: assets,
            }));

            // if (window.location.hostname === "localhost") {
            // tm.asset.Script.loadStats().on("load", function() {
            //     app.enableStats();
            // });
            // }
        },
    });

    module.exports = Application;
})();
