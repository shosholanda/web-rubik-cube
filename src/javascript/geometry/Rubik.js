var CG = (function(CG) {

    /* Cubies en 3 dimensiones */
    

    /**
     * Construye un Cubo rubik 3x3 usando el cubo unitario de prisma rectangular.
     * Se piensa usar la geometría Cubie para un suavizado de esquinas
     */
    
    class Rubik {

	 /**
     * 
     */
	 constructor(gl, colors) {
		this.yellow_center = new CG.Cubie(
            gl, 
            new CG.TextureMaterial(gl, colors),
			CG.Matrix4.translate(new CG.Vector3(0, 1, 0))
		);
        this.red_center = new CG.Cubie(
            gl, 
            new CG.TextureMaterial(gl, colors),
			CG.Matrix4.translate(new CG.Vector3(-2, -2, -2))
		);
        this.green_center = new CG.Cubie(
            gl, 
            new CG.TextureMaterial(gl, colors),
			CG.Matrix4.translate(new CG.Vector3(-2, -2, -2))
		);
        this.orange_center = new CG.Cubie(
            gl, 
            new CG.TextureMaterial(gl, colors),
			CG.Matrix4.translate(new CG.Vector3(-2, -2, -2))
		);
        this.blue_center = new CG.Cubie(
            gl, 
            new CG.TextureMaterial(gl, colors),
			CG.Matrix4.translate(new CG.Vector3(-2, -2, -2))
		);
        this.white_center = new CG.Cubie(
            gl, 
            new CG.TextureMaterial(gl, colors),
			CG.Matrix4.translate(new CG.Vector3(0, 0, 0))
		);
	  }
	}


    CG.Rubik = Rubik;
    return CG;
})(CG || {});

