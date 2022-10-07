// --------------------------------------------------------------------------------
// mainServidorREST.js
// --------------------------------------------------------------------------------

var cors  = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const fs = require('fs')

const Logica = require("../logica/logica.js")

// --------------------------------------------------------------------------------
// En vez de tener que instalar una regla para cada función de la lógica
// adopto el convenio (usando solamente GET) que la llamadas son
// 
//  ---------------------------
//  GET /nombreFuncionLogica
// 
//  datos en JSON en el cuerpo
//  ---------------------------
// 
//  de forma que con una regla sobra. Aunque esto "rompe" la filosofía REST.
// 
// --------------------------------L------------------------------------------------
function cargarReglasUniversales(servidorExpress, laLogica) {

	// .......................................................
	// Reglas del API REST
	// .......................................................

	// .......................................................
	// GET /prueba
	// .......................................................
	servidorExpress.get('/prueba', function (peticion, respuesta) {
		console.log(" * GET /prueba ")
		respuesta.send("¡Funciona!")
	}) // get /prueba


	// se copia 
	// .......................................................
	// GET /persona/<dni>
	// .......................................................
	servidorExpress.get("/buscarMedicionesPorId/:id", async function (peticion, respuesta) { //: dni se hace una variable dinámica 
		console.log(" * GET /Mediciones ")
		// averiguo el dni
		var id = peticion.params.id 
		// llamo a la función adecuada de la lógica
		var res = await laLogica.buscarPersonaConId(id)
		// si el array de resultados no tiene una casilla ...
		if (res.length != 1) {
			// 404: not found
			respuesta.status(404).send("no encontré correo: " + id)
			return
		}
		// todo ok
		respuesta.send(JSON.stringify(res[0]))
	}) // get /persona


	// tener en cuenta como se pueden pasar dos parámetros

	// http://localhost:8080/persona/1234A-pepe
	// servidorExpress.get("/persona/:dni - :nombre")
		// var d = peticion.params.dni 
		// var n= peticion.params.nombre

	// la forma anterior es muuy guarra y no se gasta hoy en dia, pero si que funciona. NO CREO QUE A JORDI LE HAGA GRACIA 

	// OTRA FORMA MAS DECENTE 

	// http://localhost::8080/persona?dni=1234A&nombre=Pepe 
	// servidorexpress.get("/persona", function().....) 
			// var d= peticion.query.dni; 
			// var n= query.nombre; 

	// .......................................................
	// POST /alta
	// .......................................................

	servidorExpress.post("/insertarMedicion", async function (peticion, respuesta) {
		var error = null; 
		try 
		{
			console.log(" * POST /insertarMedicion")
			var datos = JSON.parse(peticion.body)
			console.log(datos.id)
			console.log(datos.valor)
			console.log(datos.fecha)
			await laLogica.insertarMedicion(datos); 
			respuesta.send("OK");
		}
		catch(err)
		{
			err= error; 
		}
		}) 


	// .......................................................
	// POST /f/<nombreFuncion>
	// .......................................................
	// servidorExpress.post('/f/:funcion',
	// 	async function (peticion, respuesta) {
	// 		// averiguo el nombre de la función
	// 		var nombreFuncion = peticion.params.funcion

	// 		// aviso
	// 		console.log(" * POST /f/ " + nombreFuncion)

	// 		//
	// 		// llamo a la función adecuada de la lógica
	// 		//
	// 		try {

	// 			var argumentos = null

	// 			// obtengo argumentos del cuerpo
	// 			try {
	// 				argumentos = JSON.parse(peticion.body)
	// 			} catch (error) {
	// 				// ignoro errores, por si no hay body
	// 				// console.log( "        error en JSON.parse " )
	// 			}

	// 			// console.log( "     body=" + peticion.body )
	// 			// console.log( "     body text=" + JSON.stringify( peticion.body ) )
	// 			// console.log( "     argumentos=" + argumentos )

	// 			//
	// 			// esta es la llamada
	// 			//
	// 			var res = await laLogica.llamar(nombreFuncion, argumentos)

	// 			// esta es el envío de la respuesta de la llamada: si es JSON la paso a texto,
	// 			// Si no: la dejo como estaba:
	// 			var laRespuesta = res
	// 			try {
	// 				laRespuesta = JSON.stringify(laRespuesta)
	// 			} catch {
	// 			}
	// 			respuesta.send(laRespuesta)

	// 		} catch (error) {
	// 			// Envío 200 como valor status de HTTP, pero un JSON con la descripción del error
	// 			respuesta.send(JSON.stringify({ error: error }))
	// 		}

	// 	}) // 

	/*
	// .......................................................
	// Las siguientes reglas son para servir html y js "ordinario"
	// .......................................................
	LO HE HECHO ABAJO DE ESTA FORMA:
	servidorExpress.use( express.static( "../ux" ) )

	// .......................................................
	// GET /ux/fichero.html
	// .......................................................
	servidorExpress.get('/ux/:ficheroHTML', function( peticion, respuesta ){

		try {
			var nombreFichero = peticion.params.ficheroHTML

			console.log( " * GET /ux/:ficheroHTML = " + nombreFichero )

			fs.readFile( "../ux/" + nombreFichero, "utf8", function( error, contenido ) {
				if ( error ) {
					respuesta.status(404).send( "Se produjo este error: " + error )
				}

				console.log( "          .... servido" )
				respuesta.send( contenido )
			})
		} catch( error ) {
				respuesta.status(404).send( "Se produjo este error: " + error )
		}
			
	}) // servidorExpress.get(

	// .......................................................
	// GET /ux/logicaFake/:fichero.js
	// .......................................................
	servidorExpress.get('/ux/logicaFake/:ficheroJS', function( peticion, respuesta ){

		try {
			var nombreFichero = peticion.params.ficheroJS

			console.log( " * GET /ux/logicaFake/:ficheroJS = " + nombreFichero )

			fs.readFile( "../ux/logicaFake/" + nombreFichero, "utf8", function( error, contenido ) {
				if ( error ) {
					respuesta.status(404).send( "Se produjo este error: " + error )
				}

				console.log( "          .... servido" )
				respuesta.send( contenido )
			})
		} catch( error ) {
				respuesta.status(404).send( "Se produjo este error: " + error )
		}
			
	}) // servidorExpress.get(

	// .......................................................
	// GET /:cualquierCosa
	// .......................................................
	servidorExpress.get('/:cualquierCosa', function( peticion, respuesta ){

		try {
			var nombreCosa = peticion.params.cualquierCosa

			console.log( " * GET cualquier cosa: = " + nombreCosa )


			respuesta.send( "No puedes pedir cualquier cosa = " + nombreCosa )

		} catch( error ) {
				respuesta.status(404).send( "Se produjo este error: " + error )
		}
			
	}) // servidorExpress.get(
*/
}
// () 

