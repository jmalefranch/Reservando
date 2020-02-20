var expect = chai.expect; 
//PASO 2
//Requerimiento: función que elimina un horario reservado.
describe('Reservar Horario', function(){

    beforeEach(function(){
        restaurante = new Restaurant(
                                              1,
                                              'TAO Uptown',
                                              'Asiática',
                                              'Nueva York',
                                              ["13:00", "15:30", "18:00"],
                                              '../img/asiatica1.jpg',
                                             [ 6, 7, 9, 10, 5 ],
        );
    })

    it('Cuando se reserva ("15:30") del arreglo de horarios del restaurante:["13:00", "15:30", "18:00"], nos queda el arreglo: ["13:00", "18:00"]',function(){
        var cantidadAnterior = restaurante.horarios.length;
        restaurante.reservarHorario("15:30");
        var horarioNuevo = ["13:00", "18:00"];
        expect(restaurante.horarios.length).to.equal(cantidadAnterior - 1);
        expect(restaurante.horarios).to.eql(horarioNuevo);
    })

    it('Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.',function(){
        var horarios = restaurante.horarios.slice();
        restaurante.reservarHorario("22:00");
        expect(restaurante.horarios).to.eql(horarios);
    })

    it('Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.',function(){
        var horarios = restaurante.horarios.slice();
        restaurante.reservarHorario();
        expect(restaurante.horarios).to.eql(horarios);
    })

});
//PASO 3
describe('Obtener Puntuacion', function(){
    beforeEach(function(){
        restaurante = new Restaurant(
                                              1,
                                              'TAO Uptown',
                                              'Asiática',
                                              'Nueva York',
                                              ["13:00", "15:30", "18:00"],
                                              '../img/asiatica1.jpg',
                                              [6, 7, 9, 10, 5],
        );
    })

    it('Dado un restaurant con calificaciones: [6, 7, 9, 10, 5], la puntuación (que es el promedio de ellas) se calcula correctamente: 7.4',function(){
        expect(restaurante.obtenerPuntuacion()).to.equal(7.4);
    })

    it('Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.',function(){
        restaurante.calificaciones = [];
        expect(restaurante.obtenerPuntuacion()).to.equal(0);
    })

});
//PASO 4
describe('Calificar', function(){

    beforeEach(function(){
        restaurante = new Restaurant(
                                              1,
                                              'TAO Uptown',
                                              'Asiática',
                                              'Nueva York',
                                              ["13:00", "15:30", "18:00"],
                                              '../img/asiatica1.jpg',
                                              [6, 7, 9, 10, 5],
        );
    })

    it('Dado un restaurant con calificaciones: [6, 7, 9, 10, 5], calificar con valor válido: (3) devuelve: [6, 7, 9, 10, 5, 3].',function(){
        restaurante.calificar(3);
        expect(restaurante.calificaciones.length).to.equal(6);
        expect(restaurante.calificaciones).to.eql([6, 7, 9, 10, 5, 3]);
    })

    it('Dado un restaurant con calificaciones: [6, 7, 9, 10, 5], calificar con valor inválido: (11), devuelve las misma calificaciones.',function(){
        var anteriorCalificaciones = restaurante.calificaciones.length;
        restaurante.calificar(11);
        var arrayNuevo = restaurante.calificaciones.slice();
        expect(restaurante.calificaciones.length).to.equal(anteriorCalificaciones);
        expect(restaurante.calificaciones).to.eql(arrayNuevo);
    })

    it('Dado un restaurant con calificaciones: [6, 7, 9, 10, 5], calificar con valor vacio: (), devuelve las misma calificaciones.',function(){
        var anteriorCalificaciones = restaurante.calificaciones.length;
        restaurante.calificar();
        var arrayNuevo = restaurante.calificaciones.slice();
        expect(restaurante.calificaciones.length).to.equal(anteriorCalificaciones);
        expect(restaurante.calificaciones).to.eql(arrayNuevo);
    })

    it('Dado un restaurant con calificaciones: [6, 7, 9, 10, 5], calificar con valor no entero: (3.5), devuelve las misma calificaciones.',function(){
        var anteriorCalificaciones = restaurante.calificaciones.length;
        restaurante.calificar(3.5);
        var arrayNuevo = restaurante.calificaciones.slice();
        expect(restaurante.calificaciones.length).to.equal(anteriorCalificaciones);
        expect(restaurante.calificaciones).to.eql(arrayNuevo);
    })

});
//PASO 5
describe('Buscar Restaurante por id', function(){

    beforeEach(function(){
        res1= new Restaurant(3, "A", "desayuno", "SL", ["10:00"], "../img/asiatica1.jpg", [7]);
        res2 = new Restaurant(4, "B", "merienda", "Cdba", ["7:00"], "../img/asiatica2.jpg", [7]);
        miListado = new Listado([res1, res2]);
    })

    it('Dado un una lista de restaurantes que contiene uno con id:3, se busca por este atributo y se devuelve correctamente.',function(){
        expect(miListado.buscarRestaurante(3)).to.eql(res1);
    })

    it('Dado un una lista de restaurantes se busca uno con id que no existe ->(1) y se devuelve: No se ha encontrado ningún restaurant.',function(){
        expect(miListado.buscarRestaurante(1)).to.equal("No se ha encontrado ningún restaurant");
    })

    it('Dado una lista de restaurantes se busca uno por id vacío y se devuelve: No se ha encontrado ningún restaurant.',function(){
        expect(miListado.buscarRestaurante()).to.equal("No se ha encontrado ningún restaurant");
    })

});
//PASO 6
describe('Obtener Restaurantes', function(){

    beforeEach(function(){
        res1= new Restaurant(3, "A", "Asiática", "SL", ["18:00"], "../img/asiatica1.jpg", [7]);
        res2 = new Restaurant(4, "B", "merienda", "Cdba", ["7:00"], "../img/asiatica2.jpg", [7]);
        res3 = new Restaurant(1, "C", "Asiática", "SL", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
        miListado = new Listado([res1, res2, res3]);
    })

    it('Dado un listado de restaurantes se buscar por filtros ("Asiática","SL","18:00") y se devuelven dos que cumplen las condiciones.',function(){
        expect(miListado.obtenerRestaurantes("Asiática","SL","18:00")).to.eql([res1, res3]);
    })

    it('Dado un listado de restaurant buscarlo por filtros ("Cena","Mdza","20:00") que no existen, devuelve array vacio.',function(){
        expect(miListado.obtenerRestaurantes("Cena","Mdza","20:00")).to.eql([]);
    })

    
    it('Dado un listado de restaurant buscarlo por  filtros ("","", "") devuelve array vacio.',function(){
        expect(miListado.obtenerRestaurantes("","", "")).to.eql([]);
    })

});

/*************************************************/
/****Test precioBase y precioFinal de reserva ****/
/*************************************************/
describe('Precio Base', function(){

    it('Dada la reserva (new Date(2018, 6, 9, 11, 0), 3, 200, "") se devuelve el precio base 600.',function(){
        var res1 = new Reserva(new Date(2018, 6, 9, 11, 0), 3, 200, "");
        expect(res1.precioBase()).to.equal(600);
    })

    it('Dada la reserva (new Date(2018, 6, 9, 11, 0), "", 200, "") sin cantidad de personas se devuelve el precio base 0.',function(){
        var res1 = new Reserva(new Date(2018, 6, 9, 11, 0), "", 200, "");
        expect(res1.precioBase()).to.equal(0);
    })

    it('Dada la reserva (new Date(2018, 6, 9, 11, 0), 3, "", "") sin precio por persona se devuelve el precio base 0.',function(){
        var res1 = new Reserva(new Date(2018, 6, 9, 11, 0), "", 200, "");
        expect(res1.precioBase()).to.equal(0);
    })
});

describe('Precio Final', function(){

    it('Dada la reserva (new Date(2018, 6, 9, 11, 0), 5, 200, "") se realiza descuento de 5% por cantidad de personas (entre 4 y 6) y devuelve PF: 950.',function(){
        var res1 = new Reserva(new Date(2018, 6, 9, 11, 0), 5, 200, "");
        expect(res1.precioFinal()).to.equal(950);
    })

    it('Dada la reserva (new Date(2018, 6, 9, 11, 0), 8, 200, "") se realiza descuento de 10% por cantidad de personas (entre 7 y 8) y devuelve PF: 1440.',function(){
        var res1 = new Reserva(new Date(2018, 6, 9, 11, 0), 8, 200, "");
        expect(res1.precioFinal()).to.equal(1440);
    })

    it('Dada la reserva (new Date(2018, 6, 9, 11, 0), 10, 200, "") se realiza descuento de 15% por cantidad de personas (más de 8) y devuelve PF: 1700.',function(){
        var res1 = new Reserva(new Date(2018, 6, 9, 11, 0), 10, 200, "");
        expect(res1.precioFinal()).to.equal(1700);
    })

    it('Dada la reserva (new Date(2018, 6, 9, 11, 0), 1, 200, "") no se realiza descuento por cantidad de personas (menos de 4) y devuelve PF: 200.',function(){
        var res1 = new Reserva(new Date(2018, 6, 9, 11, 0), 1, 200, "");
        expect(res1.precioFinal()).to.equal(200);
    })

    it('Dada la reserva (new Date(2018, 6, 9, 11, 0), 3, 200, "DES15") realiza descuento de 15% por código DES15 y devuelve PF: 510.',function(){
        var res1 = new Reserva(new Date(2018, 6, 9, 11, 0), 3, 200, "DES15");
        expect(res1.precioFinal()).to.equal(510);
    })

    it('Dada la reserva (new Date(2018, 6, 9, 11, 0), 3, 200, "DES200") realiza descuento de $200 por código DES200 y devuelve PF: 400.',function(){
        var res1 = new Reserva(new Date(2018, 6, 9, 11, 0), 3, 200, "DES200");
        expect(res1.precioFinal()).to.equal(400);
    })

    it('Dada la reserva (new Date(2018, 6, 9, 11, 0), 3, 200, "DES200") realiza descuento de $200 por código DES200 y devuelve PF: 400.',function(){
        var res1 = new Reserva(new Date(2018, 6, 9, 11, 0), 3, 200, "DES200");
        expect(res1.precioFinal()).to.equal(400);
    })

    it('Dada la reserva (new Date(2018, 6, 9, 11, 0), 3, 300, "DES1") realiza descuento de $300 por código DES1 y devuelve PF: 600.',function(){
        var res1 = new Reserva(new Date(2018, 6, 9, 11, 0), 3, 300, "DES1");
        expect(res1.precioFinal()).to.equal(600);
    })

    it('Dada la reserva (new Date(2018, 6, 9, 13, 30), 3, 200, "") cobra adicional de 5% por horario y devuelve PF: 630.',function(){
        var res1 = new Reserva(new Date(2018, 6, 9, 13, 30), 3, 200, "");
        expect(res1.precioFinal()).to.equal(630);
    })

    it('Dada la reserva (new Date(2018, 6, 7, 11, 30), 3, 200, "") cobra adicional de 10% por fin de semana y devuelve PF: 660.',function(){
        var res1 = new Reserva(new Date(2018, 6, 7, 11, 30), 3, 200, "");
        expect(res1.precioFinal()).to.equal(660);
    })

    it('Dada la reserva (new Date(2018, 6, 7, 13, 30), 10, 200, "DES1") cobra adicional de 10% por fin de semana, 5% por hora de reserva, se descuenta 15% por cantidad de personas, ademas un descuento DES1 lo que da un PF: 1800.',function(){
        var res1 = new Reserva(new Date(2018, 6, 7, 13, 30), 10, 200, "DES1");
        expect(res1.precioFinal()).to.equal(1800);
    })
});
