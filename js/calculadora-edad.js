// =============================================
// Herramienta 1: Calculadora de Edad
// =============================================
(function() {
    'use strict';
    
    var formularioEdad = document.getElementById('formularioEdad');
    var inputDia = document.getElementById('dia');
    var inputMes = document.getElementById('mes');
    var inputAnio = document.getElementById('anio');
    var resultadoDiv = document.getElementById('resultadoEdad');
    
    function validarFecha(dia, mes, anio) {
        // Validacion basica
        if (!dia || !mes || !anio) {
            return { valido: false, mensaje: 'Por favor, completa todos los campos.' };
        }
        
        if (dia < 1 || dia > 31 || mes < 1 || mes > 12) {
            return { valido: false, mensaje: 'Día o mes inválido. Verifica los valores.' };
        }
        
        if (anio < 1900 || anio > 2026) {
            return { valido: false, mensaje: 'Año inválido. Debe estar entre 1900 y 2026.' };
        }
        
        // Validar fecha real (considerando dias por mes)
        var diasEnMes = new Date(anio, mes, 0).getDate();
        if (dia > diasEnMes) {
            return { valido: false, mensaje: 'Fecha inválida. El mes ' + mes + ' tiene ' + diasEnMes + ' días.' };
        }
        
        var fechaNacimiento = new Date(anio, mes - 1, dia);
        var hoy = new Date();
        
        // Verificar que la fecha no sea futura
        if (fechaNacimiento > hoy) {
            return { valido: false, mensaje: 'La fecha de nacimiento no puede ser futura.' };
        }
        
        return { valido: true, fechaNacimiento: fechaNacimiento };
    }
    
    function calcularEdad(fechaNacimiento) {
        var hoy = new Date();
        
        var años = hoy.getFullYear() - fechaNacimiento.getFullYear();
        var meses = hoy.getMonth() - fechaNacimiento.getMonth();
        var dias = hoy.getDate() - fechaNacimiento.getDate();
        
        if (dias < 0) {
            meses--;
            var mesAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0);
            dias += mesAnterior.getDate();
        }
        
        if (meses < 0) {
            años--;
            meses += 12;
        }
        
        return { años: años, meses: meses, dias: dias };
    }
    
    function formatearFecha(fecha) {
        var opciones = { day: 'numeric', month: 'long', year: 'numeric' };
        return fecha.toLocaleDateString('es-ES', opciones);
    }
    
    function mostrarResultado(fechaNacimiento, edad) {
        var fechaFormateada = formatearFecha(fechaNacimiento);
        
        resultadoDiv.className = 'result-container success';
        resultadoDiv.innerHTML = 
            '<h3>Tiempo transcurrido desde tu nacimiento</h3>' +
            '<p class="result-text">' + edad.años + ' años, ' + edad.meses + ' meses y ' + edad.dias + ' días</p>' +
            '<p class="result-detail">Naciste el ' + fechaFormateada + '</p>';
    }
    
    function mostrarError(mensaje) {
        resultadoDiv.className = 'result-container error';
        resultadoDiv.innerHTML = '<p class="result-text">' + mensaje + '</p>';
    }
    
    function manejarSubmit(event) {
        event.preventDefault();
        
        var dia = parseInt(inputDia.value);
        var mes = parseInt(inputMes.value);
        var anio = parseInt(inputAnio.value);
        
        var validacion = validarFecha(dia, mes, anio);
        
        if (!validacion.valido) {
            mostrarError(validacion.mensaje);
            return;
        }
        
        var edad = calcularEdad(validacion.fechaNacimiento);
        mostrarResultado(validacion.fechaNacimiento, edad);
    }
    
    // Agregar evento al formulario
    formularioEdad.addEventListener('submit', manejarSubmit);
})();