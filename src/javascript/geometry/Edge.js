var CG = (function(CG) {

	
	class Edge extends CG.Cubie {
		
		/**
		 * Tiene los movimientos de un centro.
         * Los centros se pueden mover como M y M' en cualquier eje 
         * El parámetro eje restringe que este cubo solo se pueda mover en 1 eje.
         * Dependiendo de la cara que sea 
         * [Left, Right] Eje X
         * [Up, Bottom]  Eje Y (z en blender) 
         * [Front, Back] Eje Z (y en blender)
		*/
		constructor(gl, color_centro, initial_transform) {
            super(gl, color_centro, initial_transform);
		}

		

	}


    CG.Edge = Edge;
    return CG;
})(CG || {});

