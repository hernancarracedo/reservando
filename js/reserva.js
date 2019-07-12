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

    switch (this.codigoDescuento) { 
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

/*
Mi forma de calcular los descuentos o adicionales que impliquen un porcentaje y no una suma fija es: cada descuento 
individualmente usando en cada caso valor "precio base" de la reserva como base y luego de haber obtenido cada Adicional 
y Descuento de la reserva en cuestión, sumo o resto todos los descuentos obtenidos.  
Imagino otras maneras de realizar estos cálculos.  Yo elegí esta que describí antes.  
*/
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