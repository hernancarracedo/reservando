var expect = chai.expect;

const unResto = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5])
const otroResto = new Restaurant(2, "Pastasciutta", "Pasta", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [])

const listadoTesting = new Listado([unResto, otroResto])

// TESTING DE LA FUNCION: reservarHorario(horario)
describe('Test de reserva de horario', function(){

	it('eliminacion de horario reservado #1', function(){
		unResto.reservarHorario("15:30");
		var a =  unResto.horarios.length;
		expect(a).to.be.equal(2);
	})

	it('eliminacion de horario reservado #2', function(){
		otroResto.reservarHorario("15:30");
		var a =  unResto.horarios;
		expect(a).to.eql(["13:00","18:00"]);
	})
	
	it('reserva de horario inexistente #1', function(){
		unResto.reservarHorario("20:00");
		var a =  unResto.horarios.length;
		expect(a).to.be.equal(2);
	})

	it('reserva de horario inexistente #2', function(){
		unResto.reservarHorario("20:00");
		var a =  unResto.horarios;
		expect(a).to.eql(["13:00","18:00"]);
	})
	
	it('reserva de horario sin pasar parametro #1', function(){
		unResto.reservarHorario();
		var a =  unResto.horarios.length;
		expect(a).to.be.equal(2);
	})

	it('reserva de horario sin pasar parametro #2', function(){
		unResto.reservarHorario();
		var a =  unResto.horarios;
		expect(a).to.eql(["13:00","18:00"]);
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

	it('Calificacion con nota invalida (nro negativo)', function(){
		unResto.calificar(-2);
		var a =  unResto.calificaciones.length;
		expect(a).to.be.equal(5);
	})

	it('calificacion con nota invalida (un nro mayor a 10)', function(){
		unResto.calificar(17);
		var a =  unResto.calificaciones.length;
		expect(a).to.be.equal(5);
	})

	it('calificacion con nota Valida, nueva longitud lista de notas', function(){
		unResto.calificar(9);
		var a =  unResto.calificaciones.length;
		expect(a).to.be.equal(6);
	})

	it('calificacion con nota Valida, nueva Puntuacion a sumar notas', function(){
		unResto.calificar(3);
		var a =  unResto.obtenerPuntuacion();
		expect(a).to.be.equal(7);
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

