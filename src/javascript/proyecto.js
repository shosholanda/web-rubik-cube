window.addEventListener("load", async function(evt) {

    let canvas = document.getElementById("the_canvas");

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
	new CG.Vector3(3, 3, 3),
	new CG.Vector3(0, 0, 0),
	new CG.Vector3(0, 1, 0)
    );

    let viewMatrix;
	//////////////////////////////////////////
	
    /////////////////////////////////////////
	//  Crear objetos con materiales
	let blue = await CG.loadImage("../../textures/img/Blue.png");
	let red = await CG.loadImage("../../textures/img/Red.png");
	let green = await CG.loadImage("../../textures/img/Green.png");
	let orange = await CG.loadImage("../../textures/img/Orange.png");
	let white = await CG.loadImage("../../textures/img/White.png");
	let yellow = await CG.loadImage("../../textures/img/Yellow.png");
	
	let color = [1, 1, 1, 1]
	let pos = CG.Matrix4.translate(new CG.Vector3(1, 0, 1)); //Coordenadas del mundo

    let geometry = [
		new CG.Cubie(
			gl,
			new CG.TextureMaterial(gl, [green, red, blue, orange, yellow, white]),
			new CG.Matrix4()
		),

		new CG.Center(
			gl,
			new CG.TextureMaterial(gl, [green, red, blue, orange, yellow, white]),
			pos 
		),
		new CG.Teapot(
			gl,
			new CG.DiffuseMaterial(gl),
			[.5, .5, 0, 1],
			CG.Matrix4.translate(new CG.Vector3(-5, 0, -2))
		)
		/* 
		new CG.Cubie(
			gl,
			new CG.TextureMaterial(gl, [green, red, blue, orange, yellow, white]),
			new CG.Matrix4()
		),
		new CG.Cubie(
			gl,
			new CG.TextureMaterial(gl, [green, red, blue, orange, yellow, white]),
			CG.Matrix4.translate(new CG.Vector3(-1, -1, -1))
		), */
		
    ];

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
		
		for (let i=0; i<geometry.length; i++) {
		  geometry[i].draw(
			gl, 
			projectionMatrix, 
			viewMatrix, 
			[lightPosView.x, lightPosView.y, -lightPosView.z] //No entiendo porqué es con -
		  ); 
		}
	  }

    // se dibujan los objetos
    draw();

	camera.registerMouseEvents(canvas, draw);
	geometry[1].registerCubeEvents(draw);
});