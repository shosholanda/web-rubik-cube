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
        let y = new CG.Center(gl, new CG.TextureMaterial(gl, this.getCenterColor(this.yellow)), pos, "yellow");
        let r = new CG.Center(gl, new CG.TextureMaterial(gl, this.getCenterColor(this.red)), pos, "red");
        r.rotarX_h()
        let g = new CG.Center(gl, new CG.TextureMaterial(gl, this.getCenterColor(this.green)), pos, "green");
        g.rotarZ_ah();
        let o = new CG.Center(gl, new CG.TextureMaterial(gl, this.getCenterColor(this.orange)), pos, "orange");
        o.rotarX_ah();
        let b = new CG.Center(gl, new CG.TextureMaterial(gl, this.getCenterColor(this.blue)), pos, "blue");
        b.rotarZ_h();
        let w = new CG.Center(gl, new CG.TextureMaterial(gl, this.getCenterColor(this.white)), pos, "white");
        w.rotarZ_h();
        w.rotarZ_h();

        // Colocamos las aristas
        let yg = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.yellow, this.green)), pos, "yellow-green");
        let yr = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.yellow, this.red)), pos, "yellow-red");
        yr.rotarY_h();
        let yb = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.yellow, this.blue)), pos, "yellow-blue");
        yb.rotarY_h();
        yb.rotarY_h();
        let yo = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.yellow, this.orange)), pos, "yellow-orange");
        yo.rotarY_ah();

        let wg = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.white, this.green)), pos, "white-green");
        wg.rotarX_h();
        wg.rotarX_h();
        let wr = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.white, this.red)), pos, "white-red");
        wr.rotarX_h();
        wr.rotarX_h();
        wr.rotarY_h();
        let wb = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.white, this.blue)), pos, "white-blue");
        wb.rotarX_h();
        wb.rotarX_h();
        wb.rotarY_ah();
        wb.rotarY_ah();
        let wo = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.white, this.orange)), pos, "white-orange");
        wo.rotarX_h();
        wo.rotarX_h();
        wo.rotarY_ah();
        let rg = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.red, this.green)), pos, "red-green");
        rg.rotarX_h();
        let og = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.orange, this.green)), pos, "orange-green");
        og.rotarX_ah();
        let rb = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.red, this.blue)), pos, "red-blue");
        rb.rotarY_h();
        rb.rotarY_h();
        rb.rotarX_h();
        let ob = new CG.Edge(gl, new CG.TextureMaterial(gl, this.getEdgeColor(this.orange, this.blue)), pos, "orange-blue");
        ob.rotarY_h();
        ob.rotarY_h();
        ob.rotarX_ah();

        // Colocamos las esquinas
        let yrg = new CG.Vertex(gl, new CG.TextureMaterial(gl, this.getVertexColor(this.yellow, this.red, this.green)), pos, "yellow-red-green")
        let ygo = new CG.Vertex(gl, new CG.TextureMaterial(gl, this.getVertexColor(this.yellow, this.green, this.orange)), pos, "yellow-green-orange")
        ygo.rotarY_ah();
        let yob = new CG.Vertex(gl, new CG.TextureMaterial(gl, this.getVertexColor(this.yellow, this.orange, this.blue)), pos, "yellow-orange-blue")
        yob.rotarY_ah();
        yob.rotarY_ah();
        let ybr = new CG.Vertex(gl, new CG.TextureMaterial(gl, this.getVertexColor(this.yellow, this.blue, this.red)), pos, "yellow-blue-red")
        ybr.rotarY_h();
        let rwg = new CG.Vertex(gl, new CG.TextureMaterial(gl, this.getVertexColor(this.red, this.white, this.green)), pos, "white-red-green")
        rwg.rotarX_h();
        let wog = new CG.Vertex(gl, new CG.TextureMaterial(gl, this.getVertexColor(this.white, this.orange, this.green)), pos, "white-orange-green")

        wog.rotarX_h();
        wog.rotarX_h();
        let wrb = new CG.Vertex(gl, new CG.TextureMaterial(gl, this.getVertexColor(this.white, this.red, this.blue)), pos, "white-red-blue")
        wrb.rotarZ_h();
        wrb.rotarZ_h();
        let wbo = new CG.Vertex(gl, new CG.TextureMaterial(gl, this.getVertexColor(this.white, this.blue, this.orange)), pos, "white-blue-orange")
        wbo.rotarY_h();
        wbo.rotarX_h();
        wbo.rotarX_h();

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
        //      AMARILLO
        // V ------------- A
        // E | 0 | 1 | 2 | 
        //   ------------- Z
        // R | 3 | 4 | 5 | 
        // D ------------- U
        // E | 6 | 7 | 8 | 
        //   ------------- L
        //      BLANCO 
        back.push(
            ygo, yo, yob,
            og, o, ob,
            wog, wo, wbo
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
            yob, yb, ybr,
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
        this.print()

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
            
            let tmp = [right[0], right[1], right[2]]
            right[0] = back[0]
            right[1] = back[1]
            right[2] = back[2]
            
            back[0] = left[0]
            back[1] = left[1]
            back[2] = left[2]
            
            left[0] = front[0]
            left[1] = front[1]
            left[2] = front[2]
            
            front[0] = tmp[0]
            front[1] = tmp[1]
            front[2] = tmp[2]

            this.actualizar_cara(up, true)
        }

        //Gira en U' antihorario
        u_prime_turn(){
            up.forEach(e => e.rotarY_ah())
            
            let tmp = [right[0], right[1], right[2]]
            right[0] = front[0]
            right[1] = front[1]
            right[2] = front[2]
            
            front[0] = left[0]
            front[1] = left[1]
            front[2] = left[2]
            
            left[0] = back[0]
            left[1] = back[1]
            left[2] = back[2]
            
            back[0] = tmp[0]
            back[1] = tmp[1]
            back[2] = tmp[2]

            this.actualizar_cara(up, false)
        }

        // Gira en R horario
        r_turn(){
            right.forEach(e => e.rotarX_ah())
            
            let tmp = [up[2], up[5], up[8]]
            up[2] = front[2]
            up[5] = front[5]
            up[8] = front[8]
            
            front[2] = down[2]
            front[5] = down[5]
            front[8] = down[8]
            
            down[2] = back[6]
            down[5] = back[3]
            down[8] = back[0]
            
            back[6] = tmp[0]
            back[3] = tmp[1]
            back[0] = tmp[2]

            this.actualizar_cara(right, true)
        }

        // Gira en R antihorario
        r_prime_turn(){
            right.forEach(e => e.rotarX_h())
            
            let tmp = [up[2], up[5], up[8]]
            up[2] = back[6]
            up[5] = back[3]
            up[8] = back[0]

            back[6] = down[2]
            back[3] = down[5]
            back[0] = down[8]
            
            down[2] = front[2]
            down[5] = front[5]
            down[8] = front[8]
            
            front[2] = tmp[0]
            front[5] = tmp[1]
            front[8] = tmp[2]

            this.actualizar_cara(right, false)
        }

        // Gira en F horario
        f_turn(){
            front.forEach(e => e.rotarZ_ah())
            
            let tmp = [up[6], up[7], up[8]]
            up[6] = left[8]
            up[7] = left[5]
            up[8] = left[2]

            left[2] = down[0]
            left[5] = down[1]
            left[8] = down[2]
            
            down[0] = right[6]
            down[1] = right[3]
            down[2] = right[0]
            
            right[0] = tmp[0]
            right[3] = tmp[1]
            right[6] = tmp[2]

            this.actualizar_cara(front, true)
        }

        // Gira en F antihorario
        f_prime_turn(){
            front.forEach(e => e.rotarZ_h())
            
            let tmp = [up[6], up[7], up[8]]
            up[6] = right[0]
            up[7] = right[3]
            up[8] = right[6]

            right[0] = down[2]
            right[3] = down[1]
            right[6] = down[0]
            
            down[2] = left[8]
            down[1] = left[5]
            down[0] = left[2]
            
            left[8] = tmp[0]
            left[5] = tmp[1]
            left[2] = tmp[2]

            this.actualizar_cara(front, false)
        }

        // Gira en D horario
        d_turn(){
            down.forEach(e => e.rotarY_ah())

            let tmp = [front[6], front[7], front[8]]
            front[6] = left[6]
            front[7] = left[7]
            front[8] = left[8]
            
            left[6] = back[6]
            left[7] = back[7]
            left[8] = back[8]

            back[6] = right[6]
            back[7] = right[7]
            back[8] = right[8]

            right[6] = tmp[0]
            right[7] = tmp[1]
            right[8] = tmp[2]

            this.actualizar_cara(down, true)
        }

        d_prime_turn(){
            down.forEach(e => e.rotarY_h())

            let tmp = [front[6], front[7], front[8]]
            front[6] = right[6]
            front[7] = right[7]
            front[8] = right[8]
            
            right[6] = back[6]
            right[7] = back[7]
            right[8] = back[8]

            back[6] = left[6]
            back[7] = left[7]
            back[8] = left[8]

            left[6] = tmp[0]
            left[7] = tmp[1]
            left[8] = tmp[2]

            this.actualizar_cara(down, false)
        }

        l_turn(){
            left.forEach(e => e.rotarX_h())

            let tmp = [up[0], up[3], up[6]]
            up[0] = back[8]
            up[3] = back[5]
            up[6] = back[2]

            back[2] = down[6]
            back[5] = down[3]
            back[8] = down[0]

            down[0] = front[0]
            down[3] = front[3]
            down[6] = front[6]

            front[0] = tmp[0]
            front[3] = tmp[1]
            front[6] = tmp[2]

            this.actualizar_cara(left, true)
            this.print()
        }

        l_prime_turn(){
            left.forEach(e => e.rotarX_ah())

            let tmp = [up[0], up[3], up[6]]
            up[0] = front[0]
            up[3] = front[3]
            up[6] = front[6]
            
            front[0] = down[0]
            front[3] = down[3]
            front[6] = down[6]
            
            down[0] = back[8]
            down[3] = back[5]
            down[6] = back[2]
            
            back[8] = tmp[0]
            back[5] = tmp[1]
            back[2] = tmp[2]

            this.actualizar_cara(left, false)
        }

        b_turn(){
            back.forEach(e => e.rotarZ_h())

            let tmp = [up[0], up[1], up[2]]
            up[0] = right[2]
            up[1] = right[5]
            up[2] = right[8]

            right[2] = down[8]
            right[5] = down[7]
            right[8] = down[6]

            down[8] = left[6]
            down[7] = left[3]
            down[6] = left[0]

            left[0] = tmp[2]
            left[3] = tmp[1]
            left[6] = tmp[0]

            this.actualizar_cara(back, true)

        }

        b_prime_turn(){
            back.forEach(e => e.rotarZ_ah())

            let tmp = [up[0], up[1], up[2]]
            up[0] = left[6]
            up[1] = left[3]
            up[2] = left[0]

            left[0] = down[6]
            left[3] = down[7]
            left[6] = down[8]

            down[6] = right[8]
            down[7] = right[5]
            down[8] = right[2]

            right[2] = tmp[0]
            right[5] = tmp[1]
            right[8] = tmp[2]

            this.actualizar_cara(back, false)
            this.print()
        }

        // Para debugear. Bastante util
        print(){
            let s = ""
            s+="\nup\n"
            for (let i = 0; i < up.length; i+=3){
                s+= up[i].tag + "\t# " + up[i+1].tag + "\t# " +  up[i+2].tag + "\n"
            }
            s+="\ndown\n"
            for (let i = 0; i < down.length; i+=3){
                s+= down[i].tag + "\t# " + down[i+1].tag + "\t# " +  down[i+2].tag + "\n"
            }
            s+="\nfront\n"
            for (let i = 0; i < front.length; i+=3){
                s+= front[i].tag + "\t# " + front[i+1].tag + "\t# " +  front[i+2].tag + "\n"
            }
            s+="\nback\n"
            for (let i = 0; i < back.length; i+=3){
                s+= back[i].tag + "\t# " + back[i+1].tag + "\t# " +  back[i+2].tag + "\n"
            }
            s+="\nright\n"
            for (let i = 0; i < right.length; i+=3){
                s+= right[i].tag + "\t# " + right[i+1].tag + "\t# " +  right[i+2].tag + "\n"
            }
            s+="\nleft\n"
            for (let i = 0; i < left.length; i+=3){
                s+= left[i].tag + "\t# " + left[i+1].tag + "\t# " +  left[i+2].tag + "\n"
            }
            console.log(s + "-----------------------------")
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

        isDone(){}
	}



    CG.Rubik = Rubik;
    return CG;
})(CG || {});

