var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

//  FUNCION REFACTORIZADA. Pampa.-
Restaurant.prototype.reservarHorario = function(horarioReservado) {
    this.horarios = this.horarios.filter(horario => horario != horarioReservado);
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

//  FUNCION CREADA PARA MODULARIZAR. Pampa.-
Restaurant.prototype.sumatoria = function (numeros) {
    if (numeros.length === 0) {
        return 0;
    } else {
        var sumatoria = 0;
        for (var i = 0; i < numeros.length; i++) {
            sumatoria += numeros[i]
        }
        return sumatoria;
    }
};

//  FUNCION CREADA PARA MODULARIZAR. Pampa.-
Restaurant.prototype.promedio = function (numeros) {
    if (numeros.length === 0) {
        return 0;
    } else { 
        var promedio = this.sumatoria(numeros)  / numeros.length;
        return Math.round(promedio * 10) / 10;
    }
}

//  FUNCION REFACTORIZADA. Pampa.-
Restaurant.prototype.obtenerPuntuacion = function() {
    return this.promedio(this.calificaciones);
}

