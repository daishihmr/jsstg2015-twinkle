if (typeof module !== 'undefined' && module.exports) {
    var tm = require("../../../libs/tmlib");
}

tm.asset = tm.asset || {};

tm.define("tm.asset.WebFont", {
    superClass: "tm.event.EventDispatcher",

    init: function(path, key) {
        this.superInit();

        var testElement = tm.dom.Element("body").create("span");
        testElement.style
            .set("color", "rgba(0, 0, 0, 0)")
            .set("fontSize", "40px");
        testElement.text = "QW@HhsXJ=/()あいうえお＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝";

        var before = testElement.element.offsetWidth;

        testElement.style
            .set("fontFamily", "'{0}', 'monospace'".format(key));

        var fontFaceStyleElement = tm.dom.Element("head").create("style");
        fontFaceStyleElement.text = "@font-face { font-family: '{0}'; src: url({1}) format('truetype'); }".format(key, path);

        var retryCount = 30;
        var checkLoadFont = function() {
            retryCount -= 1;
            if (testElement.element.offsetWidth !== before || retryCount === 0) {
                testElement.remove();
                this.flare("load");
                console.debug("webfont loaded", path, key);
            } else {
                setTimeout(checkLoadFont, 100);
            }
        }.bind(this);
        setTimeout(checkLoadFont, 100);
    },
});

tm.asset.Loader.register("ttf", function(path, key) {
    return tm.asset.WebFont(path, key);
});
