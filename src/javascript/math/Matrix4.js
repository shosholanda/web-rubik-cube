var CG = (function(CG) {

    const epsilon = 0.000001;

    class Matrix4 {

	constructor(a00 = 1, a01 = 0, a02 = 0, a03 = 0, a10 = 0, a11 = 1, a12 = 0, a13 = 0, a20 = 0, a21 = 0, a22 = 1, a23 = 0, a30 = 0, a31 = 0, a32 = 0, a33 = 1){
	    this.a00 = a00;
	    this.a01 = a01;
	    this.a02 = a02;
	    this.a03 = a03;
	    this.a10 = a10;
	    this.a11 = a11;
	    this.a12 = a12;
	    this.a13 = a13;
	    this.a20 = a20;
	    this.a21 = a21;
	    this.a22 = a22;
	    this.a23 = a23;
	    this.a30 = a30;
	    this.a31 = a31;
	    this.a32 = a32;
	    this.a33 = a33;
	}

	/**
	 * Suma 2 matrices entrada por entrada
	 * @param {Matrix4} m1
	 * @param {Matrix4} m2
	 * @return {Matrix4}
	 */
	static add(m1, m2){
	    return new Matrix4(m1.a00 + m2.a00, m1.a01 + m2.a01, m1.a02 + m2.a02, m1.a03 + m2.a03,
			       m1.a10 + m2.a10, m1.a11 + m2.a11, m1.a12 + m2.a12, m1.a13 + m2.a13,
			       m1.a20 + m2.a20, m1.a21 + m2.a21, m1.a22 + m2.a22, m1.a23 + m2.a23,
			       m1.a30 + m2.a30, m1.a31 + m2.a31, m1.a32 + m2.a32, m1.a33 + m2.a33);
	}

	/**
	 * Regresa una nueva matriz adjunta de this.
	 * @return {Matrix4}
	 */
	adjoint(){
	    return this.cofactors().transpose();
	}

	/**
	 * Regresa una nueva matriz de los cofactores de esta matriz.
	 * @return {Matrix4}
	 */
	cofactors(){
	    //Q horror
	    let d00 = new CG.Matrix3(this.a11, this.a12, this.a13,
				     this.a21, this.a22, this.a23,
				     this.a31, this.a32, this.a33);
	    let d01 = new CG.Matrix3(this.a10, this.a12, this.a13,
				     this.a20, this.a22, this.a23,
				     this.a30, this.a32, this.a33);
	    let d02 = new CG.Matrix3(this.a10, this.a11, this.a13,
				     this.a20, this.a21, this.a23,
				     this.a30, this.a31, this.a33);
	    let d03 = new CG.Matrix3(this.a10, this.a11, this.a12,
				     this.a20, this.a21, this.a22,
				     this.a30, this.a31, this.a32);
	    let d10 = new CG.Matrix3(this.a01, this.a02, this.a03,
				     this.a21, this.a22, this.a23,
				     this.a31, this.a32, this.a33);
	    let d11 = new CG.Matrix3(this.a00, this.a02, this.a03,
				     this.a20, this.a22, this.a23,
				     this.a30, this.a32, this.a33);
	    let d12 = new CG.Matrix3(this.a00, this.a01, this.a03,
				     this.a20, this.a21, this.a23,
				     this.a30, this.a31, this.a33);
	    let d13 = new CG.Matrix3(this.a00, this.a01, this.a02,
				     this.a20, this.a21, this.a22,
				     this.a30, this.a31, this.a32);
	    let d20 = new CG.Matrix3(this.a01, this.a02, this.a03,
				     this.a11, this.a12, this.a13,
				     this.a31, this.a32, this.a33);
	    let d21 = new CG.Matrix3(this.a00, this.a02, this.a03,
				     this.a10, this.a12, this.a13,
				     this.a30, this.a32, this.a33);
	    let d22 = new CG.Matrix3(this.a00, this.a01, this.a03,
				     this.a10, this.a11, this.a13,
				     this.a30, this.a31, this.a33);
	    let d23 = new CG.Matrix3(this.a00, this.a01, this.a02,
				     this.a10, this.a11, this.a12,
				     this.a30, this.a31, this.a32);
	    let d30 = new CG.Matrix3(this.a01, this.a02, this.a03,
				     this.a11, this.a12, this.a13,
				     this.a21, this.a22, this.a23);
	    let d31 = new CG.Matrix3(this.a00, this.a02, this.a03,
				     this.a10, this.a12, this.a13,
				     this.a20, this.a22, this.a23);
	    let d32 = new CG.Matrix3(this.a00, this.a01, this.a03,
				     this.a10, this.a11, this.a13,
				     this.a20, this.a21, this.a23);
	    let d33 = new CG.Matrix3(this.a00, this.a01, this.a02,
				     this.a10, this.a11, this.a12,
				     this.a20, this.a21, this.a22);

	    return new Matrix4(d00.determinant(), -d01.determinant(), d02.determinant(), -d03.determinant(),
			       -d10.determinant(), d11.determinant(), -d12.determinant(), d13.determinant(),
			       d20.determinant(), -d21.determinant(), d22.determinant(), -d23.determinant(),
			       -d30.determinant(), d31.determinant(), -d32.determinant(), d33.determinant());
	}

	/**
	 * @return {Number}
	 */
	determinant(){
	    let d00 = new CG.Matrix3(this.a11, this.a12, this.a13,
				     this.a21, this.a22, this.a23,
				     this.a31, this.a32, this.a33);
	    let d01 = new CG.Matrix3(this.a10, this.a12, this.a13,
				     this.a20, this.a22, this.a23,
				     this.a30, this.a32, this.a33);
	    let d02 = new CG.Matrix3(this.a10, this.a11, this.a13,
				     this.a20, this.a21, this.a23,
				     this.a30, this.a31, this.a33);
	    let d03 = new CG.Matrix3(this.a10, this.a11, this.a12,
				     this.a20, this.a21, this.a22,
				     this.a30, this.a31, this.a32);
	    return this.a00*d00.determinant() - this.a01*d01.determinant() + this.a02*d02.determinant() - this.a03*d03.determinant();
	}

	/**
	 * Nos da una Matriz copia igual.
	 * @return {Matrix4}
	 */
	clone(){
	    return new Matrix4(this.a00, this.a01, this.a02, this.a03,
			       this.a10, this.a11, this.a12, this.a13,
			       this.a20, this.a21, this.a22, this.a23,
			       this.a30, this.a31, this.a32, this.a33);
	}

	/**
	 * @param {Matrix4} m1
	 * @param {Matrix4} m2
	 * @return {Boolean}
	 */
	static equals(m1, m2){
	    let m = this.subtract(m1, m2);
	    return m.a00 < epsilon && m.a01 < epsilon && m.a02 < epsilon && m.a03 < epsilon &&
		m.a10 < epsilon && m.a11 < epsilon && m.a12 < epsilon && m.a13 < epsilon &&
		m.a20 < epsilon && m.a21 < epsilon && m.a22 < epsilon && m.a23 < epsilon &&
		m.a30 < epsilon && m.a31 < epsilon && m.a32 < epsilon && m.a33 < epsilon;
	}

	/**
	 * @param {Matrix4} m1
	 * @param {Matrix4} m2
	 * @return {Boolean}
	 */
	static exactEquals(m1, m2){
	    return m1.a00 === m2.a00 &&	m1.a01 === m2.a01 && m1.a02 === m2.a02 && m1.a03 === m2.a03 &&
		m1.a10 === m2.a10 && m1.a11 === m2.a11 && m1.a12 === m2.a12 && m1.a13 === m2.a13 &&
		m1.a20 === m2.a20 && m1.a21 === m2.a21 && m1.a22 === m2.a22 && m1.a23 === m2.a23 &&
		m1.a30 === m2.a30 && m1.a31 === m2.a31 && m1.a32 === m2.a32 && m1.a33 === m2.a33;
	}

	/**
	 * @param {Number} left
	 * @param {Number} right
	 * @param {Number} bottom
	 * @param {Number} top
	 * @param {Number} near
	 * @param {Number} far
	 * @return {Matrix4}
	 */
	static frustum(left, right, bottom, top, near, far){
	    let l = left;
	    let r = right;
	    let b = bottom;
	    let t = top;
	    let n = near;
	    let f = far;
	    return new Matrix4(2*n/(r-l), 0, (r+l)/(r-l), 0,
			       0, 2*n/(t-b), (t+b)/(t-b), 0,
			       0, 0, -(f+n)/(f-n), 2*f*n/(f-n),
			       0, 0, -1, 0);
	}

	/**
	 * Cambia los valores de esta matriz por la identidad
	 */
	identity(){
	    this.a00 = 1;
	    this.a01 = 0;
	    this.a02 = 0;
	    this.a03 = 0;
	    this.a10 = 0;
	    this.a11 = 1;
	    this.a12 = 0;
	    this.a13 = 0;
	    this.a20 = 0;
	    this.a21 = 0;
	    this.a22 = 1;
	    this.a23 = 0;
	    this.a30 = 0;
	    this.a31 = 0;
	    this.a32 = 0;
	    this.a33 = 1;
	}

	/**
	 * @return {Matrix4}
	 */
	invert(){
	    let d = this.determinant();
	    if (d !== 0){
		let m = this.adjoint();
		let x = Matrix4.multiplyScalar(m, 1/d);
		return x;
	    }
	    return "No tiene inversa la matriz"
	}

	/**
	 * @param {Vector3} eye
	 * @param {Vector3} center
	 * @param {Vector3} up
	 * @return {Matrix4}
	 */
	static lookAt(eye, center, up){
	    let w = CG.Vector3.subtract(eye, center).normalize();
	    let u = CG.Vector3.cross(up, w).normalize();
	    let v = CG.Vector3.cross(w, u);
	    return new Matrix4(u.x, u.y, u.w, -CG.Vector3.dot(eye, u),
			       v.x, v.y, v.w, -CG.Vector3.dot(eye, v),
			       w.x, w.y, w.w, -CG.Vector3.dot(eye, w),
			       0, 0, 0, 1);
	}

	/**
	 * @param {Matrix4} m1
	 * @param {Matrix4} m2
	 * @return {Matrix4}
	 */
	static multiply(m1, m2){
	    // Q horror, hay una forma de iterar en los atributos?
	    return new Matrix4(m1.a00*m2.a00 + m1.a01*m2.a10 + m1.a02*m2.a20 + m1.a03*m2.a30,
			       m1.a00*m2.a01 + m1.a01*m2.a11 + m1.a02*m2.a21 + m1.a03*m2.a31,
			       m1.a00*m2.a02 + m1.a01*m2.a12 + m1.a02*m2.a22 + m1.a03*m2.a32,
			       m1.a00*m2.a03 + m1.a01*m2.a13 + m1.a02*m2.a23 + m1.a03*m2.a33,
			       m1.a10*m2.a00 + m1.a11*m2.a10 + m1.a12*m2.a20 + m1.a13*m2.a30,
			       m1.a10*m2.a01 + m1.a11*m2.a11 + m1.a12*m2.a21 + m1.a13*m2.a31,
			       m1.a10*m2.a02 + m1.a11*m2.a12 + m1.a12*m2.a22 + m1.a13*m2.a32,
			       m1.a10*m2.a03 + m1.a11*m2.a13 + m1.a12*m2.a23 + m1.a13*m2.a33,
			       m1.a20*m2.a00 + m1.a21*m2.a10 + m1.a22*m2.a20 + m1.a23*m2.a30,
			       m1.a20*m2.a01 + m1.a21*m2.a11 + m1.a22*m2.a21 + m1.a23*m2.a31,
			       m1.a20*m2.a02 + m1.a21*m2.a12 + m1.a22*m2.a22 + m1.a23*m2.a32,
			       m1.a20*m2.a03 + m1.a21*m2.a13 + m1.a22*m2.a23 + m1.a23*m2.a33,
			       m1.a30*m2.a00 + m1.a31*m2.a10 + m1.a32*m2.a20 + m1.a33*m2.a30,
			       m1.a30*m2.a01 + m1.a31*m2.a11 + m1.a32*m2.a21 + m1.a33*m2.a31,
			       m1.a30*m2.a02 + m1.a31*m2.a12 + m1.a32*m2.a22 + m1.a33*m2.a32,
			       m1.a30*m2.a03 + m1.a31*m2.a13 + m1.a32*m2.a23 + m1.a33*m2.a33);
	}

	/**
	 * @param {Matrix4} m1
	 * @param {Number} c
	 * @return {Matrix4}
	 */
	static multiplyScalar(m1, c){
	    return new Matrix4(m1.a00*c, m1.a01*c, m1.a02*c, m1.a03*c,
			       m1.a10*c, m1.a11*c, m1.a12*c, m1.a13*c,
			       m1.a20*c, m1.a21*c, m1.a22*c, m1.a23*c,
			       m1.a30*c, m1.a31*c, m1.a32*c, m1.a33*c);
	}

	/**
	 * @Param {Vector4} v
	 * @return {Vector4}
	 */
	multiplyVector(v){
	    return new CG.Vector4(this.a00*v.x + this.a01*v.y + this.a02*v.z + this.a03*v.w,
				  this.a10*v.x + this.a11*v.y + this.a12*v.z + this.a13*v.w,
				  this.a20*v.x + this.a21*v.y + this.a22*v.z + this.a23*v.w,
				  this.a30*v.x + this.a31*v.y + this.a32*v.z + this.a33*v.w);
	}

	/**
	 * @param {Number} left
	 * @param {Number} right
	 * @param {Number} bottom
	 * @param {Number} top
	 * @param {Number} near
	 * @param {Number} far
	 * @return {Matrix4}
	 */
	static orthographic(left, right, bottom, top, near, far){
	    let a00 = 2/(right - left);
	    let a11 = 2/(top - bottom);
	    let a22 = -2/(near - far);
	    let a03 = -((right + left)/(right-left));
	    let a13 = -((top + bottom)/(top - bottom));
	    let a23 = -((far + near)/(near - far));
	    return new Matrix4(a00, 0, 0, a03,
			       0, a11, 0, a13,
			       0, 0, a22, a23,
			       0, 0, 0, 1);
	}

	/**
	 * @param {Number} fovy
	 * @param {Number} aspect
	 * @param {Number} near
	 * @param {Number} far
	 * @return {Matrix4}
	 */
	static perspective(fovy, aspect, near, far){
	    let c = 1/Math.tan(fovy/2);
	    let a00 = c/aspect;
	    let a22 = -((far + near)/(far - near));
	    let a23 = -(2*far*near/(far - near));
	    return new Matrix4(a00, 0, 0, 0,
			       0, c, 0, 0,
			       0, 0, a22, a23,
			       0, 0, -1, 0);
	}

	/**
	 * @param {Number} theta
	 * @return {Matrix4}
	 */
	static rotateX(theta){
	    return new Matrix4(1, 0, 0, 0,
			       0, Math.cos(theta), -Math.sin(theta), 0,
			       0, Math.sin(theta), Math.cos(theta), 0,
			       0, 0, 1, 0);
	}

	/**
	 * @param {Number} theta
	 * @return {Matrix4}
	 */
	static rotateY(theta){
	    return new Matrix4(Math.cos(theta), 0, -Math.sin(theta), 0,
			       0, 1, 0, 0,
			       Math.sin(theta), 0,  Math.cos(theta), 0,
			       0, 0, 0, 1);
	}

	/**
	 * @param {Number} theta
	 * @return {Matrix4}
	 */
	static rotateZ(theta){
	    return new Matrix4(Math.cos(theta), -Math.sin(theta), 0, 0,
			       Math.sin(theta), Math.cos(theta), 0, 0,
			       0, 0, 1, 0,
			       0, 0, 0, 1);
	}

	/**
	 * @param {Vector3} v
	 * @return {Matrix4}
	 */
	static scale(v){
	    //To be visited
	    return new Matrix4(this.a00*v.x, 0, 0, 0,
			       0, this.a11*v.y, 0, 0,
			       0, 0, this.a22*v.w, 0,
			       0, 0, 0, 1);
	}

	/**
	 * @param {Number} a00
	 * @param {Number} a01
	 * @param {Number} a02
	 * @param {Number} a03
	 * @param {Number} a10
	 * @param {Number} a11
	 * @param {Number} a12
	 * @param {Number} a13
	 * @param {Number} a20
	 * @param {Number} a21
	 * @param {Number} a22
	 * @param {Number} a23
	 * @param {Number} a30
	 * @param {Number} a31
	 * @param {Number} a32
	 * @param {Number} a33
	 */
	set(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33){
	    this.a00 = a00;
	    this.a01 = a01;
	    this.a02 = a02;
	    this.a03 = a03;
	    this.a10 = a10;
	    this.a11 = a11;
	    this.a12 = a12;
	    this.a13 = a13;
	    this.a20 = a20;
	    this.a21 = a21;
	    this.a22 = a22;
	    this.a23 = a23;
	    this.a30 = a30;
	    this.a31 = a31;
	    this.a32 = a32;
	    this.a33 = a33;
	}

	/**
	 * @param {Matrix4} m1
	 * @param {Matrix4} m2
	 * @return {Matrix4}
	 */
	static subtract(m1, m2){
	    return Matrix4.add(m1, Matrix4.multiplyScalar(m2, -1));
	}

	/**
	 * @param {Vector3} v
	 * @return {Matrix4}
	 */
	static translate(v){
	    //To be continue
	    return new Matrix4(this.a00, 0, 0, v.x,
			       0, this.a11, 0, v.y,
			       0, 0, this.a22, v.w,
			       0, 0, 0, 1);
	}

	/**
	 * Regresa una nueva matriz, transpuesta a this.
	 * @return {Matrix4}
	 */
	transpose(){
	    let a00 = this.a00;
	    let a01 = this.a10;
	    let a02 = this.a20;
	    let a03 = this.a30;
	    let a10 = this.a01;
	    let a11 = this.a11;
	    let a12 = this.a21;
	    let a13 = this.a31;
	    let a20 = this.a02;
	    let a21 = this.a12;
	    let a22 = this.a22;
	    let a23 = this.a32;
	    let a30 = this.a03;
	    let a31 = this.a13;
	    let a32 = this.a23;
	    let a33 = this.a33;
	    return new Matrix4(a00, a01, a02, a03,
			       a10, a11, a12, a13,
			       a20, a21, a22, a23,
			       a30, a31, a32, a33);
	}

	/**
	 * @return {Array}
	 */
	toArray(){
	    let t = this.clone().transpose();
	    return [t.a00, t.a01, t.a02, t.a03,
		    t.a10, t.a11, t.a12, t.a13,
		    t.a20, t.a21, t.a22, t.a23,
		    t.a30, t.a31, t.a32, t.a33];
	}
    }

    CG.Matrix4 = Matrix4;
    return CG;

})(CG || {});
