declare global {
  namespace OBJ {
    type Vertex = [number, number, number];

    type UVPoint = [number, number]

    type FaceData = [number, number, number];

    type Face = [number, FaceData, FaceData, FaceData];

    type Material = {
      id: number;
      name: string;
    }

    type MaterialsList = {
      [name: string]: Material
    }
  }
}

const splitPattern = /\s+/;

/**
 * Tiny OBJ Loader
 */
export class OBJLoader {
  vertex: OBJ.Vertex[] = [];
  normals: OBJ.Vertex[] = [];
  uv: OBJ.UVPoint[] = [];

  faces: OBJ.Face[] = [];
  materials: OBJ.MaterialsList = {};
  materialsIndex: OBJ.MaterialsList = {};

  /**
   * Loads .obj from a string.
   * @param text
   */
  parse(text: string) {
    let lines = text.split("\n");

    let {vertex, uv, normals, faces, materials} = this;
    let material_id = 0;
    let material = 0;

    let objects = {};

    for (let i = 0; i < lines.length; i++) {
      let [cmd, ...params] = lines[i].split(splitPattern);

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
          const name = lines[i].trim().substr(7);
          material = name in materials ? materials[name].id : (materials[name] = {
            id: material_id++,
            name
          }).id;
          this.materialsIndex[materials[name].id] = materials[name];
          break;
        case "f":
          let face: OBJ.FaceData[] = [];
          for (let j = 0; j < params.length; j++) {
            let faceinfo = params[j].split("/");
            faceinfo.length = 3;
            face.push([
              parseInt(faceinfo[0]) || 0,
              parseInt(faceinfo[1]) || 0,
              parseInt(faceinfo[2]) || 0
            ]);
          }

          for (let i0 = 0, i1 = 0, i2 = 1, k = 2; k < face.length; k++) {
            i1 = i2;
            i2 = k;
            faces.push([material, face[i0], face[i1], face[i2]]);
          }
          break;
      }
    }
  }
}

