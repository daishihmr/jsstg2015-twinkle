/*
 * hybridapp.js
 */

(function() {

    if (typeof module !== 'undefined' && module.exports) {
        var tm = require("../../../libs/tmlib");
        var THREE = require("../../../libs/three");

        require("./hybridscene");
    }

    tm.define("tm.hybrid.HybridApp", {
        superClass: "tm.display.CanvasApp",

        threeRenderer: null,
        threeCanvas: null,

        init: function(canvas) {
            this.superInit(canvas);
            this.setupThree();
            this.background = "transparent";
        },

        setupThree: function() {
            this.threeRenderer = new THREE.WebGLRenderer({
                antialias: false,
            });

            if (this.element.parentNode) {
                this.element.parentNode.insertBefore(this.threeRenderer.domElement, this.element);
            }

            this.threeCanvas = this.threeRenderer.domElement;
        },

        /** @override */
        fitWindow: function(everFlag) {
            var _fitFunc = function() {
                everFlag = everFlag === undefined ? true : everFlag;
                var e = this.threeCanvas;
                var s = e.style;

                s.position = "absolute";
                s.margin = "auto";
                s.left = "0px";
                s.top = "0px";
                s.bottom = "0px";
                s.right = "0px";

                var rateWidth = e.width / window.innerWidth;
                var rateHeight = e.height / window.innerHeight;
                var rate = e.height / e.width;

                if (rateWidth > rateHeight) {
                    s.width = innerWidth + "px";
                    s.height = innerWidth * rate + "px";
                } else {
                    s.width = innerHeight / rate + "px";
                    s.height = innerHeight + "px";
                }
            }.bind(this);

            // 一度実行しておく
            _fitFunc();
            // リサイズ時のリスナとして登録しておく
            if (everFlag) {
                window.addEventListener("resize", _fitFunc, false);
            }

            return tm.display.CanvasApp.prototype.fitWindow.call(this, everFlag);
        },

        /** @override */
        _update: function() {
            tm.app.BaseApp.prototype._update.call(this);
            var scene = this.currentScene;
            if (this.awake && scene instanceof tm.hybrid.HybridScene) {
                this.updater.update(scene.three.camera);
                this.updater.update(scene.three);
            }
        },

        /** @override */
        _draw: function() {
            tm.display.CanvasApp.prototype._draw.call(this);
            var scene = this.currentScene;
            if (scene instanceof tm.hybrid.HybridScene) {
                scene.render(this.threeRenderer);
            }
        },

        /** @override */
        resize: function(w, h) {
            this.threeRenderer.setSize(w, h);
            var scene = this.currentScene;
            if (scene instanceof tm.hybrid.HybridScene) {
                scene.three.camera.aspect = w / h;
            }
            return tm.display.CanvasApp.prototype.resize.call(this, w, h);
        }
    });

})();
