(function() {

    var tm = require("../libs/tmlib");
    var Application = require("./app/application");

    tm.main(function() {
        Application().run();
    });
})();
