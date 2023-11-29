var CG = (function(CG) {
    class TrackballCamera {
	constructor(pos = new CG.Vector3(0, 0, 1), 
		    coi = new CG.Vector3(0, 0, 0), 
		    up = new CG.Vector3(0, 1, 0)) {
	    this.pos = pos;
	    this.coi = coi;
	    this.up  = up;
	    
	    this.radius = CG.Vector3.distance(this.pos, this.coi);

	    let direction = CG.Vector3.subtract(this.pos, this.coi);
	    this.theta = Math.atan2(direction.w, direction.x);
	    this.phi = Math.atan2(direction.y, direction.w);

	    /**
             // si se normaliza el vector de dirección, se puede usar la función asin para el ángulo phi
             let direction = CG.Vector3.subtract(this.pos, this.coi).normalize();
             this.theta = Math.atan2(direction.z, direction.x);
             this.phi = Math.asin(direction.y);
	    */
	}

	getMatrix() {
	    return CG.Matrix4.lookAt(this.pos, this.coi, this.up);
	}

	finishMove(init_mouse, current_mouse) {
	    let angles = this.getAngles(init_mouse, current_mouse);

	    this.theta = angles.theta;
	    this.phi   = angles.phi;
	}

	rotate(init_mouse, current_mouse) {
	    let angles = this.getAngles(init_mouse, current_mouse);
	    // console.log(angles);
	    this.pos.set(
		this.radius * Math.cos(angles.phi) * Math.cos(angles.theta), 
		this.radius * Math.sin(angles.phi), 
		this.radius * Math.cos(angles.phi) * Math.sin(angles.theta)
	    );
	}

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

    }

    CG.TrackballCamera = TrackballCamera;
    return CG;
}(CG || {}));
