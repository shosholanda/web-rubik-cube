var CG = (function(CG) {

    const epsilon = 0.000001;

    class Vector4 {

	constructor(x = 0, y = 0, z = 0, w = 0){
	    this.x = x;
	    this.y = y;
	    this.z = z;
	    this.w = w;
	}

	/**
	 * Método para sumar 2 vectores
	 * @param {Vector4} u
	 * @param {Vector4} v
	 * @return {Vector4} la suma de los vectores u y v.
	 */
	static add(u, v){
	    return new Vector4(u.x + v.x, u.y + v.y, u.z + v.z, u.w + v.w);
	}

	/**
	 * Crea una copia idéntica de este vector en un nuevo objeto.
	 * @return {Vector4}
	 */
	clone(){
	    return new Vector4(this.x, this.y, this.z, this.w);
	}

	/**
	 * Calcula la distancia euclidiana entre 2 vectores.
	 * @param {Vector4} u
	 * @param {Vector4} v
	 * @return {Number}
	 */
	static distance(u, v){
	    return Math.sqrt(this.squaredDistance(u, v));
	}


	/**
	 * @param {Vector4} u
	 * @param {Vector4} v
	 * @return {Number}
	 */
	static squaredDistance(u, v){
	    return (u.x - v.x)**2 + (u.y - v.y)**2 + (u.z - v.z)**2 + (u.w - v.w)**2;
	}

	/**
	 * Calcula el producto punto de 2 vectores.
	 * @param {Vector4} u
	 * @param {Vector4} v
	 * @return {Number}
	 */
	static dot(u, v){
	    return u.x*v.x + u.y*v.y + u.z*v.z + u.w*v.w;
	}

	/**
	 * Nos dice si dos vectores u,v son iguales aunque tengan una diferencia de tamaño epsilon.
	 * @param {Vector4} u
	 * @param {Vector4} v
	 * @return {Boolean}
	 */
	static equals(u, v){
	    //Tuve un segundo de claridad y creo que es así.
	    let x = u.x - v.x;
	    let y = u.y - v.y;
	    let z = u.z - v.z;
	    let w = u.w - v.w;
	    return x < epsilon && y < epsilon && z < epsilon && w < epsilon;
	}

	/**
	 * @param {Vector4} u
	 * @param {Vector4} v
	 * @return {Boolean}
	 */
	static exactEquals(u, v){
	    return u.x === v.x && u.y === v.y && u.z === v.z && u.w === v.w;
	}

	/**
	 * @return {Vector4}
	 */
	normalize(){
	    return new Vector4(this.x/this.w, this.y/this.w, this.z/this.w, 1);
	}

	/**
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} z
	 */
	set(x, y, z, w){
	    this.x = x;
	    this.y = y;
	    this.z = z;
	    this.w = w;
	}

	/**
	 * Asigna 0 a cada componente de la funcion
	 */
	zero(){
	    this.x = 0;
	    this.y = 0;
	    this.z = 0;
	    this.w = 0;
	}
    }

    CG.Vector4 = Vector4;
    return CG;

})(CG || {});
