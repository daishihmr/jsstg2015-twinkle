/*
 * threeelement.js
 */

(function() {

    if (typeof module !== 'undefined' && module.exports) {
        var tm = require("../../../libs/tmlib");
        var THREE = require("../../../libs/three");
        require("./delegateutil");
    }

    tm.define("tm.hybrid.ThreeElement", {
        superClass: "tm.app.Element",

        init: function(threeObject) {
            this.superInit();

            /** @type {THREE.Object3D} */
            this.threeObject = threeObject || new THREE.Object3D();
        },

        /** @override */
        addChild: function(child) {
            if (child.parent) child.remove();
            child.parent = this;
            this.children.push(child);

            if (child instanceof tm.hybrid.ThreeElement) {
                this.threeObject.add(child.threeObject);
            }

            var e = tm.event.Event("added");
            child.dispatchEvent(e);

            return child;
        },

        /** @override */
        removeChild: function(child) {
            var index = this.children.indexOf(child);
            if (index != -1) {
                this.children.splice(index, 1);

                if (child instanceof tm.hybrid.ThreeElement) {
                    this.threeObject.remove(child.threeObject);
                }

                var e = tm.event.Event("removed");
                child.dispatchEvent(e);
            }
        },

        setPosition: function(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        },

        setRotation: function(x, y, z) {
            this.rotationX = x;
            this.rotationY = y;
            this.rotationZ = z;
            return this;
        },
        setRotationX: function(x) {
            this.rotationX = x;
            return this;
        },
        setRotationY: function(y) {
            this.rotationY = y;
            return this;
        },
        setRotationZ: function(z) {
            this.rotationZ = z;
            return this;
        },

        setScale: function(x, y, z) {
            if (arguments.length === 1) {
                y = x;
                z = x;
            }
            this.scaleX = x;
            this.scaleY = y;
            this.scaleZ = z;
            return this;
        },

        show: function() {
            this.visible = true;
            return this;
        },
        hide: function() {
            this.visible = false;
            return this;
        },
    });

    var delegater = tm.hybrid.DelegateUtil(tm.hybrid.ThreeElement);

    delegater.property("id");
    delegater.property("uuid");
    delegater.property("name");
    delegater.property("position");
    delegater.property("x", "position");
    delegater.property("y", "position");
    delegater.property("z", "position");
    delegater.property("scale");
    tm.hybrid.ThreeElement.prototype.accessor("scaleX", {
        get: function() {
            return this.threeObject.scale.x;
        },
        set: function(v) {
            this.threeObject.scale.x = v;
        }
    });
    tm.hybrid.ThreeElement.prototype.accessor("scaleY", {
        get: function() {
            return this.threeObject.scale.y;
        },
        set: function(v) {
            this.threeObject.scale.y = v;
        }
    });
    tm.hybrid.ThreeElement.prototype.accessor("scaleZ", {
        get: function() {
            return this.threeObject.scale.z;
        },
        set: function(v) {
            this.threeObject.scale.z = v;
        }
    });
    delegater.property("rotation");
    delegater.property("eulerOrder");
    tm.hybrid.ThreeElement.prototype.accessor("rotationX", {
        get: function() {
            return this.threeObject.rotation.x * Math.RAD_TO_DEG;
        },
        set: function(v) {
            this.threeObject.rotation.x = v * Math.DEG_TO_RAD;
        }
    });
    tm.hybrid.ThreeElement.prototype.accessor("rotationY", {
        get: function() {
            return this.threeObject.rotation.y * Math.RAD_TO_DEG;
        },
        set: function(v) {
            this.threeObject.rotation.y = v * Math.DEG_TO_RAD;
        }
    });
    tm.hybrid.ThreeElement.prototype.accessor("rotationZ", {
        get: function() {
            return this.threeObject.rotation.z * Math.RAD_TO_DEG;
        },
        set: function(v) {
            this.threeObject.rotation.z = v * Math.DEG_TO_RAD;
        }
    });
    delegater.property("up");
    delegater.property("useQuaternion");
    delegater.property("quaternion");
    delegater.property("visible");
    delegater.property("castShadow");
    delegater.property("receiveShadow");
    delegater.property("frustumCulled");
    delegater.property("matrixAutoUpdate");
    delegater.property("matrixWorldNeedsUpdate");
    delegater.property("rotationAutoUpdate");
    delegater.property("userData");
    delegater.property("matrixWorld");

    delegater.method("applyMatrix");
    delegater.method("translateX");
    delegater.method("translateY");
    delegater.method("translateZ");
    delegater.method("localToWorld");
    delegater.method("worldToLocal");
    tm.hybrid.ThreeElement.defineInstanceMethod("lookAt", function(target) {
        if (target.position) {
            this.threeObject.lookAt(target.position);
        } else {
            this.threeObject.lookAt(target);
        }
    });
    delegater.method("updateMatrix");
    delegater.method("updateMatrixWorld");
    delegater.method("getObjectByName");
    delegater.method("rotateOnAxis");

})();
