var CG = (function(CG) {

    class TextureMaterial extends CG.Material {
      /**
       */
      constructor(gl, image) {
        let vertex_shader = `
          attribute vec4 a_position;

          //Coordenadas UV de las texturas
          attribute vec3 a_texcoord;  
          
          uniform mat4 u_PVM_matrix;
          
          // Variables para el shader de fragmentos
          varying vec2 v_texcoord;
          varying float v_textureIndex;
      
          void main() {
            gl_Position = u_PVM_matrix * a_position;
      
            v_texcoord = a_texcoord.xy;
            v_textureIndex = a_texcoord.z;

          }`;
        let fragment_shader = `
          precision mediump float;
  
          // Variables del shader de vertices
          varying vec2 v_texcoord;
          varying float v_textureIndex;

          // Texturas 
          uniform sampler2D u_texture0;
          uniform sampler2D u_texture1;
          uniform sampler2D u_texture2;
          uniform sampler2D u_texture3;
          uniform sampler2D u_texture4;
          uniform sampler2D u_texture5;
      
          void main() {
            vec4 color;
            // como v_textureIndex es un varying estos valores se interpolan, entonces por alguna razón los valores no se mantienen exactamente iguales, por lo que no se puede comparar v_textureIndex == 0.0, sino que hay que ver que este dentro de un intervalo

            if ((v_textureIndex) >= 0.0 && (v_textureIndex) < 0.9) {
              color = texture2D(u_texture0, v_texcoord);
            }
            else if ((v_textureIndex) >= 0.9 && (v_textureIndex) < 1.9) {
              color = texture2D(u_texture1, v_texcoord);
            }
            else if ((v_textureIndex) >= 1.9 && (v_textureIndex) < 2.9) {
              color = texture2D(u_texture2, v_texcoord);
            }
            else if ((v_textureIndex) >= 2.9 && (v_textureIndex) < 3.9) {
              color = texture2D(u_texture3, v_texcoord);
            }
            else if ((v_textureIndex) >= 3.9 && (v_textureIndex) < 4.9) {
              color = texture2D(u_texture4, v_texcoord);
            }
            else if ((v_textureIndex) >= 4.9 && (v_textureIndex) < 5.9) {
              color = texture2D(u_texture5, v_texcoord);
            }

            //gl_FragColor = vec4(v_textureIndex/6.0, 0, 0, 1);
            gl_FragColor = color;

          }`;
  
        super(gl, vertex_shader, fragment_shader);

        this.images = []
        this.textures = []

        // Leer varias texturas
        if (image.length){
          for (let i = 0; i < image.length; i++)
            this.images.push(image[i]);
        } else {
          this.images.push(image);
        }

        for (let i = 0; i < this.images.length; i++){

          let texture = gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, this.images[i]);
          
          if (CG.isPowerOf2(this.images[i].width) && CG.isPowerOf2(this.images[i].height)) {
            gl.generateMipmap(gl.TEXTURE_2D);
          }
          else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          }
          this.textures.push(texture);
        }
        //console.log(this.textures);
      }
    }
  
    CG.TextureMaterial = TextureMaterial;
    return CG;
  }(CG || {}));