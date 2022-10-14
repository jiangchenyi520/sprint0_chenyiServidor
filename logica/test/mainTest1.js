// ........................................................
// mainTest.js
// ........................................................
const Logica = require("../Logica.js")
var assert = require("assert")
// ........................................................
// main ()
// ........................................................

// es donde empieza la prueba del test 

describe("Test 1: conectar bbd", function () {
	// ....................................................
	// ....................................................
	var laLogica = null
	// ....................................................
	// ....................................................
	it("conectar a la base de datos", function (hecho) {  // la prueba concreta, el cual tiene su tittulo y un callback con una funcion con cualquier nombre. 
		laLogica = new Logica(  // crear un objeto --> 
			"../bd/datoss.bd",
			function (err) {
				if (err) {
					throw new Error("No he podido conectar con datoss.db")
				}
				hecho()
			})
	}) // it

	// ....................................................
	// ....................................................
	// se prueba si se puede insertar una medicion, consultandola despues. 
	it("puedo insertar una medicion",  
		async function () {
			var error = null; 
			try 
			{
			await laLogica.insertarMedicion(
				{
					id: null, valor: "2323", fecha: "04/10/2022", latitud: "123", longitud: "456"
				})
			var res = await laLogica.consultarMediciones()
			assert.equal(res.length, 1, "¿no hay un resulado?")  // -->  (a, b, c) -> if (a!=b) --> return c 
			assert.equal(res[0].id, null, "null")
			assert.equal(res[0].valor, "2323", "¿no es 2323")  // el assert es un if 
			assert.equal(res[0].fecha,"04/10/2022", "¿NO es 04/10/2022?")

		} catch (err) {
			error= err; 
		}
				
	
	// it

	it("puedo borrar la medicion añadida", async function () {
		await laLogica.borrarConID(10);   
	}) 

	
	// ....................................................
	// ....................................................
	// ....................................................
	it("cerrar conexión a la base de datos",
		async function () {
			try {
				await laLogica.cerrar()
			} catch (err) {
				// assert.equal( 0, 1, "cerrar conexión a BD fallada: " + err)
				throw new Error("cerrar conexión a BD fallada: " + err)
			}
		}) // it
	
})

})