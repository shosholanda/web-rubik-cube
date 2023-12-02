var CG = (function(CG) {

  class Plano extends CG.GenericGeometry {
    /**
     * 
     */
    constructor(gl, material, color, initial_transform) {
      super(gl, material, color, initial_transform);

      gl.deleteBuffer(this.smoothPositionBuffer);
      gl.deleteBuffer(this.indicesBuffer);
      gl.deleteBuffer(this.smoothNormalBuffer);
    }

    /** se sobre escribe la función setSmooth para que no se suavice el modelo */
    setSmooth() {}

    getVertices() { 
      return [
        -1, 0,  1,
         1, 0,  1,
         1, 0, -1,
        -1, 0,  1,
         1, 0, -1,
        -1, 0, -1,
      ];
    }

    getUVCoords() {
      return [
        0, 0, 
        1, 0, 
        1, 1, 
        0, 0, 
        1, 1, 
        0, 1, 
      ];
    }

    getNormals(vertices) {
      return this.getFlatNormals(vertices);
    }
  }

  CG.Plano = Plano;
  return CG;
}(CG || {}));
