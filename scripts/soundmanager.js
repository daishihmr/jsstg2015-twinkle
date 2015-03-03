if (typeof module !== 'undefined' && module.exports) {
    var tm = require("../libs/tmlib.js");
}

var SoundManager = {
    bgmVolume: 0.2,
    seVolume: 0.2,
    currentBgm: null,
    playBgm: function(name) {
        if (this.currentBgm) {
            this.currentBgm.stop();
        }
        this.currentBgm = tm.asset.Manager.get(name);
        if (this.currentBgm) {
            this.currentBgm.setVolume(this.bgmVolume).setLoop(true).play();
        }
    },
    playSe: function(name) {
        var se = tm.asset.Manager.get(name);
        if (se) {
            se.setVolume(this.setVolume).play();
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SoundManager;
}
