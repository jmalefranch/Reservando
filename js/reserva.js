//Modelado de objeto Reserva
var Reserva = function(horario, cantidadPersonas, precioPersona, codigoDescuento) {
    this.horario = horario;
    this.cantidadPersonas = cantidadPersonas;
    this.precioPersona = precioPersona;
    this.codigoDescuento = codigoDescuento;
};
//Funcion precio Base
Reserva.prototype.precioBase = function(){
    return this.cantidadPersonas * this.precioPersona;
};
//Funcion precio Total/Final
Reserva.prototype.precioFinal = function(){
    var base = this.precioBase();
    var descuento = this.descuentos();
    var adicional = this.adicionales();
    return (base + adicional - descuento);
};
//Funcion descuentos totales
Reserva.prototype.descuentos = function(){
    var descPersonasCantidad = this.descuentosCantidadPersonas();
    var descCodigo = this.descuentosCodigo();
    return descPersonasCantidad + descCodigo;
};
//Funcion adicionales totales
Reserva.prototype.adicionales = function(){
    var adiHoras = this.adicionalHorario();
    var adiFinde = this.adicionalFinde();
    return adiHoras + adiFinde;
};
//Funcion descuentos por cantidad de personas(intervalos [4,6][7,8][9,...])
Reserva.prototype.descuentosCantidadPersonas = function(){
    var precioBase = this.precioBase();
    var cPersonas = this.cantidadPersonas;
    switch (true) {
        case (cPersonas > 3 && cPersonas < 7):
            return precioBase * 0.05;
        case (cPersonas > 6 && cPersonas < 9):
            return precioBase * 0.1;
        case (cPersonas > 8):
            return precioBase * 0.15;
        default:
            return 0;
    } 
};
//Funcion descuentos por codigo
Reserva.prototype.descuentosCodigo = function(){
    var precioBase = this.precioBase();
    var codigo = this.codigoDescuento;
    var precioPersona = this.precioPersona;
    switch (codigo) {
        case "DES15":
            return precioBase * 0.15;
        case "DES200":
            return 200;
        case "DES1":
            return precioPersona;
        default:
            return 0;
    } 
};
//Funcion adicional por hora reservada(intervalos: 13 a 14hs- 20 a 21hs)
Reserva.prototype.adicionalHorario = function(){ 
    var hora = this.horario.getHours();
    var minuto = this.horario.getMinutes();
    var precioBase = this.precioBase();   
    if(hora == 13 || (hora == 14 && minuto == 0) || hora == 20 || (hora == 21 && minuto == 0)){
        return precioBase * 0.05;
    };
    return 0;
};
//funcion adicional por dia reservado findesemana(vier-sab-dom)
Reserva.prototype.adicionalFinde = function(){
    var precioBase = this.precioBase();
    var diaSemana = this.horario.getUTCDay();
    if( (diaSemana==0)||(diaSemana==5)||(diaSemana==6) ){
        return precioBase * 0.1;
    }
    return 0;
};