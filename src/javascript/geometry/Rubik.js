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
        g.rotarY_h()
        g.rotarY_h();
        g.rotarZ_h();
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

        //Todas las piezas
        pieces.push(
            y, r, g, o, b, w,

            yg, yr, yb, yo,
            wg, wr, wb, wo,
            rg, og, rb, ob,

            yrg, ygo, yob, ybr,
            rwg, wog, wrb, wbo

        );


        // LLenar capa U inicialmente
        //El índice determina cada pieza visto desde arriba
        //      Naranja
        // A ------------- V
        // Z | 0 | 1 | 2 | E
        //   -------------
        // U | 3 | 4 | 5 | R
        //   ------------- 
        // L | 6 | 7 | 8 | D
        //   ------------- E
        //       ROJO 
        up.push(
            yob, yo, ygo,
            yb, y, yg,
            ybr, yr, yrg
        )

        // LLenar capa D inicialmente
        //El índice determina cada pieza visto desde arriba
        //      ROJO
        // A ------------- V
        // Z | 0 | 1 | 2 | E
        //   -------------
        // U | 3 | 4 | 5 | R
        //   ------------- 
        // L | 6 | 7 | 8 | D
        //   ------------- E
        //      NARANJA 
        down.push(
            wrb, wr, rwg,
            wb, w, wg,
            wbo, wo, wog
        )

        // LLenar capa F inicialmente
        //El índice determina cada pieza visto desde arriba
        //      AMARILLO
        // A ------------- V
        // Z | 0 | 1 | 2 | E
        //   -------------
        // U | 3 | 4 | 5 | R
        //   ------------- 
        // L | 6 | 7 | 8 | D
        //   ------------- E
        //      BLANCO 
        front.push(
            ybr, yr, yrg,
            rb, r, rg, 
            wrb, wr, rwg
        )

        // LLenar capa B inicialmente
        //El índice determina cada pieza visto desde arriba
        //      BLANCO
        // A ------------- V
        // Z | 0 | 1 | 2 | E
        //   -------------
        // U | 3 | 4 | 5 | R
        //   ------------- 
        // L | 6 | 7 | 8 | D
        //   ------------- E
        //      AMARILLO 
        back.push(
            wbo, wo, wog,
            ob, o, og,
            yob, yo, ygo
        )

        // LLenar capa L inicialmente
        //El índice determina cada pieza visto desde arriba
        //      AMARILLO
        // N ------------- 
        // A | 0 | 1 | 2 | R
        // R ------------- O
        // A | 3 | 4 | 5 | 
        // N ------------- J
        // J | 6 | 7 | 8 | O
        // A ------------- 
        //      BLANCO 
        left.push(
            yob, yo, ybr,
            ob, b, rb,
            wbo, wb, wrb
        )

        // LLenar capa R inicialmente
        //El índice determina cada pieza visto desde arriba
        //      AMARILLO
        // R ------------- N
        // O | 0 | 1 | 2 | A
        //   ------------- R
        //   | 3 | 4 | 5 | A
        //   ------------- N
        // J | 6 | 7 | 8 | J
        // O ------------- A
        //      BLANCO 
        right.push(
            yrg, yg, ygo,
            rg, g, og,
            rwg, wg, wog
        )

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
        
        //Gira en U horario
        u_turn(){
            up.forEach(e => e.rotarY_h())
            let tmp1 = [left[0], left[1], left[2]]

            // Actualizar caras laterales
            left[0] = front[0]
            left[1] = front[1]
            left[2] = front[2]

            front[0] = right[0]
            front[1] = right[1]
            front[2] = right[2]

            right[0] = back[0]
            right[1] = back[1]
            right[2] = back[2]

            back[0] = tmp1[0]
            back[1] = tmp1[1]
            back[2] = tmp1[2]

            this.actualizar_cara(up, true);
        }

        //Gira en U' antihorario
        u_prime_turn(){
            up.forEach(e => e.rotarY_ah())
            let tmp1 = [left[0], left[1], left[2]]

            // Actualizar caras laterales
            left[0] = back[0]
            left[1] = back[1]
            left[2] = back[2]

            back[0] = right[0]
            back[1] = right[1]
            back[2] = right[2]

            right[0] = front[0]
            right[1] = front[1]
            right[2] = front[2]

            front[0] = tmp1[0]
            front[1] = tmp1[1]
            front[2] = tmp1[2]

            this.actualizar_cara(up, false);
        }

        // Gira en R horario
        r_turn(){
            right.forEach(e => e.rotarX_h())
            /* let tmp1 = [left[0], left[1], left[2]]

            // Actualizar caras laterales
            left[0] = back[0]
            left[1] = back[1]
            left[2] = back[2]

            back[0] = right[0]
            back[1] = right[1]
            back[2] = right[2]

            right[0] = front[0]
            right[1] = front[1]
            right[2] = front[2]

            front[0] = tmp1[0]
            front[1] = tmp1[1]
            front[2] = tmp1[2]

            this.actualizar_cara(up, true); */
        }

        r_prime_turn(){
            right.forEach(e => e.rotarX_ah())
            /* let tmp1 = [left[0], left[1], left[2]]

            // Actualizar caras laterales
            left[0] = back[0]
            left[1] = back[1]
            left[2] = back[2]

            back[0] = right[0]
            back[1] = right[1]
            back[2] = right[2]

            right[0] = front[0]
            right[1] = front[1]
            right[2] = front[2]

            front[0] = tmp1[0]
            front[1] = tmp1[1]
            front[2] = tmp1[2]

            this.actualizar_cara(up, false); */
        }

        /**
         * Actualiza la nueva posición de una cara vista de frente
         * aplicando un giro horario u antihorario
         * @param {*} face 
         * @param {*} horario 
         */
        actualizar_cara(face, horario){
            if (horario){
                let vert_tmp = face[0]
                let ed_tmp = face[1]
                face[0] = face[6]
                face[6] = face[8]
                face[8] = face[2]
                face[2] = vert_tmp

                face[1] = face[3]
                face[3] = face[7]
                face[7] = face[5]
                face[5] = ed_tmp
            } else {
                let vert_tmp = face[0]
                let ed_tmp = face[1]
                face[0] = face[2]
                face[2] = face[8]
                face[8] = face[6]
                face[6] = vert_tmp

                face[1] = face[5]
                face[5] = face[7]
                face[7] = face[3]
                face[3] = ed_tmp
            }
        }

        scramble(){

        }
	}



    CG.Rubik = Rubik;
    return CG;
})(CG || {});

