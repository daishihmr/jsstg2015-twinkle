/*
 * delegateuril.js
 */

(function() {

    if (typeof module !== 'undefined' && module.exports) {
        var tm = require("../../../libs/tmlib");
    }

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

            this.type.defineInstanceMethod(setterName(name), function(v) {
                this[name] = v;
                return this;
            });
        },
        method: function(name, threeProperty) {
            if (threeProperty) {
                this.type.defineInstanceMethod(name, function() {
                    return this.threeObject[threeProperty][name].apply(this.threeObject[threeProperty][name], arguments);
                });
            } else {
                this.type.defineInstanceMethod(name, function() {
                    return this.threeObject[name].apply(this.threeObject[name], arguments);
                });
            }
        },
    });

    function setterName(propertyName) {
        return "set" + propertyName[0].toUpperCase() + propertyName.substring(1);
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = tm.hybrid.DelegateUtil;
    }

})();
