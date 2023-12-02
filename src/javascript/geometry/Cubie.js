var CG = (function(CG) {

    class Cubie extends CG.GenericGeometry {

	 /**
     * 
     */
	 constructor(gl, material, color, initial_transform) {
  
		super(gl, material, color, initial_transform);
	  }
  
	  /**
	   */
	  getVertices() {
		return [
            
		];
	  }
  
	  getNormals(vertices) {
		let normals = [];
		let v1 = new CG.Vector3();
		let v2 = new CG.Vector3();
		let v3 = new CG.Vector3();
		let n;
	  
		for (let i=0; i<vertices.length; i+=9) {
		  v1.set( vertices[i  ], vertices[i+1], vertices[i+2] );
		  v2.set( vertices[i+3], vertices[i+4], vertices[i+5] );
		  v3.set( vertices[i+6], vertices[i+7], vertices[i+8] );
		  n = CG.Vector3.cross(CG.Vector3.subtract(v1, v2), CG.Vector3.subtract(v2, v3)).normalize();
		  normals.push(
			n.x, n.y, n.w, 
			n.x, n.y, n.w, 
			n.x, n.y, n.w
		  );
		}
  
		return normals;
	  }
	}


    CG.Cubie = Cubie;
    return CG;
})(CG || {});

