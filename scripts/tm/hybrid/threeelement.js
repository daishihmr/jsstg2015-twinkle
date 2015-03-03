var tm = require("../../../libs/tmlib");
var THREE = require("../../../libs/three");

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

    setX: function(x) {
        this.x = x;
        return this;
    },
    setY: function(y) {
        this.y = y;
        return this;
    },
    setZ: function(z) {
        this.z = z;
        return this;
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

tm.hybrid.ThreeElement.prototype.accessor("id", {
    get: function() {
        return this.threeObject.id;
    },
    set: function(v) {
        this.threeObject.id = v;
    }
});

tm.hybrid.ThreeElement.prototype.accessor("uuid", {
    get: function() {
        return this.threeObject.uuid;
    },
    set: function(v) {
        this.threeObject.uuid = v;
    }
});

tm.hybrid.ThreeElement.prototype.accessor("name", {
    get: function() {
        return this.threeObject.name;
    },
    set: function(v) {
        this.threeObject.name = v;
    }
});

tm.hybrid.ThreeElement.prototype.accessor("position", {
    get: function() {
        return this.threeObject.position;
    },
    set: function(v) {
        this.threeObject.position = v;
    }
});

tm.hybrid.ThreeElement.prototype.accessor("x", {
    get: function() {
        return this.threeObject.position.x;
    },
    set: function(v) {
        this.threeObject.position.x = v;
    }
});

tm.hybrid.ThreeElement.prototype.accessor("y", {
    get: function() {
        return this.threeObject.position.y;
    },
    set: function(v) {
        this.threeObject.position.y = v;
    }
});

tm.hybrid.ThreeElement.prototype.accessor("z", {
    get: function() {
        return this.threeObject.position.z;
    },
    set: function(v) {
        this.threeObject.position.z = v;
    }
});

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

tm.hybrid.ThreeElement.prototype.accessor("rotation", {
    get: function() {
        return this.threeObject.rotation;
    },
    set: function(v) {
        this.threeObject.rotation = v;
    }
});

tm.hybrid.ThreeElement.prototype.accessor("eulerOrder", {
    get: function() {
        return this.threeObject.eulerOrder;
    },
    set: function(v) {
        this.threeObject.eulerOrder = v;
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

tm.hybrid.ThreeElement.prototype.accessor("up", {
    get: function() {
        return this.threeObject.up;
    },
    set: function(v) {
        this.threeObject.up = v;
    }
});

tm.hybrid.ThreeElement.prototype.accessor("useQuaternion", {
    get: function() {
        return this.threeObject.useQuaternion;
    },
    set: function(v) {
        this.threeObject.useQuaternion = v;
    }
});

tm.hybrid.ThreeElement.prototype.accessor("quaternion", {
    get: function() {
        return this.threeObject.quaternion;
    },
    set: function(v) {
        this.threeObject.quaternion = v;
    }
});

tm.hybrid.ThreeElement.prototype.accessor("visible", {
    get: function() {
        return this.threeObject.visible;
    },
    set: function(v) {
        this.threeObject.visible = v;
    }
});
tm.hybrid.ThreeElement.defineInstanceMethod("setVisible", function(v) {
    this.visible = v;
    return this;
});


tm.hybrid.ThreeElement.prototype.accessor("castShadow", {
    get: function() {
        return this.threeObject.castShadow;
    },
    set: function(v) {
        this.threeObject.castShadow = v;
    }
});
tm.hybrid.ThreeElement.defineInstanceMethod("setCastShadow", function(v) {
    this.castShadow = v;
    return this;
});

tm.hybrid.ThreeElement.prototype.accessor("receiveShadow", {
    get: function() {
        return this.threeObject.receiveShadow;
    },
    set: function(v) {
        this.threeObject.receiveShadow = v;
    }
});
tm.hybrid.ThreeElement.defineInstanceMethod("setReceiveShadow", function(v) {
    this.receiveShadow = v;
    return this;
});

tm.hybrid.ThreeElement.prototype.accessor("frustumCulled", {
    get: function() {
        return this.threeObject.frustumCulled;
    },
    set: function(v) {
        this.threeObject.frustumCulled = v;
    }
});

tm.hybrid.ThreeElement.prototype.accessor("matrixAutoUpdate", {
    get: function() {
        return this.threeObject.matrixAutoUpdate;
    },
    set: function(v) {
        this.threeObject.matrixAutoUpdate = v;
    }
});

tm.hybrid.ThreeElement.prototype.accessor("matrixWorldNeedsUpdate", {
    get: function() {
        return this.threeObject.matrixWorldNeedsUpdate;
    },
    set: function(v) {
        this.threeObject.matrixWorldNeedsUpdate = v;
    }
});

tm.hybrid.ThreeElement.prototype.accessor("rotationAutoUpdate", {
    get: function() {
        return this.threeObject.rotationAutoUpdate;
    },
    set: function(v) {
        this.threeObject.rotationAutoUpdate = v;
    }
});

tm.hybrid.ThreeElement.prototype.accessor("userData", {
    get: function() {
        return this.threeObject.userData;
    },
    set: function(v) {
        this.threeObject.userData = v;
    }
});

tm.hybrid.ThreeElement.prototype.accessor("matrixWorld", {
    get: function() {
        return this.threeObject.matrixWorld;
    },
    set: function(v) {
        this.threeObject.matrixWorld = v;
    }
});

tm.hybrid.ThreeElement.defineInstanceMethod("applyMatrix", function(matrix) {
    this.threeObject.applyMatrix(matrix);
    return this;
});
tm.hybrid.ThreeElement.defineInstanceMethod("translateX", function(distance) {
    this.threeObject.translateX(distance);
    return this;
});
tm.hybrid.ThreeElement.defineInstanceMethod("translateY", function(distance) {
    this.threeObject.translateY(distance);
    return this;
});
tm.hybrid.ThreeElement.defineInstanceMethod("translateZ", function(distance) {
    this.threeObject.translateZ(distance);
    return this;
});
tm.hybrid.ThreeElement.defineInstanceMethod("localToWorld", function(vector) {
    this.threeObject.localToWorld(vector);
    return this;
});
tm.hybrid.ThreeElement.defineInstanceMethod("worldToLocal", function(vector) {
    this.threeObject.worldToLocal(vector);
    return this;
});
tm.hybrid.ThreeElement.defineInstanceMethod("lookAt", function(vector) {
    this.threeObject.lookAt(vector);
    return this;
});
tm.hybrid.ThreeElement.defineInstanceMethod("updateMatrix", function() {
    this.threeObject.updateMatrix();
    return this;
});
tm.hybrid.ThreeElement.defineInstanceMethod("updateMatrixWorld", function(force) {
    this.threeObject.updateMatrixWorld(force);
    return this;
});
tm.hybrid.ThreeElement.defineInstanceMethod("getObjectByName", function(name, recursive) {
    return this.threeObject.getObjectByName(name, recursive);
});
tm.hybrid.ThreeElement.defineInstanceMethod("getObjectById", function(id, recursive) {
    return this.threeObject.getObjectById(id, recursive);
});
tm.hybrid.ThreeElement.defineInstanceMethod("translateOnAxis", function(axis, distance) {
    this.threeObject.translateOnAxis(axis, distance);
    return this;
});
tm.hybrid.ThreeElement.defineInstanceMethod("rotateOnAxis", function(axis, angle) {
    this.threeObject.rotateOnAxis(axis, angle);
    return this;
});
