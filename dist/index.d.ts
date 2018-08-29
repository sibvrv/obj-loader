declare global {
    namespace OBJ {
        type Vertex = [number, number, number];
        type UVPoint = [number, number];
        type FaceData = [number, number, number];
        type Face = [number, FaceData, FaceData, FaceData];
        type Material = {
            id: number;
            name: string;
        };
        type MaterialsList = {
            [name: string]: Material;
        };
    }
}
/**
 * Tiny OBJ Loader
 */
export declare class OBJLoader {
    vertex: OBJ.Vertex[];
    normals: OBJ.Vertex[];
    uv: OBJ.UVPoint[];
    faces: OBJ.Face[];
    materials: OBJ.MaterialsList;
    materialsIndex: OBJ.MaterialsList;
    /**
     * Loads .obj from a string.
     * @param text
     */
    parse(text: string): void;
}
