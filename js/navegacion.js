(function() {
    'use strict';
    
    var botonesNav = document.querySelectorAll('.nav-btn');
    
    function cambiarHerramienta(idHerramienta) {
        for (var i = 0; i < botonesNav.length; i++) {
            botonesNav[i].classList.remove('active');
        }
        
        var secciones = document.querySelectorAll('.tool-section');
        for (var j = 0; j < secciones.length; j++) {
            secciones[j].classList.remove('active');
        }
        
        var botonActivo = document.querySelector('.nav-btn[data-tool="' + idHerramienta + '"]');
        if (botonActivo) {
            botonActivo.classList.add('active');
        }
        
        var seccion = document.getElementById(idHerramienta);
        if (seccion) {
            seccion.classList.add('active');
        }
    }
    
    for (var k = 0; k < botonesNav.length; k++) {
        (function(boton) {
            boton.addEventListener('click', function() {
                var idHerramienta = this.getAttribute('data-tool');
                cambiarHerramienta(idHerramienta);
            });
        })(botonesNav[k]);
    }
    
    window.cambiarHerramienta = cambiarHerramienta;
})();