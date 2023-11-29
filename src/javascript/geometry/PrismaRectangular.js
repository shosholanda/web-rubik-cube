var CG = (function(CG) {
    let g_width, g_height, g_length;

    class PrismaRectangular extends CG.GenericGeometry {

	 /**
     * 
     */
	 constructor(gl, width = 1, height = 1, length = 1, material, color, initial_transform) {
		g_width = width;
		g_height = height;
		g_length = length;
  
		super(gl, material, color, initial_transform);
	  }
  
	  /**
	   */
	  getVertices() {
		return [
		  g_width,  g_height, -g_length,  g_width, -g_height,  g_length,  g_width, -g_height, -g_length,
		  g_width,  g_height, -g_length,  g_width,  g_height,  g_length,  g_width, -g_height,  g_length,
  
		  g_width, -g_height,  g_length,  -g_width,  g_height,  g_length,  -g_width, -g_height,  g_length,
		  g_width, -g_height,  g_length,  g_width,  g_height,  g_length,  -g_width,  g_height,  g_length,
  
		  -g_width, -g_height,  g_length,  -g_width,  g_height, -g_length,  -g_width, -g_height, -g_length,
		  -g_width, -g_height,  g_length,  -g_width,  g_height,  g_length,  -g_width,  g_height, -g_length,
  
		  -g_width,  g_height, -g_length,  g_width, -g_height, -g_length,  -g_width, -g_height, -g_length,
		  -g_width,  g_height, -g_length,  g_width,  g_height, -g_length,  g_width, -g_height, -g_length,
  
		  -g_width,  g_height,  g_length,  g_width,  g_height, -g_length,  -g_width,  g_height, -g_length,
		  -g_width,  g_height,  g_length,  g_width,  g_height,  g_length,  g_width,  g_height, -g_length,
  
		  g_width, -g_height, -g_length,  -g_width, -g_height,  g_length,  -g_width, -g_height, -g_length,
		  g_width, -g_height, -g_length,  g_width, -g_height,  g_length,  -g_width, -g_height,  g_length,
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


    CG.PrismaRectangular = PrismaRectangular;
    return CG;
})(CG || {});

