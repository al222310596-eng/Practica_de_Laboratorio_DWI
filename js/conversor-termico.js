(function() {
    'use strict';
    
    var inputValor = document.getElementById('valorTemp');
    var selectOrigen = document.getElementById('unidadOrigen');
    var selectDestino = document.getElementById('unidadDestino');
    var btnConvertir = document.getElementById('btnConvertir');
    var formularioConversor = document.getElementById('formularioConversor');
    var resultadoDiv = document.getElementById('resultadoConversion');
    
    function verificarFormulario() {
        var valor = inputValor.value.trim();
        var origen = selectOrigen.value;
        var destino = selectDestino.value;
        
        if (valor && origen && destino && origen !== destino) {
            btnConvertir.disabled = false;
        } else {
            btnConvertir.disabled = true;
        }
    }
    
    function convertirTemperatura(valor, origen, destino) {
        var celsius;
        
        switch(origen) {
            case 'C':
                celsius = valor;
                break;
            case 'F':
                celsius = (valor - 32) * 5 / 9;
                break;
            case 'K':
                celsius = valor - 273.15;
                break;
            default:
                return null;
        }
        
        switch(destino) {
            case 'C':
                return celsius;
            case 'F':
                return (celsius * 9 / 5) + 32;
            case 'K':
                return celsius + 273.15;
            default:
                return null;
        }
    }
    
    function mostrarResultado(valor, origen, destino, resultado) {
        var simbolos = { C: 'C', F: 'F', K: 'K' };
        
        resultadoDiv.className = 'result-container success';
        resultadoDiv.innerHTML = 
            '<h3>Resultado de la conversion</h3>' +
            '<p class="result-text">' +
            valor + ' ' + simbolos[origen] + ' = ' + resultado.toFixed(2) + ' ' + simbolos[destino] +
            '</p>';
    }
    
    function mostrarError(mensaje) {
        resultadoDiv.className = 'result-container error';
        resultadoDiv.innerHTML = '<p class="result-text">' + mensaje + '</p>';
    }
    
    function manejarSubmit(event) {
        event.preventDefault();
        
        var valor = parseFloat(inputValor.value);
        var origen = selectOrigen.value;
        var destino = selectDestino.value;
        
        if (isNaN(valor)) {
            mostrarError('Error: Ingresa un valor numerico valido.');
            return;
        }
        
        if (origen === destino) {
            mostrarError('Error: Las unidades de origen y destino deben ser diferentes.');
            return;
        }
        
        var resultado = convertirTemperatura(valor, origen, destino);
        
        if (resultado === null) {
            mostrarError('Error en la conversion.');
            return;
        }
        
        mostrarResultado(valor, origen, destino, resultado);
    }
    
    inputValor.addEventListener('input', verificarFormulario);
    selectOrigen.addEventListener('change', verificarFormulario);
    selectDestino.addEventListener('change', verificarFormulario);
    formularioConversor.addEventListener('submit', manejarSubmit);
})();