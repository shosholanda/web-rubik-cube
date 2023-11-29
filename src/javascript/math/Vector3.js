var CG = (function(CG) {

    const  epsilon = 0.000001;

    class Vector3 {

	constructor(x = 0, y = 0, w = 0){
	    this.x = x;
	    this.y = y;
	    this.w = w;
	}

	/**
	 * Método para sumar 2 vectores
	 * @param {Vector3} u
	 * @param {Vector3} v
	 * @return {Vector3} la suma de los vectores u y v.
	 */
	static add(u, v){
	    return new Vector3(u.x + v.x, u.y + v.y, u.w + v.w);
	}

	static subtract(u, v){
	    return new Vector3(u.x - v.x, u.y - v.y, u.w - v.w);
	}

	/**
	 * Crea una copia idéntica de este vector en un nuevo objeto.
	 * @return {Vector3}
	 */
	clone(){
	    return new Vector3(this.x, this.y, this.w);
	}


	/**
	 * Crea un nuevo vector, perpendicular al vector u, v.
	 * @param {Vector3} u
	 * @param {Vector3} v
	 * @return {Vector3}
	 */
	static cross(u, v){
	    return new Vector3(u.y*v.w - v.y*u.w,
			       -(u.x*v.w - v.x*u.w),
			       u.x*v.y-v.x*u.y);
	}

	/**
	 * Calcula la distancia euclidiana entre 2 vectores.
	 * @param {Vector3} u
	 * @param {Vector3} v
	 * @return {Number}
	 */
	static distance(u, v){
	    return Math.sqrt(this.squaredDistance(u, v));
	}


	/**
	 * Calcula el producto punto de 2 vectores.
	 * @param {Vector3} u
	 * @param {Vector3} v
	 * @return {Number}
	 */
	static dot(u, v){
	    return u.x*v.x + u.y*v.y + u.w*v.w;
	}


	/**
	 * Nos dice si dos vectores u,v son iguales aunque tengan una diferencia de tamaño epsilon.
	 * @param {Vector3} u
	 * @param {Vector3} v
	 * @return {Boolean}
	 */
	static equals(u, v){
	    //Tuve un segundo de claridad y creo que es así.
	    let x = u.x - v.x;
	    let y = u.y - v.y;
	    let w = u.w - v.w;
	    return x < epsilon && y < epsilon && w < epsilon;
	}

	/**
	 * @param {Vector3} u
	 * @param {Vector3} v
	 * @return {Boolean}
	 */
	static exactEquals(u, v){
	    return u.x === v.x && u.y === v.y && u.w === v.w;
	}

	/**
	 * @return {Vector3}
	 */
	normalize(){
	    let n = Vector3.distance(this, new Vector3());
	    return new Vector3(this.x/n, this.y/n, this.w/n);
	}

	/**
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} z
	 */
	set(x= 0, y= 0, w= 0){
	    this.x = x;
	    this.y = y;
	    this.w = w;
	}

	/**
	 * @param {Vector3} u
	 * @param {Vector3} v
	 * @return {Number}
	 */
	static squaredDistance(u, v){
	    return (u.x - v.x)**2 + (u.y - v.y)**2 + (u.w - v.w)**2;
	}

	/**
	 * Asigna 0 a cada componente de la funcion
	 */
	zero(){
	    this.x = 0;
	    this.y = 0;
	    this.w = 0;
	}

	/**
	 * Multiplica este vector por un escalar.
	 * @param {Number}
	 * return {Vector3}
	 */
	scalar(c){
	    return new Vector3(this.x*c, this.y*c, this.w*c);
	}
    }

    CG.Vector3 = Vector3;

    return CG;
    
})(CG || {});
