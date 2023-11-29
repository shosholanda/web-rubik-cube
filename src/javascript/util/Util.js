var CG = (function(CG) {

    /* Funciones útiles para reutilizar */
    class Util {

	static print_tuplas(v){
	    let s = "Vertices";
	    for (let i = 0; i < v.length; i++){
		if (i%3 == 0) s+= "\nv" + (i/3) + ": "
		s+= v[i] + ", ";
	    }
	    return s;
	}

	/**
	 * Nos regresa triángulos con vértices repetidos
	 */
	static getFlatVertices(vertices, faces){
	    let flat = [];
	    for (let i = 0; i < faces.length; i++){
		flat.push(vertices[faces[i]*3],
			  vertices[faces[i]*3+1],
			  vertices[faces[i]*3+2]);
	    }
	    // console.log("Triángulos repetidos. Total de vértices ", flat.length);
	    // console.log(this.print_tuplas(flat));
	    return flat;
	}

	/**
	 * Nos regresa las normales de los vértices q comparten la misma normal (un triángulo)
	 */
	static getFlatNormals(vertices){
	    let normales = [];
	    let v1 = new CG.Vector3();
	    let v2 = new CG.Vector3();
	    let v3 = new CG.Vector3();
	    
	    for (let i = 0; i < vertices.length; i+=9){
		v1.set(vertices[i],
		       vertices[i+1],
		       vertices[i+2]);
		v2.set(vertices[i+3],
		       vertices[i+4],
		       vertices[i+5]);
		v3.set(vertices[i+6],
		       vertices[i+7],
		       vertices[i+8]);
		v1 = CG.Vector3.subtract(v1, v2);
		v2 = CG.Vector3.subtract(v2, v3);

		// NOOO POR QUÉ ME QUEDARON AL REVÉS MIS NORMALESSSS?? 
		let v_norm = CG.Vector3.cross(v2, v1).normalize();
		normales.push(v_norm.x, v_norm.y, v_norm.w, // normal de la punta1
			      v_norm.x, v_norm.y, v_norm.w, // normal de la punta2
			      v_norm.x, v_norm.y, v_norm.w  // normal de la punta3
			     );
	    }
	    // console.log("Total de normales: ", normales.length);
	    // console.log(this.print_tuplas(normales));
	    return normales;
	}

	/* Nos regresa el promedio de las normales que comparten los vértices de un triángulo 
	 * (smooth)
	 */
	static getSmoothNormals(vertices, faces){
	    let normals = [];
	    let v1 = new CG.Vector3();
	    let v2 = new CG.Vector3();
	    let v3 = new CG.Vector3();
	    let i1, i2, i3;
	    let tmp = new CG.Vector3();
	    let n;
	    
	    for (let i=0; i<faces.length; i+=3) {
		i1 = faces[i  ]*3;
		i2 = faces[i+1]*3;
		i3 = faces[i+2]*3;
		
		v1.set( vertices[i1], vertices[i1 + 1], vertices[i1 + 2] );
		v2.set( vertices[i2], vertices[i2 + 1], vertices[i2 + 2] );
		v3.set( vertices[i3], vertices[i3 + 1], vertices[i3 + 2] );
		n = CG.Vector3.cross(CG.Vector3.subtract(v2, v1), CG.Vector3.subtract(v2, v3)).normalize();
		
		tmp.set( normals[i1], normals[i1+1], normals[i1+2] );
		tmp = CG.Vector3.add(tmp, n);
		normals[i1  ] = tmp.x;
		normals[i1+1] = tmp.y;
		normals[i1+2] = tmp.w;
		
		tmp.set( normals[i2], normals[i2+1], normals[i2+2] );
		tmp = CG.Vector3.add(tmp, n);
		normals[i2  ] = tmp.x;
		normals[i2+1] = tmp.y;
		normals[i2+2] = tmp.w;
		
		tmp.set( normals[i3], normals[i3+1], normals[i3+2] );
		tmp = CG.Vector3.add(tmp, n);
		normals[i3  ] = tmp.x;
		normals[i3+1] = tmp.y;
		normals[i3+2] = tmp.w;
	    }
	    
	    for (let i=0; i<normals.length; i+=3) {
		tmp.set(normals[i], normals[i+1], normals[i+2]);
		tmp = tmp.normalize();
		normals[i  ] = tmp.x;
		normals[i+1] = tmp.y;
		normals[i+2] = tmp.w;
	    }
	    // console.log("Total de normales: ", normals.length);
	    // console.log(this.print_tuplas(normals));
	    return normals;
	    // return vertices;
	}

    }

    CG.Util = Util;
    return CG;

}) (CG || {});
