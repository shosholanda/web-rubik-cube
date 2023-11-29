var CG = (function(CG) {

    const epsilon = 0.000001;

    class Matrix3 {

	constructor(a00 = 1, a01 = 0, a02 = 0, a10 = 0, a11 = 1, a12 = 0, a20 = 0, a21 = 0, a22 = 1){
	    this.a00 = a00;
	    this.a01 = a01;
	    this.a02 = a02;
	    this.a10 = a10;
	    this.a11 = a11;
	    this.a12 = a12;
	    this.a20 = a20;
	    this.a21 = a21;
	    this.a22 = a22;
	}

	/**
	 * Suma 2 matrices entrada por entrada
	 * @param {Matrix3} m1
	 * @param {Matrix3} m2
	 * @return {Matrix3}
	 */
	static add(m1, m2){
	    return new Matrix3(m1.a00 + m2.a00, m1.a01 + m2.a01, m1.a02 + m2.a02,
			       m1.a10 + m2.a10, m1.a11 + m2.a11, m1.a12 + m2.a12,
			       m1.a20 + m2.a20, m1.a21 + m2.a21, m1.a22 + m2.a22);
	}

	/**
	 * Regresa una nueva matriz adjunta de this.
	 * @return {Matrix3}
	 */
	adjoint(){
	    return this.cofactors().transpose();
	}

	/**
	 * Regresa una nueva matriz de los cofactores de esta matriz.
	 * @return {Matrix3}
	 */
	cofactors(){
	    let a00 = (-1)**(1+1)*this.det2x2(this.a11, this.a12, this.a21, this.a22);
	    let a01 = (-1)**(1+2)*this.det2x2(this.a10, this.a12, this.a20, this.a22);
	    let a02 = (-1)**(1+3)*this.det2x2(this.a10, this.a11, this.a20, this.a21);
	    let a10 = (-1)**(2+1)*this.det2x2(this.a01, this.a02, this.a21, this.a22);
	    let a11 = (-1)**(2+2)*this.det2x2(this.a00, this.a02, this.a20, this.a22);
	    let a12 = (-1)**(2+3)*this.det2x2(this.a00, this.a01, this.a20, this.a21);
	    let a20 = (-1)**(3+1)*this.det2x2(this.a01, this.a02, this.a11, this.a12);
	    let a21 = (-1)**(3+2)*this.det2x2(this.a00, this.a02, this.a10, this.a12);
	    let a22 = (-1)**(3+3)*this.det2x2(this.a00, this.a01, this.a10, this.a11);
	    return new Matrix3(a00, a01, a02, a10, a11, a12, a20, a21, a22);
	}

	/**
	 * Nos dice el determinante de una matriz 2x2
	 * return {Number}
	 */
	det2x2(a, b, c, d){
	    return a*d - b*c;
	}

	/**
	 * Nos da una Matriz copia igual.
	 * @return {Matrix3}
	 */
	clone(){
	    return new Matrix3(this.a00, this.a01, this.a02,
			       this.a10, this.a11, this.a12,
			       this.a20, this.a21, this.a22);
	}

	/**
	 * @return {Number}
	 */
	determinant(){
	    return this.a00*this.a11*this.a22 +
		this.a01*this.a12*this.a20 +
		this.a02*this.a10*this.a21 -
		this.a02*this.a11*this.a20 -
		this.a01*this.a10*this.a22 -
		this.a00*this.a12*this.a21;
	}

	/**
	 * @param {Matrix3} m1
	 * @param {Matrix3} m2
	 * @return {Boolean}
	 */
	static equals(m1, m2){
	    let m = this.subtract(m1, m2);
	    return m.a00 < epsilon &&
		m.a01 < epsilon &&
		m.a02 < epsilon &&
		m.a10 < epsilon &&
		m.a11 < epsilon &&
		m.a12 < epsilon &&
		m.a20 < epsilon &&
		m.a21 < epsilon &&
		m.a22 < epsilon;
	}

	/**
	 * @param {Matrix3} m1
	 * @param {Matrix3} m2
	 * @return {Boolean}
	 */
	static exactEquals(m1, m2){
	    return m1.a00 === m2.a00 &&
		m1.a01 === m2.a01 &&
		m1.a02 === m2.a02 &&
		m1.a10 === m2.a10 &&
		m1.a11 === m2.a11 &&
		m1.a12 === m2.a12 &&
		m1.a20 === m2.a20 &&
		m1.a21 === m2.a21 &&
		m1.a22 === m2.a22;
	}

	/**
	 * Cambia los valores de esta matriz por la identidad
	 */
	identity(){
	    this.a00 = 1;
	    this.a01 = 0;
	    this.a02 = 0;
	    this.a10 = 0;
	    this.a11 = 1;
	    this.a12 = 0;
	    this.a20 = 0;
	    this.a21 = 0;
	    this.a22 = 1;
	}

	/**
	 * @return {Matrix3}
	 */
	invert(){
	    let d = this.determinant();
	    if (d !== 0){
		let m = this.adjoint();
		let x = Matrix3.multiplyScalar(m, 1/d);
		return x;
	    }
	    return "No tiene inversa la matriz"
	}

	/**
	 * @param {Matrix3} m1
	 * @param {Matrix3} m2
	 * @return {Matrix3}
	 */
	static multiply(m1, m2){
	    return new Matrix3(m1.a00*m2.a00 + m1.a01*m2.a10 + m1.a02*m2.a20,
			       m1.a00*m2.a01 + m1.a01*m2.a11 + m1.a02*m2.a21,
			       m1.a00*m2.a02 + m1.a01*m2.a12 + m1.a02*m2.a22,
			       m1.a10*m2.a00 + m1.a11*m2.a10 + m1.a12*m2.a20,
			       m1.a10*m2.a01 + m1.a11*m2.a11 + m1.a12*m2.a21,
			       m1.a10*m2.a02 + m1.a11*m2.a12 + m1.a12*m2.a22,
			       m1.a20*m2.a00 + m1.a21*m2.a10 + m1.a22*m2.a20,
			       m1.a20*m2.a01 + m1.a21*m2.a11 + m1.a22*m2.a21,
			       m1.a20*m2.a02 + m1.a21*m2.a12 + m1.a22*m2.a22);
	}

	/**
	 * @param {Matrix3} m1
	 * @param {Number} c
	 * @return {Matrix3}
	 */
	static multiplyScalar(m1, c){
	    return new Matrix3(m1.a00*c, m1.a01*c, m1.a02*c,
			       m1.a10*c, m1.a11*c, m1.a12*c,
			       m1.a20*c, m1.a21*c, m1.a22*c);
	}

	/**
	 * @Param {Vector3} v
	 * @return {Vector3}
	 */
	multiplyVector(v){
	    return new CG.Vector3(this.a00*v.x + this.a01*v.y + this.a02*v.w,
			       this.a10*v.x + this.a11*v.y + this.a12*v.w,
			       this.a20*v.x + this.a21*v.y + this.a22*v.w);
	}

	/**
	 * @param {Number} theta
	 * @return {Matrix3}
	 */
	static rotate(theta){
	    return new Matrix3(Math.cos(theta), -Math.sin(theta), 0,
			       Math.sin(theta), Math.cos(theta), 0,
			       0, 0, 1);
	}

	/**
	 * @param {Number} sx
	 * @param {Number} sy
	 * @return {Matrix3}
	 */
	static scale(sx, sy){
	    return new Matrix3(sx, 0, 0,
			       0, sy, 0,
			       0, 0, 1);
	}

	/**
	 * @param {Number} a00
	 * @param {Number} a01
	 * @param {Number} a02
	 * @param {Number} a10
	 * @param {Number} a11
	 * @param {Number} a12
	 * @param {Number} a20
	 * @param {Number} a21
	 * @param {Number} a22
	 */
	set(a00, a01, a02, a10, a11, a12, a20, a21, a22){
	    this.a00 = a00;
	    this.a01 = a01;
	    this.a02 = a02;
	    this.a10 = a10;
	    this.a11 = a11;
	    this.a12 = a12;
	    this.a20 = a20;
	    this.a21 = a21;
	    this.a22 = a22;
	}

	/**
	 * @param {Matrix3} m1
	 * @param {Matrix3} m2
	 * @return {Matrix3}
	 */
	static subtract(m1, m2){
	    return new Matrix3(m1.a00 - m2.a00, m1.a01 - m2.a01, m1.a02 - m2.a02,
			       m1.a10 - m2.a10, m1.a11 - m2.a11, m1.a12 - m2.a12,
			       m1.a20 - m2.a20, m1.a21 - m2.a21, m1.a22 - m2.a22);
	}

	/**
	 * @param {Number} tx
	 * @param {Number} ty
	 * @return {Matrix3}
	 */
	static translate(tx, ty){
	    return new Matrix3(1, 0, tx,
			       0, 1, ty,
			       0, 0, 1);
	}

	/**
	 * Regresa una nueva matriz, transpuesta a this.
	 * @return {Matrix3}
	 */
	transpose(){
	    let a00 = this.a00;
	    let a01 = this.a10;
	    let a02 = this.a20;
	    let a10 = this.a01;
	    let a11 = this.a11;
	    let a12 = this.a21;
	    let a20 = this.a02;
	    let a21 = this.a12;
	    let a22 = this.a22;
	    return new Matrix3(a00, a01, a02, a10, a11, a12, a20, a21, a22);
	}
    }

    CG.Matrix3 = Matrix3;

    return CG;

})(CG || {});
