(function() {
    'use strict';
    
    var tareas = [];
    var formularioTareas = document.getElementById('formularioTareas');
    var inputTarea = document.getElementById('inputTarea');
    var listaTareas = document.getElementById('listaTareas');
    var totalTareas = document.getElementById('totalTareas');
    var tareasPendientes = document.getElementById('tareasPendientes');
    var tareasCompletadas = document.getElementById('tareasCompletadas');
    
    function cargarTareas() {
        if (localStorage.getItem('tareas')) {
            try {
                tareas = JSON.parse(localStorage.getItem('tareas'));
            } catch(e) {
                tareas = [];
            }
        }
    }
    
    function guardarTareas() {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
    
    function renderizarTareas() {
        listaTareas.innerHTML = '';
        
        var pendientes = [];
        var completadas = [];
        
        for (var i = 0; i < tareas.length; i++) {
            if (tareas[i].completada) {
                completadas.push(tareas[i]);
            } else {
                pendientes.push(tareas[i]);
            }
        }
        
        var tareasOrdenadas = pendientes.concat(completadas);
        
        if (tareasOrdenadas.length === 0) {
            listaTareas.innerHTML = '<p style="color: #7a9a7a; text-align: center; padding: 20px;">No hay tareas aun. Agrega una!</p>';
        } else {
            for (var j = 0; j < tareasOrdenadas.length; j++) {
                (function(indice) {
                    var divTarea = document.createElement('div');
                    divTarea.className = 'task-item';
                    
                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.className = 'task-check';
                    checkbox.checked = tareasOrdenadas[indice].completada;
                    checkbox.addEventListener('change', function() {
                        alternarTarea(indice);
                    });
                    
                    var texto = document.createElement('span');
                    texto.className = 'task-text';
                    if (tareasOrdenadas[indice].completada) {
                        texto.className += ' completed';
                    }
                    texto.textContent = tareasOrdenadas[indice].descripcion;
                    
                    var divAcciones = document.createElement('div');
                    divAcciones.className = 'task-actions';
                    
                    var btnEliminar = document.createElement('button');
                    btnEliminar.className = 'btn btn-danger btn-small';
                    btnEliminar.textContent = 'Eliminar';
                    btnEliminar.addEventListener('click', function() {
                        eliminarTarea(indice);
                    });
                    
                    divAcciones.appendChild(btnEliminar);
                    divTarea.appendChild(checkbox);
                    divTarea.appendChild(texto);
                    divTarea.appendChild(divAcciones);
                    listaTareas.appendChild(divTarea);
                })(j);
            }
        }
        
        totalTareas.textContent = tareas.length;
        tareasPendientes.textContent = pendientes.length;
        tareasCompletadas.textContent = completadas.length;
        
        guardarTareas();
    }
    
    function agregarTarea(descripcion) {
        if (descripcion.trim() === '') return;
        tareas.push({ descripcion: descripcion.trim(), completada: false });
        renderizarTareas();
    }
    
    function alternarTarea(indice) {
        var pendientes = [];
        var completadas = [];
        
        for (var i = 0; i < tareas.length; i++) {
            if (tareas[i].completada) {
                completadas.push(tareas[i]);
            } else {
                pendientes.push(tareas[i]);
            }
        }
        
        if (indice < pendientes.length) {
            // Es una tarea pendiente
            var indiceTarea = tareas.indexOf(pendientes[indice]);
            tareas[indiceTarea].completada = !tareas[indiceTarea].completada;
        } else {
            var indiceCompletada = indice - pendientes.length;
            var indiceTarea2 = tareas.indexOf(completadas[indiceCompletada]);
            tareas[indiceTarea2].completada = !tareas[indiceTarea2].completada;
        }
        
        renderizarTareas();
    }
    
    function eliminarTarea(indice) {
        var pendientes = [];
        var completadas = [];
        
        for (var i = 0; i < tareas.length; i++) {
            if (tareas[i].completada) {
                completadas.push(tareas[i]);
            } else {
                pendientes.push(tareas[i]);
            }
        }
        
        if (indice < pendientes.length) {
            var indiceTarea = tareas.indexOf(pendientes[indice]);
            tareas.splice(indiceTarea, 1);
        } else {
            var indiceCompletada = indice - pendientes.length;
            var indiceTarea2 = tareas.indexOf(completadas[indiceCompletada]);
            tareas.splice(indiceTarea2, 1);
        }
        
        renderizarTareas();
    }
    
    formularioTareas.addEventListener('submit', function(e) {
        e.preventDefault();
        agregarTarea(inputTarea.value);
        inputTarea.value = '';
        inputTarea.focus();
    });
    
    cargarTareas();
    renderizarTareas();
    
    window.addEventListener('beforeunload', function() {
        guardarTareas();
    });
})();