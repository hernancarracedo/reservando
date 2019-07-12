var expect = chai.expect;

const unResto = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5])
const otroResto = new Restaurant(2, "Pastasciutta", "Pasta", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [])

const listadoTesting = new Listado([unResto, otroResto])

var reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1")
var reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200")
var reserva3 = new Reserva (new Date(2019, 6, 7, 13, 30), 2, 150, "")

// TESTING DE LA FUNCION: reservarHorario(horario)
describe('Test de reserva de horario', function(){

	it('Si se reserva un horario disponible en el array, este se borra de dicho array.', function(){
		unResto.reservarHorario("15:30");
		var a =  unResto.horarios.length;
		expect(a).to.be.equal(2);

		otroResto.reservarHorario("15:30");
		var b =  otroResto.horarios;
		expect(b).to.eql(["13:00","18:00"]);
	})
	
	it('Si se reserva un horario inexistente, el array permanece sin cambios', function(){
		unResto.reservarHorario("20:00");
		var a =  unResto.horarios.length;
		expect(a).to.be.equal(2);

		unResto.reservarHorario("20:00");
		var b =  unResto.horarios;
		expect(b).to.eql(["13:00","18:00"]);

	})
	
	it('Si no se pasa parámetro de horario, el array permanece sin cambios', function(){
		unResto.reservarHorario();
		var a =  unResto.horarios.length;
		expect(a).to.be.equal(2);

		unResto.reservarHorario();
		var b =  unResto.horarios;
		expect(b).to.eql(["13:00","18:00"]);		
	})

});


// TESTING DE LA FUNCION: obtenerPuntuacion()
describe('Test de obtención de puntuación', function(){

	it('Se calcula la puntuacion de un restaurant que ya tiene notas y devuelve el promedio de los elementos del array.', function(){
		var a =  unResto.obtenerPuntuacion();
		expect(a).to.be.equal(7.4);
	})

	it('Al calcular la puntuacion de un restaurant que aun no tienen notas en array la función no da error y devuelve "0"', function(){
		var a =  otroResto.obtenerPuntuacion();
		expect(a).to.be.equal(0);
	})

});

// TESTING DE LA FUNCION: calificar()
describe('Test de funcionamiento de calificaciones', function(){

	it('Al ingresar calificación no válida el array de calificaciones no se modifica.', function(){
		unResto.calificar(-2);
		var a =  unResto.calificaciones.length;
		expect(a).to.be.equal(5);

		unResto.calificar(17);
		var b =  unResto.calificaciones.length;
		expect(b).to.be.equal(5);		
	})

	it('Se ingresa nota o calificacion correcta y esta se agrega al array de calificaciones.', function(){
		unResto.calificar(9);
		var a =  unResto.calificaciones.length;
		expect(a).to.be.equal(6);

		unResto.calificar(3);
		var b =  unResto.obtenerPuntuacion();
		expect(b).to.be.equal(7);

		otroResto.calificar(10);
		var c =  otroResto.calificaciones.length;
		expect(c).to.be.equal(1);		
	})

});

// TESTING DE LA FUNCION: buscarRestaurante(id)
describe('Test de busqueda de Restaurantes por id en listado de Restó', function(){

	it('Al buscar un Restaurant con un id existente la misma devuelve el Restó correcto.', function(){
		var a =  listadoTesting.buscarRestaurante(2)
		expect(a.nombre).to.be.equal("Pastasciutta");
	})

	it('La funcion acepta un strings como parámetro de búsqueda sin arrojar errores.', function(){
		var a =  listadoTesting.buscarRestaurante("z")
		expect(a).to.be.equal("No se ha encontrado ningún restaurant");
	})

	it('Si se busca con un id inexistente en listado de restaurants, devuelve el mensaje correcto como resultado.', function(){
		var a =  listadoTesting.buscarRestaurante(73)
		expect(a).to.be.equal("No se ha encontrado ningún restaurant");
	})

});


// TESTING DE LA FUNCION: buscarRestaurante(id)
describe('Test de busqueda de Restaurantes rubro, ciudad y horario', function(){

	it('Se prueba la funcion con 3 filtros que existen en el listado de restoranes y el array obtenido contiene el resultado correcto.', function(){
		var a =  listadoTesting.obtenerRestaurantes("Pasta", "Nueva York", "13:00")
		expect(a[0].nombre).to.be.equal("Pastasciutta");
	})

	it('Si uno de los 3 string para filtrar no existe en listado de Restaurant el array resultante será vacio.', function(){
		var a =  listadoTesting.obtenerRestaurantes("Puchero", "Nueva York", "13:00").length
		expect(a).to.be.equal(0);
	})

	it('Si se llama la funcion sin pasarle ningún parámetro para filtrar, devuelve un array vacio si arrojar error.', function(){
		var a =  listadoTesting.obtenerRestaurantes().length
		expect(a).to.be.equal(0);
	})	

});

// TEST DRIVE DEVELOPING
describe('TDD - Test de la funcionalidad de RESERVA', function(){

	it('Calculo de descuentos en una reserva que no posee descuentos (que se obtiene 0) y en una que si posee descuentos.', function(){
		var a =  reserva3.calcularDescuentos();
		expect(a).to.be.equal(0);

		var b =  reserva2.calcularDescuentos();
		expect(b).to.be.equal(200);
	})	

	it('Calculo de Adicionales en una reserva que no le corresponden adicionales (que se obtiene 0) y en una que si posee adicionales.', function(){
		var a =  reserva1.calcularAdicionales();
		expect(a).to.be.equal(280);

		var b =  reserva2.calcularAdicionales();
		expect(b).to.be.equal(0);
	})	

	it('Se verifica segun fecha de reserva si es en fin de semana devolviendo "True" si es finde y "False" si no es.', function(){
		var a =  reserva1.esFinDeSemana();
		expect(a).to.be.true;

		var b =  reserva2.esFinDeSemana();
		expect(b).to.be.false;
	})	
	
	it('Se verifica segun hora de reserva si es en hora pico (13 a 14 o 20 a 21) devolviendo "True" si es hora pico y "False" si no es hora pico.', function(){
		var a =  reserva1.esHorarioPico();
		expect(a).to.be.false;

		var b =  reserva3.esHorarioPico();
		expect(b).to.be.true;
	})

	it('Calcula precio base de la reserva que se obtiene multiplicando "Cant personas" * "Precio por persona".', function(){
		var a =  reserva1.precioBase()
		expect(a).to.be.equal(2800);

		var b =  reserva2.precioBase()
		expect(b).to.be.equal(300);
	})	

	it('Calcula precio Final de la Reserva que se obtiene sumarle los adicionales y restarle los descuento a Precio Base.', function(){
		var a =  reserva1.calcularPrecioFinal();
		expect(a).to.be.equal(2450);

		var b =  reserva2.calcularPrecioFinal();
		expect(b).to.be.equal(100);
	})	
});
