(function() {
    var tm = require("../libs/tmlib");

    var Tasks = tm.createClass({
        superClass: tm.event.EventDispatcher,

        tasks: null,

        init: function() {
            this.superInit();
            this.tasks = [];
        },

        next: function() {
            var task = this.tasks.shift();
            if (task) {
                task();
            } else {
                this.flare("finish");
            }
        },

    });

    module.exports = Tasks;
})();
