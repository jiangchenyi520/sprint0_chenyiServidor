// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------


// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
const request = require ('request')
const assert = require ('assert')

const IP_PUERTO="http://localhost:8080"

// --------------------------------------------------------------------------------
// main ()
// --------------------------------------------------------------------------------
describe( "Test 1: pon aquí tu comentario (recuerda arrancar el servidor)", function() {

	// ........................................................................... 
	// 1.
	// ........................................................................... 
	it( "probar que GET /prueba responde ¡Funciona!", function( hecho ) {
		request.get(
			{ url : IP_PUERTO+"/prueba", headers : { 'User-Agent' : 'Chenyi' }},
			function( err, respuesta, carga ) {
				assert.equal( err, null, "¿ha habido un error?" )
				assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
				assert.equal( carga, "¡Funciona!", "¿La carga no es ¡Funciona!?" )
				hecho()
			} // callback()
		) // .get
	}) // it

	// ........................................................................... 
	// 2. 
	// ........................................................................... 
	it( "probar POST /insertarCliente", function( hecho ) {

		// esta función prueba está en logica/funciones/prueba

		request.post(
			{ url : IP_PUERTO+"/insertarCliente",
			  headers : { 'User-Agent' : 'Chenyi', 'Content-Type' : 'application/json' },
			  body : JSON.stringify( "hola" )
			},
			function( err, respuesta, carga ) {
				assert.equal( err, null, "¿ha habido un error?" )
				assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
				hecho()
			} // callback
		) // .post
	}) // it

	// ........................................................................... 
	// 3. 
	// ........................................................................... 
	it( "probar POST /f/borrarFilasDeTodasLasTablas", function( hecho ) {

		// esta función prueba está en logica/funciones/prueba

		request.post(
			{ url : IP_PUERTO+"/borrarFilasDeTodasLasTablas",
			  headers : { 'User-Agent' : 'jordi', 'Content-Type' : 'application/json' },
			  body : null
			},
			function( err, respuesta, carga ) {

				// console.log( " carga: " + carga )

				assert.equal( err, null, "¿ha habido un error?" )
				assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
				hecho()
			} // callback
		) // .post
	}) // it

	// ........................................................................... 
	// 4. 
	// ........................................................................... 
	it( "probar POST /insertarCliente", function( hecho ) {

		request.post(
			{ url : IP_PUERTO+"/insertarCliente",
			  headers : { 'User-Agent' : 'Chenyi', 'Content-Type' : 'application/json' },
			  body : JSON.stringify( {dni: "1234A", nombre: "Pepe", apellidos: "García Pérez" } )
			},
			function( err, respuesta, carga ) {

				assert.equal( err, null, "¿ha habido un error?: " + err )
				assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
				hecho()
			} // callback
		) // .post
	}) // it

	// ........................................................................... 
	// 5. 
	// ........................................................................... 
	it( "probar POST /buscarPersonaConCorreo", function( hecho ) {

		request.post(
			{ url : IP_PUERTO+"/buscarPersonaConCorreo",
			  headers : { 'User-Agent' : 'Chenyi', 'Content-Type' : 'application/json' },
			  body : JSON.stringify( {correo: "1234@gmail.com" } )
			},
			function( err, respuesta, carga ) {

				assert.equal( err, null, "¿ha habido un error?: " + err )
				assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )

				// console.log( " carga = " + carga )

				var resultados = JSON.parse( carga )

				assert.equal( resultados.length, 1, "¿No hay un resultado" )
				assert.equal( resultados[0].correo, "1234@gmail.com", "¿No es el correo que he buscado?" )

				hecho()
			} // callback
		) // .post
	}) // it

	//

	// it( "probar POST /f/insertarPersona", function( hecho ) {

	// 	request.post(
	// 		{ url : IP_PUERTO+"/f/insertarAsignatura",
	// 		  headers : { 'User-Agent' : 'chenyi', 'Content-Type' : 'application/json' },
	// 		  body : JSON.stringify( {codigo: "8907778", asignatura: "OA" } )
	// 		},
	// 		function( err, respuesta, carga ) {

	// 			assert.equal( err, null, "¿ha habido un error?: " + err )
	// 			assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
	// 			hecho()
	// 		} // callback
	// 	) // .post
	// }) // it
}) // describe

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

