var CG = (function(CG) {

    class GenericGeometry {
      /**
       * 
       */
      constructor(
        gl, 
        material = new CG.DiffuseMaterial(gl),
        color = [1,0,0,1], 
        initial_transform = new CG.Matrix4()
      ) {
        this.smooth = false;
        this.material = material;
        this.color = color;
        this.initial_transform = initial_transform;
        this.flatNumElements = 0;
        this.smoothNumElements = 0;
  
        // si la función getFaces existe entonces la geometría esta definida con indices
        if (this.getFaces) {
          let smooth_vertices = this.getVertices();
  
          let faces = this.getFaces();
          let flat_vertices = [];
          for (let i=0; i<faces.length; i++) {
            flat_vertices.push(
              smooth_vertices[faces[i]*3],
              smooth_vertices[faces[i]*3 +1],
              smooth_vertices[faces[i]*3 +2]
            );
          }
  
          // triángulos ordenados en el buffer
          this.flatPositionBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, this.flatPositionBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(flat_vertices), gl.STATIC_DRAW);
  
          // triángulos indexados
          this.smoothPositionBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, this.smoothPositionBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(smooth_vertices), gl.STATIC_DRAW);
  
          // los índices correspondientes
          this.indicesBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faces), gl.STATIC_DRAW);
  
          // normales para drawArray
          let flat_normals = this.getFlatNormals(flat_vertices);
          this.flatNormalBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, this.flatNormalBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(flat_normals), gl.STATIC_DRAW);
  
          // normales para drawElements
          let smooth_normals = this.getSmoothNormals(smooth_vertices, faces);
          this.smoothNormalBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, this.smoothNormalBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(smooth_normals), gl.STATIC_DRAW);
  
          // número de elementos en el buffer de datos plano
          this.flatNumElements = flat_vertices.length/3;
  
          // número de elementos en el buffer de datos suavizado
          this.smoothNumElements = faces.length;
        }
        // si la función getFaces no existe entonces el objeto esta definido directamente con un arreglo de vértices
        else {
          let vertices = this.getVertices();
          let normals = this.getNormals(vertices);
  
          // creación del buffer de datos del prisma
          this.flatPositionBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, this.flatPositionBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  
          // creación del buffer de normales del prisma
          this.flatNormalBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, this.flatNormalBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  
          // número de elementos que define el prisma
          this.flatNumElements = vertices.length/3;
        }
  
        this.UVBuffer = null;
        // se obtienen las coordenadas de textura si es que existe la función getUVCoords
        if (this.getUVCoords) {
          let uvCoords = this.getUVCoords();
          this.UVBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, this.UVBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvCoords), gl.STATIC_DRAW);
        }
      }
  
      /**
       * 
       * @param {Boolean} isSmooth  Parámetro para cambiar entre una representación booleana y una plana
       */
      setSmooth(isSmooth) {
        this.smooth = isSmooth;
      }
  
      /**
       * 
       * @param {*} gl  El contexto de render de WebGL
       * @param {*} projectionMatrix  Matriz de transformación de proyección
       * @param {*} viewMatrix  Matriz de transformación de la vista
       */
      draw(gl, projectionMatrix, viewMatrix, light_pos) {
        gl.useProgram(this.material.program);
  
        // el color
        this.material.setUniform(gl, "u_color", this.color);
  
        // la luz
        this.material.setUniform(gl, "u_light_position", light_pos);
  
        // el color de la luz
        this.material.setUniform(gl, "u_light_color", [1,1,1]);
  
        // parámetro de brillo del modelo
        this.material.setUniform(gl, "u_shininess", this.material.shininess);
  
        
        // VM_matrixLocation
        let viewModelMatrix = CG.Matrix4.multiply(viewMatrix, this.initial_transform);
        this.material.setUniform(gl, "u_VM_matrix", viewModelMatrix.toArray());
  
        // PVM_matrixLocation
        let projectionViewModelMatrix = CG.Matrix4.multiply(projectionMatrix, viewModelMatrix);
        this.material.setUniform(gl, "u_PVM_matrix", projectionViewModelMatrix.toArray());
  
        // si es suavizado utilizamos los datos indexados
        if (this.smooth && (this.smoothNumElements>0)) {
          // el buffer de posiciones
          this.material.setAttribute(gl, "a_position", this.smoothPositionBuffer, 3, gl.FLOAT, false, 0, 0);
  
          // el buffer de normales
          this.material.setAttribute(gl, "a_normal", this.smoothNormalBuffer, 3, gl.FLOAT, false, 0, 0);
  
          // enviamos la información de las coordenadas de textura y la textura
          if (this.UVBuffer || this.material.texture) {
            this.material.setAttribute(gl, "a_texcoord", this.UVBuffer, 2, gl.FLOAT, false, 0, 0);
  
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.material.texture);
            this.material.setUniform(gl, "u_texture", 0);
          }
  
          // dibujado
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
          gl.drawElements(gl.TRIANGLES, this.smoothNumElements, gl.UNSIGNED_SHORT, 0);
        }
        // si es plano utilizamos los datos consecutivos
        else {
          // el buffer de posiciones
          this.material.setAttribute(gl, "a_position", this.flatPositionBuffer, 3, gl.FLOAT, false, 0, 0);
  
          // el buffer de normales
          this.material.setAttribute(gl, "a_normal", this.flatNormalBuffer, 3, gl.FLOAT, false, 0, 0);
  
          // enviamos la información de las coordenadas de textura y la textura
          if (this.UVBuffer && this.material.textures) {
            for (let i = 0; i < this.material.textures.length; i++){

              this.material.setAttribute(gl, "a_uv" + i, this.UVBuffer, 2, gl.FLOAT, false, 0, 0);
    
              gl.activeTexture(gl.TEXTURE0 + i);
              gl.bindTexture(gl.TEXTURE_2D, this.material.textures[i]);
              this.material.setUniform(gl, "u_texture" + i, 0);
            }
          }
  
          // dibujado
          gl.drawArrays(gl.TRIANGLES, 0, this.flatNumElements);
        }
      }
  
      /**
	 * Nos regresa las normales de los vértices q comparten la misma normal (un triángulo)
	 */
      getFlatNormals(vertices) {
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
  
      /* Nos regresa el promedio de las normales que comparten los vértices de un triángulo 
	* (smooth)
	*/
      getSmoothNormals(vertices, faces) {
        let normals = [];
        let v1 = new CG.Vector3();
        let v2 = new CG.Vector3();
        let v3 = new CG.Vector3();
        let i1, i2, i3;
        let tmp = new CG.Vector3();
        let n;
      
        for (let i=0; i<faces.length; i+=3) {
          i1 = faces[i  ]*3;
          i2 = faces[i+1]*3;
          i3 = faces[i+2]*3;
      
          v1.set( vertices[i1], vertices[i1 + 1], vertices[i1 + 2] );
          v2.set( vertices[i2], vertices[i2 + 1], vertices[i2 + 2] );
          v3.set( vertices[i3], vertices[i3 + 1], vertices[i3 + 2] );
          n = CG.Vector3.cross(CG.Vector3.subtract(v1, v2), CG.Vector3.subtract(v2, v3)).normalize();
      
          tmp.set( normals[i1], normals[i1+1], normals[i1+2] );
          tmp = CG.Vector3.add(tmp, n);
          normals[i1  ] = tmp.x;
          normals[i1+1] = tmp.y;
          normals[i1+2] = tmp.w;
      
          tmp.set( normals[i2], normals[i2+1], normals[i2+2] );
          tmp = CG.Vector3.add(tmp, n);
          normals[i2  ] = tmp.x;
          normals[i2+1] = tmp.y;
          normals[i2+2] = tmp.w;
      
          tmp.set( normals[i3], normals[i3+1], normals[i3+2] );
          tmp = CG.Vector3.add(tmp, n);
          normals[i3  ] = tmp.x;
          normals[i3+1] = tmp.y;
          normals[i3+2] = tmp.w;
        }
      
        for (let i=0; i<normals.length; i+=3) {
          tmp.set(normals[i], normals[i+1], normals[i+2]);
          tmp = tmp.normalize();
          normals[i  ] = tmp.x;
          normals[i+1] = tmp.y;
          normals[i+2] = tmp.w;
        }
      
        return normals;
      }
    }
  
    CG.GenericGeometry = GenericGeometry;
    return CG;
  }(CG || {}));