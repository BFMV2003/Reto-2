const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Arreglo de objetos para las tareas: { text: "...", done: false }
let tasks = [];

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Por favor, escribe una tarea.");
        return;
    }

    // Insertar la nueva tarea como un objeto (no completada por defecto)
    tasks.push({ text: taskText, done: false });

    // Ordenar la lista completa
    sortAndRender();

    taskInput.value = "";
    taskInput.focus();
}

// Función que ordena y dibuja la lista en pantalla
function sortAndRender() {
    // Criterio de orden: Primero las pendientes de la A-Z, luego las completadas de la A-Z
    tasks.sort((a, b) => {
        if (a.done !== b.done) {
            return a.done ? 1 : -1; // Las completadas (done: true) van abajo
        }
        return a.text.localeCompare(b.text); // Orden alfabético secundario
    });

    // Limpiar el contenedor HTML
    taskList.innerHTML = "";

    // Dibujar cada tarea
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        // Si la tarea está marcada como completada, aplicar la clase CSS
        if (task.done) {
            li.classList.add('completed');
        }

        // --- EFECTO TOGGLE ---
        // Al hacer clic en la tarea, cambia su estado (pendiente <-> completado)
        li.addEventListener('click', function(e) {
            // Evitar que el clic en el botón de eliminar active el toggle
            if (e.target.tagName === 'BUTTON') return; 
            
            task.done = !task.done; // Invierte el estado booleano
            sortAndRender();        // Reordena y actualiza la pantalla
        });

        // Botón de eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.className = 'delete-btn';
        
        deleteBtn.addEventListener('click', function() {
            tasks.splice(index, 1);
            sortAndRender();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
