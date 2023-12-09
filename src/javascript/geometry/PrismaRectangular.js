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
     * Se sobre escribe la función de dibujar de GenericGeometry para soportar las múltiples texturas
     */
	draw(gl, projectionMatrix, viewMatrix, light_pos) {
		// SUPER
		gl.useProgram(this.material.program);
		this.material.setUniform(gl, "u_color", this.color);
		this.material.setUniform(gl, "u_light_position", light_pos);
		this.material.setUniform(gl, "u_light_color", [1,1,1]);
		this.material.setUniform(gl, "u_shininess", this.material.shininess);
		let viewModelMatrix = CG.Matrix4.multiply(viewMatrix, this.initial_transform);
		this.material.setUniform(gl, "u_VM_matrix", viewModelMatrix.toArray());
		let projectionViewModelMatrix = CG.Matrix4.multiply(projectionMatrix, viewModelMatrix);
		this.material.setUniform(gl, "u_PVM_matrix", projectionViewModelMatrix.toArray());
		this.material.setAttribute(gl, "a_position", this.flatPositionBuffer, 3, gl.FLOAT, false, 0, 0);
		this.material.setAttribute(gl, "a_normal", this.flatNormalBuffer, 3, gl.FLOAT, false, 0, 0);
  
		// Lo único que cambia es que el uv tiene 3 indices (u, v) + #tex
		// Y vamos iterando a través de las texturas anteriormente cargadas.
		if (this.UVBuffer || this.material.texture) {
		  this.material.setAttribute(gl, "a_texcoord", this.UVBuffer, 3, gl.FLOAT, false, 0, 0);
  
		  for (let i=0; i<this.material.textures.length; i++) {
			gl.activeTexture(gl["TEXTURE"+i]);
			gl.bindTexture(gl.TEXTURE_2D, this.material.textures[i]);
			this.material.setUniform(gl, "u_texture"+i, i);
		  }
		}
  
		// dibujado
		gl.drawArrays(gl.TRIANGLES, 0, this.flatNumElements);
	  }
  
	  /**
	   */
	  getVertices() {
		let v = [
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
		this.vertices = v;
		return v;
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

	  getUVCoords(){
		let uv = [
			0, 0,
			1, 1,
			1, 0,

			0, 0,
			1, 0,
			1, 1,
		]
		let uvs = []
		for (let i = 0; i < 6; i++){
			for (let j = 0; j < uv.length; j+=2){
				uvs.push(uv[j], uv[j+1], i)
			}
		}
		return uvs
	  }
	}


    CG.PrismaRectangular = PrismaRectangular;
    return CG;
})(CG || {});

