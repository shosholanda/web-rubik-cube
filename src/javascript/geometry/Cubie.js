var CG = (function(CG) {

	const escala = 1;
	const angulo = Math.PI/2;
	
	class Cubie extends CG.PrismaRectangular {
		
		/**
		 * El cubo de rubik son puras rotaciones
		 * Representa el cubo de 1x1, puede girar en cualquier eje.
		*/
		constructor(gl, material, initial_transform) {
			
			super(gl, escala, escala, escala, material, [], initial_transform);
			this.escala = escala
			this.angulo = angulo;
		}
		/**
		 * Rota este cubito sobre el eje x 90° horario
		 */
		rotarX_h(){
			let m = CG.Matrix4.multiply(this.initial_transform, CG.Matrix4.rotateX(this.angulo))
			this.initial_transform = m
		}

		/**
		 * Rota este cubito sobre el eje x 90° horario
		 */
		rotarY_h(){
			let m = CG.Matrix4.multiply(this.initial_transform, CG.Matrix4.rotateY(this.angulo))
			this.initial_transform = m
		}
		
		/**
		 * Rota este cubito sobre el eje x 90° horario
		 */
		rotarZ_h(){
			let m = CG.Matrix4.multiply(this.initial_transform, CG.Matrix4.rotateZ(this.angulo))
			this.initial_transform = m
		}

		/**
		 * Rota este cubito sobre el eje x 90° anti-horario
		 */
		rotarX_ah(){
			let m = CG.Matrix4.multiply(this.initial_transform, CG.Matrix4.rotateX(-this.angulo))
			this.initial_transform = m
		}
		
		/**
		 * Rota este cubito sobre el eje x 90° anti-horario
		 */
		rotarY_ah(){
			let m = CG.Matrix4.multiply(this.initial_transform, CG.Matrix4.rotateY(-this.angulo))
			this.initial_transform = m
		}
	
		/**
		 * Rota este cubito sobre el eje x 90° anti-horario
		 */
		rotarZ_ah(){
			let m = CG.Matrix4.multiply(this.initial_transform, CG.Matrix4.rotateZ(-this.angulo))
			this.initial_transform = m
		}

		// Reincia los ejes a este cubie, aplicando la rotación (Ctrl A + R en blender)
		apply_transform(){

		}

		/** */
		registerCubeEvents(draw_callback) {
			window.addEventListener("keydown", (evt) => {
				console.log(evt.key);
				if (evt.key == "4") {
				  this.rotarY_h()
				}
				else if (evt.key == "6") {
				  this.rotarY_ah()  
				}
				else if (evt.key == "2") {
				  this.rotarZ_ah()   
				}
				else if (evt.key == "5") {
				  this.rotarZ_h(); 
				}
				else if (evt.key == "1") {
					this.rotarX_h(); 
				}
				else if (evt.key == "3") {
					this.rotarX_ah(); 
				}
				else if (evt.key.toUpperCase() == "U"){
					if (evt.shiftKey) this.u_prime_turn();
					else this.u_turn();
				}
				else if (evt.key.toUpperCase() == "R"){
					if (evt.shiftKey) this.r_prime_turn();
					else this.r_turn();
				}
				draw_callback();
			  });
			}

	}


    CG.Cubie = Cubie;
    return CG;
})(CG || {});

