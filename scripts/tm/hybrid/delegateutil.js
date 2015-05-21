/*
 * delegateuril.js
 */

(function() {
    var tm = require("../../../libs/tmlib");

    tm.define("tm.hybrid.DelegateUtil", {
        init: function(type) {
            this.type = type;
        },
        property: function(name, threeProperty) {
            if (threeProperty) {
                this.type.prototype.accessor(name, {
                    get: function() {
                        return this.threeObject[threeProperty][name];
                    },
                    set: function(v) {
                        this.threeObject[threeProperty][name] = v;
                    }
                });
            } else {
                this.type.prototype.accessor(name, {
                    get: function() {
                        return this.threeObject[name];
                    },
                    set: function(v) {
                        this.threeObject[name] = v;
                    }
                });
            }

            this.type.defineInstanceMethod(createSetterName(name), function(v) {
                this[name] = v;
                return this;
            });
        },
        method: function(name, returnThis, threeProperty) {
            if (threeProperty) {
                this.type.defineInstanceMethod(name, function() {
                    var r = this.threeObject[threeProperty][name].apply(this.threeObject[threeProperty], arguments);
                    if (returnThis) {
                        return this;
                    } else {
                        return r;
                    }
                });
            } else {
                this.type.defineInstanceMethod(name, function() {
                    var r = this.threeObject[name].apply(this.threeObject, arguments);
                    if (returnThis) {
                        return this;
                    } else {
                        return r;
                    }
                });
            }
        },
    });

    function createSetterName(propertyName) {
        return "set" + propertyName[0].toUpperCase() + propertyName.substring(1);
    }
})();
