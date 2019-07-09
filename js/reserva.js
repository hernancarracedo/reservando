var Reserva = function(horario, cantPersonas, precioPorPersona, codigoDescuento) {
    this.horario = horario;
    this.cantPersonas = cantPersonas;
    this.precioPorPersona = precioPorPersona;
    this.codigoDescuento = codigoDescuento;
}

Reserva.prototype.precioBase = function() {
    return this.cantPersonas * this.precioPorPersona;
}

Reserva.prototype.precioBase = function() {
    return this.cantPersonas * this.precioPorPersona;
}

Reserva.prototype.esHorarioPico = function() {
    let horas = this.horario.getHours();
    let minutos = this.horario.getMinutes();
    return (( (horas == 13) || ((horas == 14) && (minutos == 0)) ) || ( (horas == 20) || ((horas == 21) && (minutos == 0)) ));
}

Reserva.prototype.esFinDeSemana = function() {
    let dia = this.horario.getDay();
    return ( (dia == 5) || (dia == 6) || (dia == 0) );
}

// acá en el switch calculo descuentos segun codigo o cupon de reserva
Reserva.prototype.calcularDescuentosPorCodigo = function() {
    let descuentos = 0;    

    let cod = this.codigoDescuento;
    switch (cod) { 
        case 'DES15':
          descuentos += ((this.precioBase())*0.15);
          break;
        case 'DES200':
          descuentos += 200;
          break; 
        case 'DES1':
          descuentos += this.precioPorPersona;
          break;
        default:
          descuentos += 0;
    }

    return descuentos;
}   

// en  esta secuencia de if agrego a la variable descuentos lo que corresponda por cantidad de comensales
Reserva.prototype.calcularDescuentosPorCantidad = function() {
    let descuentos = 0;      
    if ((this.cantPersonas >= 4) && (this.cantPersonas <= 6)) {
        descuentos += (this.precioBase())* 0.05;
    } else { 
        if ((this.cantPersonas > 6) && (this.cantPersonas <= 8)) {
            descuentos += (this.precioBase())*0.10;
        } else if (this.cantPersonas > 8) {
            descuentos += (this.precioBase())* 0.15;
        }
    }

    return descuentos;
}

Reserva.prototype.calcularDescuentos = function() {
    return this.calcularDescuentosPorCodigo() + this.calcularDescuentosPorCantidad();
}


Reserva.prototype.calcularAdicionales = function() {
    let adicionales = 0;

    if (this.esHorarioPico()) {
        adicionales += (this.precioBase() * 0.05);
    }
    if (this.esFinDeSemana()) {
        adicionales += (this.precioBase() * 0.1);
    }
    return adicionales;
}

Reserva.prototype.calcularPrecioFinal = function() {
    return this.precioBase() + this.calcularAdicionales() - this.calcularDescuentos();
}

//let precioFinalReserva1 = reserva1.precioBase() + reserva1.calcularAdicionales() - reserva1.calcularDescuentos();