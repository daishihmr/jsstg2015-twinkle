/*
 * threeelement.js
 */

(function() {
    var tm = require("../../../libs/tmlib");
    var THREE = require("../../../libs/three");
    require("./delegateutil");

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

        rotatePitch: function(degree) {
            var q = tempQuat.setFromAxisAngle(V3_RIGHT, degree * Math.DEG_TO_RAD);
            this.quaternion.multiply(q);
        },
        rotateYaw: function(degree) {
            var q = tempQuat.setFromAxisAngle(V3_UP, degree * Math.DEG_TO_RAD);
            this.quaternion.multiply(q);
        },
        rotateRoll: function(degree) {
            var q = tempQuat.setFromAxisAngle(V3_FORWARD, degree * Math.DEG_TO_RAD);
            this.quaternion.multiply(q);
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

    var V3_RIGHT = new THREE.Vector3(1, 0, 0);
    var V3_UP = new THREE.Vector3(0, 1, 0);
    var V3_FORWARD = new THREE.Vector3(0, 0, 1);
    var tempQuat = new THREE.Quaternion();

    var delegater = tm.hybrid.DelegateUtil(tm.hybrid.ThreeElement);

    delegater.property("id");
    delegater.property("uuid");
    delegater.property("name");

    tm.hybrid.ThreeElement.prototype.accessor("position", {
        get: function() {
            return this.threeObject.position;
        },
        set: function(v) {
            this.threeObject.position = v;
        }
    });
    delegater.property("x", "position");
    delegater.property("y", "position");
    delegater.property("z", "position");

    tm.hybrid.ThreeElement.prototype.accessor("scale", {
        get: function() {
            return this.threeObject.scale;
        },
        set: function(v) {
            this.threeObject.scale = v;
        }
    });
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
    delegater.property("eulerOrder");
    tm.hybrid.ThreeElement.prototype.accessor("rotation", {
        get: function() {
            return this.threeObject.rotation;
        },
        set: function(v) {
            this.threeObject.rotation = v;
        }
    });
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

    delegater.method("applyMatrix", true);
    delegater.method("translateX", true);
    delegater.method("translateY", true);
    delegater.method("translateZ", true);
    delegater.method("localToWorld");
    delegater.method("worldToLocal");
    delegater.method("lookAt", true);
    delegater.method("traverse", true);
    delegater.method("traverseVisible", true);
    delegater.method("traverseAncestors", true);
    delegater.method("updateMatrix", true);
    delegater.method("updateMatrixWorld", true);
    delegater.method("getObjectByName");
    delegater.method("rotateOnAxis", true);

    tm.hybrid.ThreeElement.prototype.localToGlobal = tm.hybrid.ThreeElement.prototype.localToWorld;
    tm.hybrid.ThreeElement.prototype.globalToLocal = tm.hybrid.ThreeElement.prototype.globalToLocal;

})();
