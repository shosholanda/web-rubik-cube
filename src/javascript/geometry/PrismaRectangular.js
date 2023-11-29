var CG = (function(CG) {
    let g_width, g_height, g_length;

    class PrismaRectangular {

	/**
	 * @param {WebGLRenderingContext} gl
	 * @param {Number[]} color
	 * @param {Number} width
	 * @param {Number} height
	 * @param {Number} length
	 * @param {Matrix4} initial_transform
	 */
	constructor(gl, color, width, height, length, initial_transform) {
	    // Valores iniciales
	    this.smooth = false; //??
	    this.color = color;
	    this.initial_transform = initial_transform || new CG.Matrix4();

	    g_width  = (width  || 1)/2;
	    g_height = (height || 1)/2;
	    g_length = (length || 1)/2;


	    // Obtiene los vértices sin repetir (normales suaves)
	    let vertices = this.getVertices();
	    // Obtiene las caras por índices 
	    let faces = this.getFaces();
	    // Obtiene los vértices por caras repetidos
	    let triangulos_repetidos = CG.Util.getFlatVertices(vertices, faces)
	    this.vertices = triangulos_repetidos;

	    // Buffer de vértices
	    this.positionBuffer = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangulos_repetidos), gl.STATIC_DRAW);

	    this.uv = [
		// frente
		0.5,  0.625, 
		0.25, 0.375, 
		0.5,  0.375,
		
		0.5,  0.625, 
		0.25, 0.625, 
		0.25, 0.375, 

		// derecha
		0.75, 0.625, 
		0.5,  0.375, 
		0.75, 0.375,
		
		0.75, 0.625, 
		0.5,  0.625, 
		0.5,  0.375, 

		// atrás
		1,    0.625, 
		0.75, 0.375, 
		1,    0.375,
		
		1,    0.625, 
		0.75, 0.625, 
		0.75, 0.375, 

		// izquierda
		0.25, 0.625, 
		0,    0.375, 
		0.25, 0.375, 
		0.25, 0.625, 
		0,    0.625, 
		0,    0.375, 

		// arriba
		0.5,  0.375, 
		0.25, 0.125, 
		0.5,  0.125, 
		0.5,  0.375, 
		0.25, 0.375, 
		0.25, 0.125, 

		// abajo
		0.5,  0.875, 
		0.25, 0.625, 
		0.5,  0.625, 
		0.5,  0.875, 
		0.25, 0.875, 
		0.25, 0.625, 
	    ];
	    // console.log("UV size: ", this.uv.length);
	    // console.log("Vertex size: ", triangulos_repetidos.length);
	    // Buffer de vértices 
	    this.UVBuffer = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, this.UVBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uv), gl.STATIC_DRAW);
	    
	    // Definir las normales desde el buffer de triángulos repetidos
	    let normals = CG.Util.getFlatNormals(triangulos_repetidos);
	    this.normalBuffer = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

	    this.num_elements = faces.length;
	}

	/** Ya no vamos x2
	 */
	draw(gl, positionAttributeLocation, normalAttributeLocation, colorUniformLocation, PVM_matrixLocation, VM_matrixLocation, projectionViewMatrix, viewMatrix, texture, textureUniform, texcoordAttribute, wired) {

	    // buffer de vértices repetidos
	    gl.enableVertexAttribArray(positionAttributeLocation);
	    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
	    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

	    // Buffer de los vértices en el buffer UV
	    gl.bindBuffer(gl.ARRAY_BUFFER, this.UVBuffer);
	    gl.enableVertexAttribArray(texcoordAttribute);
	    gl.vertexAttribPointer(texcoordAttribute, 2, gl.FLOAT, false, 0, 0);

	    gl.activeTexture(gl.TEXTURE0);
	    gl.bindTexture(gl.TEXTURE_2D, texture);
	    gl.uniform1i(textureUniform, 0);

	    // buffer de normales con triángulos repetidos (flat)
	    gl.enableVertexAttribArray(normalAttributeLocation);
	    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
	    gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);

	    gl.uniform4fv(colorUniformLocation, this.color);

	    let viewModelMatrix = CG.Matrix4.multiply(viewMatrix, this.initial_transform);
	    gl.uniformMatrix4fv(VM_matrixLocation, false, viewModelMatrix.toArray());

	    let projectionViewModelMatrix = CG.Matrix4.multiply(projectionViewMatrix, viewModelMatrix);
	    gl.uniformMatrix4fv(PVM_matrixLocation, false, projectionViewModelMatrix.toArray());
	    
	    gl.drawArrays(wired, 0, this.num_elements);
	}

	getVertices() {
	    let vertices = [];
	    for (let i = 0; i < 2; i++){
		for (let j = 0; j < 2; j++){
		    for (let k = 0; k < 2; k++){
			vertices.push((-1)**i*g_width,
				      (-1)**j*g_height,
				      (-1)**k*g_length);
		    }
		}
	    }
	    // console.log("Total vértices sin repetir:", vertices.length);
	    // console.log(CG.Util.print_tuplas(vertices));
	    return vertices;
	}

	

	getFaces() {
	    return [
		2, 1, 3,
		2, 0, 1,

		1, 4, 5,
		1, 0, 4,

		5, 6, 7,
		5, 4, 6,

		6, 3, 7,
		6, 2, 3,

		4, 2, 6,
		4, 0, 2,

		3, 5, 7,
		3, 1, 5,
	    ];
	}

    }


    CG.PrismaRectangular = PrismaRectangular;
    return CG;
})(CG || {});

