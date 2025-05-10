// Datos simulados de empleados
const employees = [
    {
        codigo: "EMP0101",
        identificacion: "CC123456",
        nombre: "Juan",
        apellido: "Pérez",
        email: "juan.perez@email.com",
        departamento: "Recursos Humanos",
        sede: "Sede Central",
        fecha_contratacion: "2021-08-01",
        estado: "Activo"
    },
    {
        codigo: "EMP0102",
        identificacion: "CC987654",
        nombre: "María",
        apellido: "García",
        email: "maria.garcia@email.com",
        departamento: "TI",
        sede: "Sede Norte",
        fecha_contratacion: "2022-02-15",
        estado: "Inactivo"
    },
    {
        codigo: "EMP0103",
        identificacion: "CC112233",
        nombre: "Carlos",
        apellido: "López",
        email: "carlos.lopez@email.com",
        departamento: "Administración",
        sede: "Sede Central",
        fecha_contratacion: "2020-11-10",
        estado: "Activo"
    }
    // Puedes agregar más empleados si lo deseas
];

// Renderizar la tabla de empleados
function renderEmployeeTable(data) {
    const tbody = document.getElementById('employeeTableBody');
    tbody.innerHTML = '';
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;">No se encontraron empleados</td></tr>';
        return;
    }
    data.forEach((emp) => {
        tbody.innerHTML += `
            <tr>
                <td>${emp.codigo}</td>
                <td>${emp.identificacion}</td>
                <td>${emp.nombre} ${emp.apellido}</td>
                <td>${emp.email}</td>
                <td>${emp.departamento}</td>
                <td>${emp.sede}</td>
                <td>${emp.fecha_contratacion}</td>
                <td><span class="${emp.estado === 'Activo' ? 'status-active' : 'status-inactive'}">${emp.estado}</span></td>
                <td>
                    <button class="btn-icon btn-edit" title="Editar" onclick="openEditEmployee(this)"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon btn-delete" title="Eliminar" onclick="openDeleteEmployee(this)"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

// Llenar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    renderEmployeeTable(employees);
});

// Filtrado por los campos de búsqueda
document.getElementById('employeeQueryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const codigo = document.getElementById('q_codigo').value.trim().toLowerCase();
    const identificacion = document.getElementById('q_identificacion').value.trim().toLowerCase();
    const nombre = document.getElementById('q_nombre').value.trim().toLowerCase();
    const departamento = document.getElementById('q_departamento').value.trim().toLowerCase();
    const sede = document.getElementById('q_sede').value.trim().toLowerCase();

    const filtered = employees.filter(emp =>
        (codigo === '' || emp.codigo.toLowerCase().includes(codigo)) &&
        (identificacion === '' || emp.identificacion.toLowerCase().includes(identificacion)) &&
        (nombre === '' || (`${emp.nombre} ${emp.apellido}`.toLowerCase().includes(nombre))) &&
        (departamento === '' || emp.departamento.toLowerCase().includes(departamento)) &&
        (sede === '' || emp.sede.toLowerCase().includes(sede))
    );
    renderEmployeeTable(filtered);
});

// Limpiar el formulario y reiniciar la tabla al hacer click en limpiar
document.querySelector('#employeeQueryForm .btn-secondary').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('employeeQueryForm').reset();
    renderEmployeeTable(employees);
});

// Opcionales: funciones demo para editar/eliminar empleados
window.openEditEmployee = function(btn) {
    alert("Funcionalidad de editar empleado (demo)");
};
window.openDeleteEmployee = function(btn) {
    alert("Funcionalidad de eliminar empleado (demo)");
};