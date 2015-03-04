if (typeof module !== 'undefined' && module.exports) {
    var tm = require("../libs/tmlib");

    require("./app/application");
}

tm.main(function() {
    jsstg.app.Application().run();
});
