var CG = (function(CG) {

    /* Cubies en 3 dimensiones */
    let pieces = []
    let up = [] 
    let down = []
    let front = []
    let back = []
    let right = []
    let left = []
    let mid_x = []
    let mid_y = []
    let mid_z = []

    /**
     * Construye un Cubo rubik 3x3 usando los 3 tipos de piezas
     * Se piensa usar la geometría Cubie para un suavizado de esquinas
     */
    
    class Rubik extends CG.Cubie{

	 /**
     * 
     */
	 constructor(gl, colors) {
        // super pq is no no compila
        super(gl, new CG.TextureMaterial(gl, Object.values(colors)), new CG.Matrix4())

        let pos = new CG.Matrix4();

        //Cargamos los colores
        this.yellow = colors['yellow'];
        this.white = colors['white'];
        this.gray = colors['gray'];
        this.red = colors['red'];
        this.orange = colors['orange'];
        this.green = colors['green'];
        this.blue = colors['blue'];

        // Colocamos los centros. Las letras representan el par de colores
        let y = new CG.Center(gl, new CG.TextureMaterial(gl, this.getCenterColor(this.yellow)), pos);
        let r = new CG.Center(gl, new CG.TextureMaterial(gl, this.getCenterColor(this.red)), pos);
        r.rotarX_h()
        let g = new CG.Center(gl, new CG.TextureMaterial(gl, this.getCenterColor(this.green)), pos);
        g.rotarZ_ah();
        let o = new CG.Center(gl, new CG.TextureMaterial(gl, this.getCenterColor(this.orange)), pos);
        o.rotarX_ah();
        let b = new CG.Center(gl, new CG.TextureMaterial(gl, this.getCenterColor(this.blue)), pos);
        b.rotarZ_h();
        let w = new CG.Center(gl, new CG.TextureMaterial(gl, this.getCenterColor(this.white)), pos);
        w.rotarZ_h();
        w.rotarZ_h();

        // Colocamos las aristas
        let yg = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.yellow, this.green)), pos);
        let yr = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.yellow, this.red)), pos);
        yr.rotarY_h();
        let yb = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.yellow, this.blue)), pos);
        yb.rotarY_h();
        yb.rotarY_h();
        let yo = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.yellow, this.orange)), pos);
        yo.rotarY_ah();

        let wg = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.white, this.green)), pos);
        wg.rotarX_h();
        wg.rotarX_h();
        let wr = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.white, this.red)), pos);
        wr.rotarX_h();
        wr.rotarX_h();
        wr.rotarY_ah();
        let wb = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.white, this.blue)), pos);
        wb.rotarX_h();
        wb.rotarX_h();
        wb.rotarY_ah();
        wb.rotarY_ah();
        let wo = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.white, this.orange)), pos);
        wo.rotarX_h();
        wo.rotarX_h();
        wo.rotarY_h();
        
        let rg = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.red, this.green)), pos);
        rg.rotarX_h();
        let og = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.orange, this.green)), pos);
        og.rotarX_ah();
        let rb = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.red, this.blue)), pos);
        rb.rotarY_h();
        rb.rotarY_h();
        rb.rotarX_ah();
        let ob = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.orange, this.blue)), pos);
        ob.rotarY_h();
        ob.rotarY_h();
        ob.rotarX_h();

        // Colocamos las esquinas
        let yrg = new CG.Vertex(gl, new CG.TextureMaterial(gl, this.getVertexColor(this.yellow, this.red, this.green)), pos)
        let ygo = new CG.Vertex(gl, new CG.TextureMaterial(gl, this.getVertexColor(this.yellow, this.green, this.orange)), pos)
        ygo.rotarY_ah();
        let yob = new CG.Vertex(gl, new CG.TextureMaterial(gl, this.getVertexColor(this.yellow, this.orange, this.blue)), pos)
        yob.rotarY_ah();
        yob.rotarY_ah();
        let ybr = new CG.Vertex(gl, new CG.TextureMaterial(gl, this.getVertexColor(this.yellow, this.blue, this.red)), pos)
        ybr.rotarY_h();
        let rwg = new CG.Vertex(gl, new CG.TextureMaterial(gl, this.getVertexColor(this.red, this.white, this.green)), pos)
        rwg.rotarX_h();
        let wog = new CG.Vertex(gl, new CG.TextureMaterial(gl, this.getVertexColor(this.white, this.orange, this.green)), pos)
        wog.rotarX_h();
        wog.rotarX_h();
        let wrb = new CG.Vertex(gl, new CG.TextureMaterial(gl, this.getVertexColor(this.white, this.red, this.blue)), pos)
        wrb.rotarZ_h();
        wrb.rotarZ_h();
        let wbo = new CG.Vertex(gl, new CG.TextureMaterial(gl, this.getVertexColor(this.white, this.blue, this.orange)), pos)
        wbo.rotarY_h();
        wbo.rotarZ_h();
        wbo.rotarZ_h();


        pieces.push(
            y, r, g, o, b, w,

            yg, yr, yb, yo,
            wg, wr, wb, wo,
            rg, og, rb, ob,

            yrg, ygo, yob, ybr,
            rwg, wog, wrb, wbo

        );

        }

        drawPieces(gl, projectionMatrix, viewMatrix, light_pos){
            for (let i = 0; i < pieces.length; i++){
                pieces[i].draw(gl, projectionMatrix, viewMatrix, light_pos)
            }
        }
        getCenterColor(color){
            return [this.gray, this.gray, this.gray, this.gray, color, this.gray]
        }

        getEdgeColor(color_up, color_side){
            return [color_side, this.gray, this.gray, this.gray, color_up, this.gray]
        }
        
        getVertexColor(color_up, color_left, color_right){
            return [color_right, color_left, this.gray, this.gray, color_up, this.gray]
        }
        
        u_turn(){

        }
	}



    CG.Rubik = Rubik;
    return CG;
})(CG || {});

