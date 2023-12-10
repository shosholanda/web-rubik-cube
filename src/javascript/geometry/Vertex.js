var CG = (function(CG) {

	
	class Vertex extends CG.Cubie {
		
		/**
		 * Tiene los movimientos de un centro.
         * Los centros se pueden mover como M y M' en cualquier eje 
         * El parámetro eje restringe que este cubo solo se pueda mover en 1 eje.
         * Dependiendo de la cara que sea 
         * [Left, Right] Eje X
         * [Up, Bottom]  Eje Y (z en blender) 
         * [Front, Back] Eje Z (y en blender)
		*/
		constructor(gl, color_centro, initial_transform, tag) {
            super(gl, color_centro, initial_transform, tag);
		}

        /**
         * Sobreescribimos para obtener un cubo puesto en [1, 1, 1] más arriba del cubo origen
         * @returns 
         */
        getVertices() {
            let w = 1;
            let h = 1;
            let l = 1;
            let off = 2;
            let v = [
                //R
                w,  h, -l,  w, -h,  l,  w, -h, -l,
                w,  h, -l,  w,  h,  l,  w, -h,  l,
                //F
                w, -h,  l,  -w,  h,  l,  -w, -h,  l,
                w, -h,  l,  w,  h,  l,  -w,  h,  l,
                //L
                -w, -h,  l,  -w,  h, -l,  -w, -h, -l,
                -w, -h,  l,  -w,  h,  l,  -w,  h, -l,
                //B
                -w,  h, -l,  w, -h, -l,  -w, -h, -l,
                -w,  h, -l,  w,  h, -l,  w, -h, -l,
                //U
                -w,  h,  l,  w,  h, -l,  -w,  h, -l,
                -w,  h,  l,  w,  h,  l,  w,  h, -l,
                //D
                w, -h, -l,  -w, -h,  l,  -w, -h, -l,
                w, -h, -l,  w, -h,  l,  -w, -h,  l,
            ];
            for (let i = 0; i < v.length; i++){
                v[i] = v[i] + off
            }
            return v;
          }
	}


    CG.Vertex = Vertex;
    return CG;
})(CG || {});

