var CG = (function(CG) {
	class TrackballCamera {
	  /** */
	  constructor(
		pos = new CG.Vector3(0, 0, 1), 
		coi = new CG.Vector3(0, 0, 0), 
		up = new CG.Vector3(0, 1, 0)
	  ) {
		this.pos = pos;
		this.coi = coi;
		this.up  = up;
  
		this.radius = CG.Vector3.distance(this.pos, this.coi);
  
		let direction = CG.Vector3.subtract(this.pos, this.coi);
		this.theta = Math.atan2(direction.z, direction.x);
		this.phi = Math.atan2(direction.y, direction.z);
	  }
  
	  /** */
	  getMatrix() {
		return CG.Matrix4.lookAt(this.pos, this.coi, this.up);
	  }
  
	  /** */
	  finishMove(init_mouse, current_mouse) {
		let angles = this.getAngles(init_mouse, current_mouse);
  
		this.theta = angles.theta;
		this.phi   = angles.phi;
	  }
  
	  /** */
	  rotate(init_mouse, current_mouse) {
		let angles = this.getAngles(init_mouse, current_mouse);
  
		this.pos.set(
		  this.radius * Math.cos(angles.phi) * Math.cos(angles.theta), 
		  this.radius * Math.sin(angles.phi), 
		  this.radius * Math.cos(angles.phi) * Math.sin(angles.theta)
		);
	  }
  
	  /** */
	  getAngles(init_mouse, current_mouse) {
		let theta = this.theta + (current_mouse.x - init_mouse.x)/100;
		let phi = Math.min(
		  Math.max(
			this.phi   + (current_mouse.y - init_mouse.y)/100,
			-Math.PI/2
		  ),
		  Math.PI/2
		);
  
		return {
		  theta : theta,
		  phi   : phi
		};
	  }
  
	  /** */
	  registerMouseEvents(canvas, draw_callback) {
		let initial_mouse_position = null;
	
		/**
		 * Código que se ejecuta al presionar el botón derecho del mouse
		 * Obtiene la posición de pixeles que se ejecutó y después espera a
		 * movimiento del mouse.
		 */
		canvas.addEventListener("mousedown", (evt) => {
		  initial_mouse_position = CG.getMousePositionInElement(evt, canvas);
		  window.addEventListener("mousemove", mousemove);
		});
	
		/**
     * Código que se ejecuta al soltar el click.
     * Si no se hizo click antes, no hace nada.
     * Si sí, entonces se guarda la ultima posición que tenía la cámara y se 
     * ajusta para que se guarde en la vista actual. Se deja de escuchar el 
     * movimiento del mouse.
     */
		window.addEventListener("mouseup", (evt) => {
		  if (initial_mouse_position != null) {
			this.finishMove(initial_mouse_position, CG.getMousePositionInElement(evt, canvas));
			window.removeEventListener("mousemove", mousemove);
		  }
		  initial_mouse_position = null;
		});

		let mousemove = (evt) => {
			this.rotate(initial_mouse_position, CG.getMousePositionInElement(evt, canvas));
			draw_callback();
		  } 
	  }

	  
	}
  
	CG.TrackballCamera = TrackballCamera;
	return CG;
  }(CG || {}));