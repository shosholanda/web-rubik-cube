window.addEventListener("load", async function(evt) {

	// El canvas
    let canvas = document.getElementById("the_canvas");
	// Botón de revolver
	let scramble = document.getElementById("scramble")
    const gl = canvas.getContext("webgl");
    if (!gl) throw "WebGL no soportado";
   
    /////////////////////////////////////////
	//  Luz
    let lx = 3;
    let ly = 3;
    let lz = 3;

	let luz = new CG.Vector4(lx, ly, lz, 1);
	let lightPosition = luz
	let lightPosView;
	//////////////////////////////////////////


	/////////////////////////////////////////
	//  Camara
	let aspect = gl.canvas.width/gl.canvas.height;
	let zNear = 0.1;
	let zFar = 2000;
	let projectionMatrix = CG.Matrix4.perspective(75*Math.PI/180, aspect, zNear, zFar);

    let camera = new CG.TrackballCamera(
	new CG.Vector3(5, 5, 5),
	new CG.Vector3(0, 0, 0),
	new CG.Vector3(0, 1, 0)
    );

    let viewMatrix;
	//////////////////////////////////////////
	
    /////////////////////////////////////////
	//  Cargar texturas
	let blue = await CG.loadImage("../../textures/img/Blue.png");
	let red = await CG.loadImage("../../textures/img/Red.png");
	let green = await CG.loadImage("../../textures/img/Green.png");
	let orange = await CG.loadImage("../../textures/img/Orange.png");
	let white = await CG.loadImage("../../textures/img/White.png");
	let yellow = await CG.loadImage("../../textures/img/Yellow.png");
	let gray = await CG.loadImage("../../textures/img/Gray.png");
	let colors = {
		'blue': blue,
		'red': red,
		'green': green,
		'orange': orange,
		'white': white,
		'yellow': yellow,
		'gray': gray
	}
	
	let rubik = new CG.Rubik(gl, colors);

	//////////////////////////////////////////

	//////////////////////////////////////////
    // iniciamos todo lo necesario para dibujar en el canvas de WebGL
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.DEPTH_TEST);
    
    // se encapsula el código de dibujo en una función
    function draw() {
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
		viewMatrix = camera.getMatrix();

		lightPosition = camera.getPos();
		lightPosView = viewMatrix.multiplyVector(lightPosition);
		
		// Solo dibujamos 1 cubo rubik
		rubik.drawPieces(
			gl, 
			projectionMatrix, 
			viewMatrix, 
			[lightPosView.x, lightPosView.y, -lightPosView.z]
		)
	  }

    draw();

	// Registrar eventos de movimiento de cámara
	camera.registerMouseEvents(canvas, draw);
	// Registrar eventos de movimiento de caras del cubo
	rubik.registerCubeEvents(draw);
	
	// Botón de revolver
	scramble.addEventListener("click", function() {
		rubik.scramble()
		draw()
	})
	
});