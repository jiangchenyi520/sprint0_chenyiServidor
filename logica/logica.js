// // --------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------

// const sqlite3 = require( "sqlite3" )

// const cargador = require( "./cargador.js" )

// // --------------------------------------------------------------------------------
// //
// // nombreBD: Texto -> logica() -> Logica
// //
// // Donde:
// //
// // Logica = { 
// //   f: ( Texto TArg -> () -> TRes ), // para llamar a una función de la lógica por
// //                                     // su nombre en texto
// //   funciones: [ { conexion: TDep, f: TArg -> () -> TRes } ]_Texto // array asociativo
// //                                                             // con las funciones de logica
// // }
// //
// // (ver cargador.js)
// //
// // --------------------------------------------------------------------------------
// module.exports = function ( nombreBD ) {
// 	return new Promise( function( resolver, rechazar ) {

// 		var conexion = new sqlite3.Database( nombreBD , function( err ) {
// 			if ( err ) {
// 				rechazar( "Error en conexión a base de datos: " + err )
// 			}

// 			// console.log(" logica(): conexión abierta con: " + nombreBD )

// 			// conexión establecida con la BD
// 			// activo foreing_keys para sqlite3
// 			conexion.run( "PRAGMA foreign_keys = ON" )

// 			var logica = cargador( __dirname + "/funciones", conexion )

// 			// console.log(" logica(): funciones cargadas " )

// 			resolver( logica )

// 		}) // sqlite3.Database
// 	}) // new Promise
// } // module.exports

// IMPORTANTE 

// // --------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------

// .....................................................................
// Logica.js
// .....................................................................
const sqlite3 = require("sqlite3")
// .....................................................................
// .....................................................................
module.exports = class Logica {
	// .................................................................
	// nombreBD: Texto
	// -->
	// constructor () -->
	// .................................................................
	constructor(nombreBD, cb) {
		this.laConexion = new sqlite3.Database(
			nombreBD,
			(err) => {
				if (!err) {
					this.laConexion.run("PRAGMA foreign_keys = ON")
				}
				cb(err)
			})
	} // ()
	// .................................................................

	// .................................................................
	// datos:{dni:Texto, nombre:Texto: apellidos:Texto}
	// --> insertarPersona() 
	// .................................................................
	// ()


	insertarMedicion(a){  // se le pasa un objeto con los datos dentro
		var textoSQL= "insert into Mediciones values($id, $valor, $fecha, $latitud, $longitud)" ;
		var valoresParaSQL ={
			$id: a.id, 
			$valor: a.valor,
			$fecha: a.fecha, 
			$latitud: a.latitud,
			$longitud: a.longitud
		}
		console.log(a.id);
		console.log(a.valor);
		console.log(a.latitud);
		console.log(a.fecha);
		console.log(a.longitud);

		return new Promise((resolver, rechazar)=> {
			this.laConexion.run(textoSQL, valoresParaSQL, function(err){
				(err? rechazar(err): resolver())
			})
		})
	}

	consultarTodasLasMediciones(){
		var textoSQL = ""
		var valoresParaSQL = {}
		return new Promise((resolver, rechazar) =>{
			(err, res)=> {
				(err ? rechazar(err) : resolver(res))
			}
		})
	}

	consultarMediciones(medicion){
		var textoSQL = "select * from Medicion"
		var valoresParaSQL = {$medicion : medicion}
		return new Promise((resolver,rechazar) =>{
			this.laConexion.all(textoSQL,valoresParaSQL,
				(err,res)=> {
					(err ? rechazar(err) : resolver(res))
				}
			)
		})
	}


	cerrar() {
		return new Promise((resolver, rechazar) => {
			this.laConexion.close((err) => {
				(err ? rechazar(err) : resolver())
			})
		})
	} // ()
} 
// class
// .....................................................................
// .....................................................................
