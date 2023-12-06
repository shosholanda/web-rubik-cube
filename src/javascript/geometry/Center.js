var CG = (function(CG) {
	
	class Center extends CG.Cubie {
		
		/**
		 * Tiene los movimientos de un centro
         * Los centros se pueden mover como M y M' en cualquier eje 
		*/
		constructor(gl, color_centro, initial_transform) {
            super(gl, color_centro, initial_transform);
		}


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
                if (i%3 == 1)
                    v[i] = v[i] + off
            }
            return v;
          }

	}


    CG.Center = Center;
    return CG;
})(CG || {});

