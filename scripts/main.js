if (typeof module !== 'undefined' && module.exports) {
    var tm = require("../libs/tmlib");

    require("./app/application");
}

tm.main(function() {
    jsstg2015.app.Application().run();
});
