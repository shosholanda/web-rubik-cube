var CG = (function(CG) {

    /* Funciones útiles para reutilizar */

	/**
   * Lee una images a partir de su dirección y devuelve una Promesa
   * @param {*} url 
   * @returns Promise Devuelve una promesa asociada la imagen
   */
	function loadImage(url) {
		return new Promise((resolve, reject) => {
		  // se crea una imagen
		  const img = new Image();
		  // se asocia al evento de carga de la imagen la resolución de la promesa
		  // resolve(img) es una función de la Promesa que eventualmente devuelve la imagen
		  img.addEventListener("load", () => resolve(img));
		  // se asocia al evento de error de la imagen el rechazo de la promesa
		  // reject(err) es una función de la Promesa que eventualmente devuelve un error
		  img.addEventListener("error", (err) => reject(err));
		  // se inicia la carga de la imagen
		  img.src = url;
		});
	  }

	  /**
   * Ejemplo isPowerOf2(5)
   * 00000101  <- 5
   * 00000100  <- 4
   * 00000100  <- resultado un valor diferente de 0
   * Ejemplo isPowerOf2(32)
   * 00100000  <- 32
   * 00011111  <- 31
   * 00000000  <- resultado 0
   */
  function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
  }

  /**
   * Obtiene las coordenadas reales dentro del elemento de cuando se hace click 
   */
  function getMousePositionInElement(evt, element) {
    const rect = element.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;
    return { x: x, y: y };
  }

	function print_tuplas(v){
		let s = "Vertices";
		for (let i = 0; i < v.length; i++){
		if (i%3 == 0) s+= "\nv" + (i/3) + ": "
		s+= v[i] + ", ";
		}
		return s;
	}

	/**
   *
   */
	function createShader(gl, type, source) {
		let shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
	
		let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	
		if (success) {
		  return shader;
		}
	  
		console.log(gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
	  }
	
	  /**
	   *
	   */
	  function createProgram(gl, vertexShader, fragmentShader) {
		let program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);
	
		let success = gl.getProgramParameter(program, gl.LINK_STATUS);
	
		if (success) {
		  return program;
		}
	  
		console.log(gl.getProgramInfoLog(program));
		gl.deleteProgram(program);
	  }

	/**
	 * Nos regresa triángulos con vértices repetidos
	 */
	function getFlatVertices(vertices, faces){
		let flat = [];
		for (let i = 0; i < faces.length; i++){
		flat.push(vertices[faces[i]*3],
			vertices[faces[i]*3+1],
			vertices[faces[i]*3+2]);
		}
		// console.log("Triángulos repetidos. Total de vértices ", flat.length);
		// console.log(this.print_tuplas(flat));
		return flat;
	}

    CG.loadImage = loadImage;
  CG.isPowerOf2 = isPowerOf2;
  CG.getMousePositionInElement = getMousePositionInElement;
  CG.createShader = createShader;
  CG.createProgram = createProgram;
  CG.getFlatVertices = getFlatVertices;
    return CG;

}) (CG || {});
