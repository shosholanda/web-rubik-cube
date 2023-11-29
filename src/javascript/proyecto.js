window.addEventListener("load", async function(evt) {
    // se obtiene una referencia al canvas
    let canvas = document.getElementById("the_canvas");

    const gl = canvas.getContext("webgl");

    if (!gl) throw "WebGL no soportado";


    // Crear shaders y programa
    let vertexShaderSource = document.getElementById("vertex-shader").text;
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);

    let diffuseShaderSource = document.getElementById("fragment-shader").text;
    let diffuseShader = createShader(gl, gl.FRAGMENT_SHADER, diffuseShaderSource);

    let specularShaderSource = document.getElementById("specular").text;
    let specularShader  = createShader(gl, gl.FRAGMENT_SHADER, specularShaderSource);

    let diffuseProgram = createProgram(gl, vertexShader, diffuseShader);
    let specularProgram = createProgram(gl, vertexShader, specularShader);

    let program = specular.checked ? specularProgram : diffuseProgram
    
    // se construye una referencia al attribute "a_position" definido en el shader
    let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    //// NOOOOOOOOOOOOOOOOOOOOO POR QUEEEEEEEEE NO LO LEEEEEEEEEEEEEEEEE
    let normalAttributeLocation = gl.getAttribLocation(program, "a_normal");
    // let normalAttributeLocation = 1;
    let colorUniformLocation = gl.getUniformLocation(program, "u_color");
    let lightUniformLocation = gl.getUniformLocation(program, "u_light_position");
    let PVM_matrixLocation = gl.getUniformLocation(program, "u_PVM_matrix");
    let VM_matrixLocation = gl.getUniformLocation(program, "u_VM_matrix");
    
    let texcoordAttribute = gl.getAttribLocation(program, "a_texcoord");
    // Ah pero este sí le pone el índice 2 nojao
    let textureUniform = gl.getUniformLocation(program, "u_texture");

    // Posicion de la luz
    let lx = 0;
    let ly = 3;
    let lz = 0;

    let camera = new CG.TrackballCamera(
	new CG.Vector3(0, 11, 7),
	new CG.Vector3(0, 0, 0),
	new CG.Vector3(0, 1, 0)
    );

    let viewMatrix;

    // se construye la matriz de proyección en perspectiva
    let projectionMatrix = CG.Matrix4.perspective(75*Math.PI/180, canvas.width/canvas.height, 1, 2000);

    let lightPosition = new CG.Vector4(lx, ly, lz, 1);
    let lightPosTrans;
    

    // se crean y posicionan los modelos geométricos, uno de cada tipo
    let geometry = [
	new CG.PrismaRectangular(
	    gl, 
	    [1, 0.6, 0, 1], 
	    2, 3, 4, 
	    CG.Matrix4.translate(new CG.Vector3(-5, 0, 5))
		)
    ];

    let textures = [];
    let image;
    //Textura de dado
    image = await loadImage("../../textures/img/Blue.png");
    
    textures[0] = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textures[0]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB,gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    
    /* // Textura de barril
    image = await loadImage("textures/barril.jpg");
    textures[1] = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textures[1]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB,gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);

    // Textura de mundo
    image = await loadImage("textures/earth.jpg");
    textures[2] = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textures[2]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB,gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    // Textura de madera
    image = await loadImage("textures/wood.jpg");
    textures[3] = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textures[3]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB,gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); */


    // iniciamos todo lo necesario para dibujar en el canvas de WebGL
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.DEPTH_TEST);
    
    // se encapsula el código de dibujo en una función
    function draw() {

		/* Preludio */
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		
		program = specular.checked ? specularProgram : diffuseProgram
		positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		// normalAttributeLocation = gl.getAttribLocation(program, "a_normal");
		// NOOOOOOOOOOOOOOOOOOOOOOOOOO Por queeeeeeeeeee no lo leee
		normalAttributeLocation = 1;
		colorUniformLocation = gl.getUniformLocation(program, "u_color");
		lightUniformLocation = gl.getUniformLocation(program, "u_light_position");
		PVM_matrixLocation = gl.getUniformLocation(program, "u_PVM_matrix");
		VM_matrixLocation = gl.getUniformLocation(program, "u_VM_matrix");
		texcoordAttribute = gl.getAttribLocation(program, "a_texcoord");
		textureUniform = gl.getUniformLocation(program, "u_texture");
		

		// La posición actual de la camara antes de dibujar
		viewMatrix = camera.getMatrix();
		// La posición de la luz también hay que transformarla.
		lightPosTrans = viewMatrix.multiplyVector(lightPosition);
		gl.uniform3f(lightUniformLocation, lightPosTrans.x, lightPosTrans.y, lightPosTrans.w);
		// gl.uniform3f(lightUniformLocation, lightPosition.x, lightPosition.y, lightPosition.w);


		// se itera sobre cada objeto geométrico definido
		for (let i=0; i<geometry.length; i++) {
			// se dibuja la geometría
			geometry[i].draw(
				gl, // referencia al contexto de render de WebGL
				positionAttributeLocation, // referencia a: attribute vec4 a_position;
				normalAttributeLocation,
				colorUniformLocation, // referencia a: uniform vec4 u_color;
				PVM_matrixLocation, // referencia a: uniform mat4 u_PVM_matrix;
				VM_matrixLocation,
				projectionMatrix,
				viewMatrix, // la matriz de transformación de la vista y proyección
				texture,
				textureUniform,
				texcoordAttribute,
				this.wired
			);

		}
    }

    // se dibujan los objetos
    draw();

    let initial_mouse_position = null;

    /**
     * Código que se ejecuta al presionar el botón derecho del mouse
     * Obtiene la posición de pixeles que se ejecutó y después espera a
     * movimiento del mouse.
     */
    canvas.addEventListener("mousedown", (evt) => {
	initial_mouse_position = getMousePositionInCanvas(evt);
	window.addEventListener("mousemove", mousemove);
    });

    /**
     * Código que se ejecuta al soltar el click.
     * Si no se hizo click antes, no hace nada.
     * Si sí, entonces se guarda la ultima posición que tenía la cámara y se 
     * ajusta para que se guarde en la vista actual. Se deja de escuchar el 
     * movimiento del mouse.
     */
    window.addEventListener("mouseup", (evt) => {
		if (initial_mouse_position != null) {
			camera.finishMove(initial_mouse_position, getMousePositionInCanvas(evt));
			window.removeEventListener("mousemove", mousemove);
		}
		initial_mouse_position = null
    });

    /**
     * Por cada pixel que se mueve el mouse, se redibuja toda la escena
     */
    function mousemove(evt) {
		camera.rotate(initial_mouse_position, getMousePositionInCanvas(evt));
		draw();
    }

    /* Obtiene las coordenadas reales de cuando se hace click */
    function getMousePositionInCanvas(evt) {
	const rect = canvas.getBoundingClientRect();

	return { 
	    	x: evt.clientX - rect.left, 
	    	y: evt.clientY - rect.top 
		};
    }
});





//////////////////////////////////////////////////////////
// Funciones de utilería para la construcción de shaders
//////////////////////////////////////////////////////////
/**
 * Función que crear un shader, dado un contexto de render, un tipo y el código fuente
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
 * Función que toma un shader de vértices con uno de fragmentos y construye un programa
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
}

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
