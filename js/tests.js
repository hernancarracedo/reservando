var expect = chai.expect;

const unResto = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5])
const otroResto = new Restaurant(2, "Pastasciutta", "Pasta", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [])

const listadoTesting = new Listado([unResto, otroResto])

var reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1")
var reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200")
var reserva3 = new Reserva (new Date(2019, 6, 7, 13, 30), 2, 150, "")

// TESTING DE LA FUNCION: reservarHorario(horario)
describe('Test de reserva de horario', function(){

	it('eliminacion de horario reservado', function(){
		unResto.reservarHorario("15:30");
		var a =  unResto.horarios.length;
		expect(a).to.be.equal(2);

		otroResto.reservarHorario("15:30");
		var b =  otroResto.horarios;
		expect(b).to.eql(["13:00","18:00"]);
	})
	
	it('reserva de horario inexistente', function(){
		unResto.reservarHorario("20:00");
		var a =  unResto.horarios.length;
		expect(a).to.be.equal(2);

		unResto.reservarHorario("20:00");
		var b =  unResto.horarios;
		expect(b).to.eql(["13:00","18:00"]);

	})
	
	it('reserva de horario sin pasar parametro', function(){
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

	it('Calculo de puntuacion a un Resto CON calificaciones', function(){
		var a =  unResto.obtenerPuntuacion();
		expect(a).to.be.equal(7.4);
	})

	it('Calculo de puntuacion a un Resto SIN calificaciones', function(){
		var a =  otroResto.obtenerPuntuacion();
		expect(a).to.be.equal(0);
	})

});

// TESTING DE LA FUNCION: calificar()
describe('Test de funcionamiento de calificaciones', function(){

	it('Calificación con nota invalida', function(){
		unResto.calificar(-2);
		var a =  unResto.calificaciones.length;
		expect(a).to.be.equal(5);

		unResto.calificar(17);
		var b =  unResto.calificaciones.length;
		expect(b).to.be.equal(5);		
	})

	it('Calificación con nota Valida', function(){
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

	it('Test de búsqueda con un id de Resto existente.', function(){
		var a =  listadoTesting.buscarRestaurante(2)
		expect(a.nombre).to.be.equal("Pastasciutta");
	})

	it('Test de busqueda con un string en lugar de un nro.', function(){
		var a =  listadoTesting.buscarRestaurante("z")
		expect(a).to.be.equal("No se ha encontrado ningún restaurant");
	})

	it('Test de busqueda con un id inexistente en listado.', function(){
		var a =  listadoTesting.buscarRestaurante(73)
		expect(a).to.be.equal("No se ha encontrado ningún restaurant");
	})

});


// TESTING DE LA FUNCION: buscarRestaurante(id)
describe('Test de busqueda de Restaurantes rubro, ciudad y horario', function(){

	it('Test de búsqueda con tres filtros que existen en listado.', function(){
		var a =  listadoTesting.obtenerRestaurantes("Pasta", "Nueva York", "13:00")
		expect(a[0].nombre).to.be.equal("Pastasciutta");
	})

	it('Test de búsqueda con un filtro de los tres que no coincide con nada en listado.', function(){
		var a =  listadoTesting.obtenerRestaurantes("Puchero", "Nueva York", "13:00").length
		expect(a).to.be.equal(0);
	})

	it('Test de búsqueda sin pasarle ningun parametro para filtra a la funcion.', function(){
		var a =  listadoTesting.obtenerRestaurantes().length
		expect(a).to.be.equal(0);
	})	

});

// TEST DRIVE DEVELOPING
describe('TDD - Test de la funcionalidad de RESERVA', function(){

	it('Test calculo Descuentos en reserva.', function(){
		var a =  reserva3.calcularDescuentos();
		expect(a).to.be.equal(0);

		var b =  reserva2.calcularDescuentos();
		expect(b).to.be.equal(200);
	})	

	it('Test calculo Adicionales en reserva.', function(){
		var a =  reserva1.calcularAdicionales();
		expect(a).to.be.equal(280);

		var b =  reserva2.calcularAdicionales();
		expect(b).to.be.equal(0);
	})	

	it('Test identificacion reservas de fines de semana.', function(){
		var a =  reserva1.esFinDeSemana();
		expect(a).to.be.true;

		var b =  reserva2.esFinDeSemana();
		expect(b).to.be.false;
	})	
	
	it('Test identificacion reservas en hora pico', function(){
		var a =  reserva1.esHorarioPico();
		expect(a).to.be.false;

		var b =  reserva3.esHorarioPico();
		expect(b).to.be.true;
	})

	it('Test de calculo de precio Base de una Reserva.', function(){
		var a =  reserva1.precioBase()
		expect(a).to.be.equal(2800);

		var b =  reserva2.precioBase()
		expect(b).to.be.equal(300);
	})

	it('Test de calculo de precio Final de Reserva.', function(){
		var a =  reserva1.calcularPrecioFinal();
		expect(a).to.be.equal(2450);

		var b =  reserva2.calcularPrecioFinal();
		expect(b).to.be.equal(100);
	})	

});
