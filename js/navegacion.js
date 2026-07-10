// =============================================
// Navegacion entre herramientas (SPA)
// =============================================
(function() {
    'use strict';
    
    var botonesNav = document.querySelectorAll('.nav-btn');
    
    function cambiarHerramienta(idHerramienta) {
        // Remover clase active de todos los botones
        for (var i = 0; i < botonesNav.length; i++) {
            botonesNav[i].classList.remove('active');
        }
        
        // Remover clase active de todas las secciones
        var secciones = document.querySelectorAll('.tool-section');
        for (var j = 0; j < secciones.length; j++) {
            secciones[j].classList.remove('active');
        }
        
        // Activar el boton correspondiente
        var botonActivo = document.querySelector('.nav-btn[data-tool="' + idHerramienta + '"]');
        if (botonActivo) {
            botonActivo.classList.add('active');
        }
        
        // Mostrar la seccion correspondiente
        var seccion = document.getElementById(idHerramienta);
        if (seccion) {
            seccion.classList.add('active');
        }
    }
    
    // Agregar eventos a los botones de navegacion
    for (var k = 0; k < botonesNav.length; k++) {
        (function(boton) {
            boton.addEventListener('click', function() {
                var idHerramienta = this.getAttribute('data-tool');
                cambiarHerramienta(idHerramienta);
            });
        })(botonesNav[k]);
    }
    
    // Exponer funcion para uso en consola (opcional)
    window.cambiarHerramienta = cambiarHerramienta;
})();