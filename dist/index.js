"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var splitPattern = /\s+/;
/**
 * Tiny OBJ Loader
 */
var OBJLoader = /** @class */ (function () {
    function OBJLoader() {
        this.vertex = [];
        this.normals = [];
        this.uv = [];
        this.faces = [];
        this.materials = {};
        this.materialsIndex = {};
    }
    /**
     * Loads .obj from a string.
     * @param text
     */
    OBJLoader.prototype.parse = function (text) {
        var lines = text.split("\n");
        var _a = this, vertex = _a.vertex, uv = _a.uv, normals = _a.normals, faces = _a.faces, materials = _a.materials;
        var material_id = 0;
        var material = 0;
        var objects = {};
        for (var i = 0; i < lines.length; i++) {
            var _b = lines[i].split(splitPattern), cmd = _b[0], params = _b.slice(1);
            switch (cmd) {
                case "v":
                    vertex.push([
                        parseInt(params[0]),
                        parseInt(params[1]),
                        parseInt(params[2])
                    ]);
                    break;
                case "vn":
                    normals.push([
                        parseInt(params[0]),
                        parseInt(params[1]),
                        parseInt(params[2])
                    ]);
                    break;
                case "vt":
                    uv.push([
                        parseInt(params[0]),
                        parseInt(params[1])
                    ]);
                    break;
                case "usemtl":
                    var name_1 = lines[i].trim().substr(7);
                    material = name_1 in materials ? materials[name_1].id : (materials[name_1] = {
                        id: material_id++,
                        name: name_1
                    }).id;
                    this.materialsIndex[materials[name_1].id] = materials[name_1];
                    break;
                case "f":
                    var face = [];
                    for (var j = 0; j < params.length; j++) {
                        var faceinfo = params[j].split("/");
                        faceinfo.length = 3;
                        face.push([
                            parseInt(faceinfo[0]) || 0,
                            parseInt(faceinfo[1]) || 0,
                            parseInt(faceinfo[2]) || 0
                        ]);
                    }
                    for (var i0 = 0, i1 = 0, i2 = 1, k = 2; k < face.length; k++) {
                        i1 = i2;
                        i2 = k;
                        faces.push([material, face[i0], face[i1], face[i2]]);
                    }
                    break;
            }
        }
    };
    return OBJLoader;
}());
exports.OBJLoader = OBJLoader;
