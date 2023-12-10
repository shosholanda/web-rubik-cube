var CG = (function(CG) {

	const escala = 1;
	
	class Cubie extends CG.PrismaRectangular {
		
		/**
		 * El cubo de rubik son puras rotaciones
		 * Representa el cubo de 1x1, puede girar en cualquier eje.
		*/
		constructor(gl, material, initial_transform, tag) {
			
			super(gl, escala, escala, escala, material, [], initial_transform);
			this.escala = escala
			this.tag = tag
		}
		/**
		 * Rota este cubito sobre el eje x 90° horario
		 */
		rotarX_h(angle = Math.PI/2){
			let rot = CG.Matrix4.rotateX(angle)
			this.apply_transform(rot);
		}

		/**
		 * Rota este cubito sobre el eje x 90° horario
		 */
		rotarY_h(angle = Math.PI/2){
			let rot = CG.Matrix4.rotateY(angle);
			this.apply_transform(rot);
		}
		
		/**
		 * Rota este cubito sobre el eje x 90° horario
		 */
		rotarZ_h(angle = Math.PI/2){
			let rot = CG.Matrix4.rotateZ(angle)
			this.apply_transform(rot);
		}

		/**
		 * Rota este cubito sobre el eje x 90° anti-horario
		 */
		rotarX_ah(angle = Math.PI/2){
			let rot = CG.Matrix4.rotateX(-angle)
			this.apply_transform(rot);
		}
		
		/**
		 * Rota este cubito sobre el eje x 90° anti-horario
		 */
		rotarY_ah(angle = Math.PI/2){
			let rot = CG.Matrix4.rotateY(-angle)
			this.apply_transform(rot);
		}
	
		/**
		 * Rota este cubito sobre el eje x 90° anti-horario
		 */
		rotarZ_ah(angle = Math.PI/2){
			let rot = CG.Matrix4.rotateZ(-angle)
			this.apply_transform(rot);
		}

		/** 
		 * Reincia los ejes a este cubie, aplicando la rotación (Ctrl A + R en blender)
		 */ 
		apply_transform(rot_mat){
			let vertices = this.vertices;
			let new_vert = []

			for (let i = 0; i < vertices.length; i+=3){
				let v = new CG.Vector4(
					vertices[i],
					vertices[i+1],
					vertices[i+2],
					1
				)
				let trans = rot_mat.multiplyVector(v);
				new_vert.push(
					trans.x,
					trans.y,
					trans.z, 
				)
			}

			this.vertices = new_vert;
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.flatPositionBuffer);
          	this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(new_vert), this.gl.DYNAMIC_DRAW);
		}

		/** 
		 * Registra las teclas para girar caras
		 */
		registerCubeEvents(draw_callback) {
			window.addEventListener("keydown", (evt) => {
				if (evt.key.toUpperCase() == "U"){
					if (evt.shiftKey) this.u_prime_turn();
					else this.u_turn();
				}
				else if (evt.key.toUpperCase() == "R"){
					if (evt.shiftKey) this.r_prime_turn();
					else this.r_turn();
				}
				else if (evt.key.toUpperCase() == "F"){
					if (evt.shiftKey) this.f_prime_turn();
					else this.f_turn();
				}
				else if (evt.key.toUpperCase() == "D"){
					if (evt.shiftKey) this.d_prime_turn();
					else this.d_turn();
				}
				else if (evt.key.toUpperCase() == "L"){
					if (evt.shiftKey) this.l_prime_turn();
					else this.l_turn();
				}
				else if (evt.key.toUpperCase() == "B"){
					if (evt.shiftKey) this.b_prime_turn();
					else this.b_turn();
				}
				draw_callback();
			  });
			}

	}


    CG.Cubie = Cubie;
    return CG;
})(CG || {});

