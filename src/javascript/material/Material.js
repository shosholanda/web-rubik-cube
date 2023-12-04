var CG = (function(CG) {
    let MATERIAL_CACHE = {};
  
    class Material {
      /**
       */
      constructor(gl, vertex_shader_source_code, fragment_shader_source_code) {
        if (MATERIAL_CACHE[this.constructor.name]) {
          this.program = MATERIAL_CACHE[this.constructor.name];
        }
        else {
          this.program = CG.createProgram(
            gl,
            CG.createShader(gl, gl.VERTEX_SHADER, vertex_shader_source_code),
            CG.createShader(gl, gl.FRAGMENT_SHADER, fragment_shader_source_code)
          );
          MATERIAL_CACHE[this.constructor.name] = this.program;
        }
  
        this.attributes = this.getAttributes(gl);
        this.uniforms = this.getUniforms(gl);
      }
  
      /**
       * Función que se encarga de recolectar todos los atributos contenidos en el programa (shaders de vértices y fragmentos)
       * @param {*} gl  El contexto de render de WebGL
       * @returns Regresa un objeto con todos los atributos del programa
       */
      getAttributes(gl) {
        // los atributos se almacenan en un objeto, para acceder a ellos por nombre
        let attributes = {};
        let tmp_attribute_name;
  
        // getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES) devuelve los atributos en los shaders del programa
        for (let i=0, l=gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES); i<l; i++) {
          // gl.getActiveAttrib(this.program, i) es una función que accede a un atributo particular
          // cuando WebGL asigna sus variables les asocia un indice como identificador
          tmp_attribute_name = gl.getActiveAttrib(this.program, i).name;
  
          // en el objeto attributes se almacena el atributo del shader con su nombre, con esto obtenemos una referencia al atributo
          attributes[tmp_attribute_name] = gl.getAttribLocation(this.program, tmp_attribute_name);
        }
  
        return attributes;
      }
  
      /**
       * Función que se encarga de recolectar todos los uniformes contenidos en el programa (shaders de vértices y fragmentos)
       * @param {*} gl  El contexto de render de WebGL
       * @returns Regresa un objeto con todos los uniformes del programa
       */
      getUniforms(gl) {
        // los uniformes se almacenan en un objeto, para acceder a ellos por nombre
        let uniforms = {};
        let tmp_uniform;
  
        // getProgramParameter(this.program, gl.ACTIVE_UNIFORMS) devuelve los uniformes en los shaders del programa
        for (let i=0, l=gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS); i<l; i++) {
          // gl.getActiveUniform(this.program, i) es una función que accede a un uniforme particular
          // cuando WebGL asigna sus variables les asocia un indice como identificador
          tmp_uniform = gl.getActiveUniform(this.program, i);
  
          // para los uniforms es necesario saber su tipo y su tamaño, para llamar la función correcta para enviar la información
          uniforms[tmp_uniform.name] = gl.getUniformLocation(this.program, tmp_uniform.name);
          uniforms[tmp_uniform.name].type = tmp_uniform.type;
          uniforms[tmp_uniform.name].size = tmp_uniform.size;
        }
  
        return uniforms;
      }
  
      /**
       * Función que asigna un valor a un atributo, relacionando un buffer de datos con el atributo
       * @param {*} gl  El contexto de render de WebGL
       * @param {*} name  Nombre del atributo
       * @param {*} bufferData  El buffer de datos con el que se relaciona el atributo
       * @param {*} size  El tamaño o cantidad de elementos que debe tomar el atributo del buffer de datos
       * @param {*} type  El tipo de datos del buffer de datos
       * @param {*} normalized  Parámetro que determina si los datos se normalizan
       * @param {*} stride  Espaciado entre la extracción de datos
       * @param {*} offset  Desplazamiento para obtener los datos
       */
      setAttribute(gl, name, bufferData, size, type, normalized, stride, offset) {
        // se busca que el programa asociado con el material cuenta con el atributo que se quiere cambiar
        let attr = this.attributes[name];
  
        // si el atributo existe, entonces se puede relacionar el atributo con el buffer de datos
        if (attr !== undefined) {
          // se activa el buffer de datos
          gl.bindBuffer(gl.ARRAY_BUFFER, bufferData);
          // se activa el atributo
          gl.enableVertexAttribArray(attr);
          // se indica como se debe tomar la información del buffer
          gl.vertexAttribPointer(attr, size, type, normalized, stride, offset);
        }
      }
  
      /**
       * Función que asigna un valor a un uniforme
       * @param {*} gl  El contexto de render de WebGL
       * @param {*} name  Nombre del uniforme
       * @param {*} data  El valor que se quiere asignar al uniforme
       */
      setUniform(gl, name, data) {
        // se busca que el programa asociado con el material cuenta con el uniforme que se quiere cambiar
        let unif = this.uniforms[name];
  
        // si el uniforme existe entonces se pude asignar el valor
        if (unif) {
          // se obtiene el tipo de dato del uniforme
          let type = unif.type;
          // se obtiene el tamaño del uniforme
          let size = unif.size;
  
          // con el tipo y el tamaño se puede llamar la función adecuada para pasar el valor al uniforme
  
          if (type === gl.FLOAT && size > 1) {
            gl.uniform1fv(unif, data);
          }
          else if (type === gl.FLOAT && size == 1) {
            gl.uniform1f(unif, data);
          }
          else if (type === gl.INT && size > 1) {
            gl.uniform1iv(unif, data);
          }
          else if (type === gl.INT && size == 1) {
            gl.uniform1i(unif, data);
          }
          else if (type === gl.BOOL) {
            gl.uniform1iv(unif, data);
          }
          else if (type === gl.FLOAT_VEC2) {
            gl.uniform2fv(unif, data);
          }
          else if (type === gl.FLOAT_VEC3) {
            gl.uniform3fv(unif, data);
          }
          else if (type === gl.FLOAT_VEC4) {
            gl.uniform4fv(unif, data);
          }
          else if (type === gl.INT_VEC2) {
            gl.uniform2iv(unif, data);
          }
          else if (type === gl.INT_VEC3) {
            gl.uniform3iv(unif, data);
          }
          else if (type === gl.INT_VEC4) {
            gl.uniform4iv(unif, data);
          }
          else if (type === gl.BOOL_VEC2) {
            gl.uniform2iv(unif, data);
          }
          else if (type === gl.BOOL_VEC3) {
            gl.uniform3iv(unif, data);
          }
          else if (type === gl.BOOL_VEC4) {
            gl.uniform4iv(unif, data);
          }
          else if (type === gl.FLOAT_MAT2) {
            gl.uniformMatrix2fv(unif, false, data);
          }
          else if (type === gl.FLOAT_MAT3) {
            gl.uniformMatrix3fv(unif, false, data);
          }
          else if (type === gl.FLOAT_MAT4) {
            gl.uniformMatrix4fv(unif, false, data);
          }
          else if (type === gl.SAMPLER_2D) {
            gl.uniform1i(unif, data);
          }
        }
      }
    }
  
    CG.Material = Material;
    return CG;
  }(CG || {}));