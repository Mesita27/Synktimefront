// Abrir modal de registro de empleado
document.getElementById('btnAddEmployee').addEventListener('click', function() {
    document.getElementById('modalTitle').textContent = "Registrar Empleado";
    document.getElementById('employeeForm').reset();
    document.getElementById('employeeModal').classList.add('show');
});

// Cerrar modal registro/edición
function closeEmployeeModal() {
    document.getElementById('employeeModal').classList.remove('show');
}

// Abrir modal de edición (simulado para demo)
window.openEditEmployee = function(btn) {
    const row = btn.closest('tr');
    const cells = row.querySelectorAll('td');

    // Ajusta los índices según el orden de tus columnas
    // [0] Código, [1] Identificación, [2] Nombre, [3] Email, [4] Departamento, [5] Sede, [6] Fecha contratación, [7] Estado

    // Separar nombre completo en nombre y apellido (asumiendo que tu columna Nombre tiene ambos)
    let nombreCompleto = cells[2].textContent.trim().split(' ');
    let nombre = nombreCompleto.slice(0, -1).join(' ') || '';
    let apellido = nombreCompleto.slice(-1).join(' ') || '';

    document.getElementById('modalTitle').textContent = "Editar Empleado";
    document.getElementById('codigo').value = cells[0].textContent.trim();
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('email').value = cells[3].textContent.trim();
    document.getElementById('departamento').value = cells[4].textContent.trim();
    document.getElementById('sede').value = cells[5].textContent.trim();
    document.getElementById('fecha_contratacion').value = cells[6].textContent.trim();

    // Para el estado, busca el texto dentro del span
    const estadoTexto = cells[7].textContent.trim().toLowerCase();
    if (estadoTexto === "activo") {
        document.getElementById('estado').value = "1";
    } else {
        document.getElementById('estado').value = "0";
    }
    
    // Abre el modal
    document.getElementById('employeeModal').classList.add('show');
};

// Abrir modal de eliminación
window.openDeleteEmployee = function(btn) {
    document.getElementById('deleteEmployeeModal').classList.add('show');
};
// Cerrar modal eliminación
function closeDeleteEmployeeModal() {
    document.getElementById('deleteEmployeeModal').classList.remove('show');
}

// Cerrar modales al hacer click fuera del contenido
document.addEventListener('click', function(e) {
    document.querySelectorAll('.modal.show').forEach(modal => {
        if (e.target === modal) modal.classList.remove('show');
    });
});

// Exportar a XLS (sólo botón por ahora)
document.getElementById('btnExportXLS').addEventListener('click', function() {
    alert("Funcionalidad de exportar a .xls próximamente.");
});

// Guardar empleado (demo)
document.getElementById('employeeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    closeEmployeeModal();
    alert('Empleado guardado (demo, sin backend)');
});

// Eliminar empleado (demo)
document.getElementById('confirmDeleteEmployeeBtn').addEventListener('click', function() {
    closeDeleteEmployeeModal();
    alert('Empleado eliminado (demo, sin backend)');
});