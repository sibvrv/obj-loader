import {expect} from 'chai';
import {OBJLoader} from './index';

const quadOBJ = `
o Quad
v 0 1 0
v 0 0 0
v 1 0 0
v 1 1 0
vn 0 0 1
vt 0 1
vt 0 0
vt 1 0
vt 1 1

o Simple Quad
f 1/1 2/2 3/3
f 1/1 3/3 4/4

o Quad_face
f 1/1/1 2/2/1 3/3/1 4/4/1

o Tri_v_vn
f 1//1 2//1 3//1
`;

const simpleOBJ = `
mtllib material.mtl

v 0.000000 2.000000 2.000000
v 0.000000 0.000000 2.000000
v 2.000000 0.000000 2.000000
v 2.000000 2.000000 2.000000
v 0.000000 2.000000 0.000000
v 0.000000 0.000000 0.000000
v 2.000000 0.000000 0.000000
v 2.000000 2.000000 0.000000
# 8 vertices

g front cube
usemtl white
f 1 2 3 4
g back cube
# expects white material
f 8 7 6 5
g right cube
usemtl red
f 4 3 7 8
g top cube
usemtl white
f 5 1 4 8
g left cube
usemtl green
f 5 6 2 1
g bottom cube
usemtl white
f 2 6 7 3
# 6 elements
`;

describe('OBJ Loader', function () {

  it('quad', function () {
    const result = new OBJLoader();
    result.parse(quadOBJ);

    expect(result.vertex).to.deep.equal([
      [0, 1, 0], // v 0 1 0
      [0, 0, 0], // v 0 0 0
      [1, 0, 0], // v 1 0 0
      [1, 1, 0]  // v 1 1 0
    ]);

    expect(result.uv).to.deep.equal([
      [0, 1], // vt 0 1
      [0, 0], // vt 0 0
      [1, 0], // vt 1 0
      [1, 1]  // vt 1 1
    ]);

    expect(result.normals).to.deep.equal([
      [0, 0, 1] // vn 0 0 1
    ]);

    expect(result.faces).to.deep.equal([
      [0, [1, 1, 0], [2, 2, 0], [3, 3, 0]], // f 1/1 2/2 3/3
      [0, [1, 1, 0], [3, 3, 0], [4, 4, 0]], // f 1/1 3/3 4/4

      [0, [1, 1, 1], [2, 2, 1], [3, 3, 1]], // f 1/1/1 2/2/1 3/3/1 4/4/1
      [0, [1, 1, 1], [3, 3, 1], [4, 4, 1]],

      [0, [1, 0, 1], [2, 0, 1], [3, 0, 1]]  // f 1//1 2//1 3//1
    ]);
  });

  it('simple obj', function () {
    const result = new OBJLoader();
    result.parse(simpleOBJ);

    expect(result.vertex).to.deep.equal([
      [0, 2, 2],
      [0, 0, 2],
      [2, 0, 2],
      [2, 2, 2],
      [0, 2, 0],
      [0, 0, 0],
      [2, 0, 0],
      [2, 2, 0]
    ]);

    expect(result.uv).to.deep.equal([]);

    expect(result.faces).to.deep.equal([
      [0, [1, 0, 0], [2, 0, 0], [3, 0, 0]], // f 1 2 3 4
      [0, [1, 0, 0], [3, 0, 0], [4, 0, 0]],

      [0, [8, 0, 0], [7, 0, 0], [6, 0, 0]], // f 8 7 6 5
      [0, [8, 0, 0], [6, 0, 0], [5, 0, 0]],

      [1, [4, 0, 0], [3, 0, 0], [7, 0, 0]], // f 4 3 7 8
      [1, [4, 0, 0], [7, 0, 0], [8, 0, 0]],

      [0, [5, 0, 0], [1, 0, 0], [4, 0, 0]], // f 5 1 4 8
      [0, [5, 0, 0], [4, 0, 0], [8, 0, 0]],

      [2, [5, 0, 0], [6, 0, 0], [2, 0, 0]], // f 5 6 2 1
      [2, [5, 0, 0], [2, 0, 0], [1, 0, 0]],

      [0, [2, 0, 0], [6, 0, 0], [7, 0, 0]], // f 2 6 7 3
      [0, [2, 0, 0], [7, 0, 0], [3, 0, 0]]
    ]);

    expect(result.materials).to.deep.equal({
      white: {id: 0, name: "white"},
      red: {id: 1, name: "red"},
      green: {id: 2, name: "green"}
    });

    expect(result.materialsIndex).to.deep.equal({
      0: {id: 0, name: "white"},
      1: {id: 1, name: "red"},
      2: {id: 2, name: "green"}
    });
  });

});
