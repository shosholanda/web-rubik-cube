var CG = (function(CG) {

    class TextureMaterial extends CG.Material {
      /**
       */
      constructor(gl, image) {
        let vertex_shader = `
          attribute vec4 a_position;

          //Coordenadas UV de las texturas
          attribute vec2 a_uv0;  
          attribute vec2 a_uv1;
          attribute vec2 a_uv2;
          
          uniform mat4 u_PVM_matrix;
          
          // Variables para el shader de fragmentos
          varying vec2 v_texcoord0;
          varying vec2 v_texcoord1;
          varying vec2 v_texcoord2;
      
          void main() {
            gl_Position = u_PVM_matrix * a_position;
      
            v_texcoord0 = a_uv0;
            v_texcoord1 = a_uv1;
            v_texcoord2 = a_uv2;

          }`;
        let fragment_shader = `
          precision mediump float;
  
          // Variables del shader de fragmentos
          varying vec2 v_texcoord0;
          varying vec2 v_texcoord1;
          varying vec2 v_texcoord2;

          // Texturas 
          uniform sampler2D u_texture0;
          uniform sampler2D u_texture1;
          uniform sampler2D u_texture2;
      
          void main() {

            // Coordenadas aplicadas
            vec4 color0 = texture2D(u_texture0, v_texcoord0);
            vec4 color1 = texture2D(u_texture1, v_texcoord1);
            vec4 color2 = texture2D(u_texture2, v_texcoord2);


            gl_FragColor = texture2D(u_texture0, v_texcoord0);
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
        console.log(this.textures);
      }
    }
  
    CG.TextureMaterial = TextureMaterial;
    return CG;
  }(CG || {}));