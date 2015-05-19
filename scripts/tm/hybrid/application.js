/*
 * hybridapp.js
 */

(function() {
    var tm = require("../../../libs/tmlib");
    var THREE = require("../../../libs/three");
    require("./scene");

    tm.define("tm.hybrid.Application", {
        superClass: "tm.display.CanvasApp",

        threeRenderer: null,
        threeCanvas: null,

        init: function(canvas2d, canvas3d) {
            this.superInit(canvas2d);
            this.setupThree(canvas3d);
            this.background = "transparent";

            this.replaceScene(tm.hybrid.Scene())
        },

        setupThree: function(canvas3d) {
            var param = {
                antialias: true,
            };
            if (canvas3d) {
                if (canvas3d instanceof HTMLCanvasElement) {
                    param.canvas = canvas3d;
                } else if (typeof canvas3d === "string") {
                    param.canvas = document.querySelector(canvas3d);
                }
            }
            this.threeRenderer = new THREE.WebGLRenderer(param);

            // if (this.element.parentNode) {
            //     this.element.parentNode.insertBefore(this.threeRenderer.domElement, this.element);
            // } else {
            //     window.document.body.appendChild(this.threeRenderer.domElement);
            // }

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
            tm.app.CanvasApp.prototype._update.call(this);
            var scene = this.currentScene;
            if (this.awake && scene instanceof tm.hybrid.Scene) {
                this.updater.update(scene.three.camera);
                this.updater.update(scene.three);
            }
        },

        /** @override */
        _draw: function() {
            tm.display.CanvasApp.prototype._draw.call(this);
            var scene = this.currentScene;
            if (scene instanceof tm.hybrid.Scene) {
                scene.render(this.threeRenderer);
            }
        },

        /** @override */
        resize: function(w, h) {
            this.threeRenderer.setSize(w, h);
            var scene = this.currentScene;
            if (scene instanceof tm.hybrid.Scene) {
                scene.three.camera.aspect = w / h;
            }
            return tm.display.CanvasApp.prototype.resize.call(this, w, h);
        }
    });
})();