// --------------------------------------------------------------------------------
// main()
// --------------------------------------------------------------------------------
function main() {

	//  
	//  cargo logica abriendo conexión
	//  
	var laLogica = null

	laLogica = new Logica("../bd/datoss.bd", function (err) {
		if (err) {
			throw new Error("No he podido conectar con datos.db")
		}
	})

	//  
	// creo el servidor
	//  
	var servidorExpress = express()

	servidorExpress.use(cors())
	//  
	// para poder acceder a la carga de la petición http
	// (asumiendo que es JSON) hay que hacer esto:
	//  
	// OK: original:
	servidorExpress.use(bodyParser.text({ type: 'application/json' }))

	// Me ha dado problemas: servidorExpress.use( express.json() )

	// no creo que necesite esto: servidorExpress.use(express.urlencoded({ extended: true }));

	//  
	// cargo las reglas REST
	//  
	cargarReglasUniversales(servidorExpress, laLogica)

	//  
	// configuradión automática para que sirva ficheros de ../ux
	//  
	servidorExpress.use(express.static("../ux"))

	//  
	// arranco el servidor
	//  
	var servicio = servidorExpress.listen(8080, function () {
		console.log("servidor REST escuchando en el puerto 8080: http://localhost:8080/Aplicacion.html ")
	})

	//  
	// capturo control-c para cerrar el servicio ordenadamente
	//  
	process.on('SIGINT', function () {
		console.log(" terminando ")
		servicio.close()
	})
} // ()

// --------------------------------------------------------------------------------
// main()
// --------------------------------------------------------------------------------
main()

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
