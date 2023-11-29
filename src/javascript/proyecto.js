window.addEventListener("load", async function(evt) {

    let canvas = document.getElementById("the_canvas");

    const gl = canvas.getContext("webgl");

    if (!gl) throw "WebGL no soportado";


   
    /////////////////////////////////////////
	//  Luz
    let lx = 0;
    let ly = 3;
    let lz = 0;

	let luz = new CG.Vector4(lx, ly, lz, 1);
	let lightPosition = luz
	let lightPosView;
	//////////////////////////////////////////


	/////////////////////////////////////////
	//  Camara
	let aspect = gl.canvas.width/gl.canvas.height;
	let zNear = 1;
	let zFar = 2000;
	let projectionMatrix = CG.Matrix4.perspective(75*Math.PI/180, aspect, zNear, zFar);

    let camera = new CG.TrackballCamera(
	new CG.Vector3(0, 11, 7),
	new CG.Vector3(0, 0, 0),
	new CG.Vector3(0, 1, 0)
    );

    let viewMatrix;
	//////////////////////////////////////////
	
    /////////////////////////////////////////
	//  Crear objetos con materiales
	let image;
	image = await CG.loadImage("../../textures/img/Blue.png");
	

    let geometry = [
	new CG.PrismaRectangular(
	    gl, 
		1, 1, 1
		)
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
	
		lightPosView = viewMatrix.multiplyVector(lightPosition);
	
		for (let i=0; i<geometry.length; i++) {
		  geometry[i].draw(
			gl, 
			projectionMatrix, 
			viewMatrix, 
			[lightPosView.x, lightPosView.y, lightPosView.z]
		  );
		}
	  }

    // se dibujan los objetos
    draw();

	camera.registerMouseEvents(canvas, draw);
});