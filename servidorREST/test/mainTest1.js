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
	// 4. 
	// ........................................................................... 
	it("probar POST /insertarMedicion", function (hecho) {

		// esta función prueba está en logica/funciones/prueba
		var datos = {
			id: null, valor: 1, fecha: "prueba", longitud: 1, latitud: 2
		}

		request.post(
			{
				url: IP_PUERTO + "/insertarMedicion",
				headers: { 'User-Agent': 'Chenyi', 'Content-Type': 'application/json' },
				body: JSON.stringify(datos)
			},
			function (err, respuesta, carga) {
				assert.equal(err, null, "¿ha habido un error?")
				assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
				hecho()
			} // callback
		) // .post
	}) // it

}) // describe
// ........................................................................... 
// it("probar DELETE /borrarConID", function (hecho) {

// 	// esta función prueba está en logica/funciones/prueba
// 	var datos = {}
// 	request.delete(
// 		{
// 			url: IP_PUERTO + "/borrarConID/20",
// 			headers: { 'User-Agent': 'Chenyi', 'Content-Type': 'application/json' },
// 			body: JSON.stringify(datos)
// 		},
// 		function (err, respuesta, carga) {
// 			assert.equal(err, null, "¿ha habido un error?")
// 			assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
// 			hecho()
// 		} // callback
// 	) // .post
// }) // it


// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

