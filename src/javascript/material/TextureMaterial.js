var CG = (function(CG) {

    class TextureMaterial extends CG.Material {
      /**
       */
      constructor(gl, image) {
        let vertex_shader = `
          attribute vec4 a_position;
          attribute vec2 a_texcoord;
          
          uniform mat4 u_PVM_matrix;
          
          varying vec2 v_texcoord;
      
          void main() {
            gl_Position = u_PVM_matrix * a_position;
      
            v_texcoord = a_texcoord;
          }`;
        let fragment_shader = `
          precision mediump float;
  
          varying vec2 v_texcoord;
          uniform sampler2D u_texture;
      
          void main() {
            gl_FragColor = texture2D(u_texture, v_texcoord);
          }`;
  
        super(gl, vertex_shader, fragment_shader);
        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
  
        if (CG.isPowerOf2(image.width) && CG.isPowerOf2(image.height)) {
          gl.generateMipmap(gl.TEXTURE_2D);
        }
        else {
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
      }
    }
  
    CG.TextureMaterial = TextureMaterial;
    return CG;
  }(CG || {}));