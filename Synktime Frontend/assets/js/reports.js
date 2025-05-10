// Utilidades para generación de datos aleatorios
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomItem(arr) {
    return arr[randomInt(0, arr.length - 1)];
}
function pad(n) {
    return n < 10 ? "0" + n : n.toString();
}
// Lista de trabajadores simulados
const empleadosSimulados = [
    { nombre: "Juan Pérez", departamento: "Recursos Humanos", sede: "Sede Central" },
    { nombre: "María García", departamento: "TI", sede: "Sede Norte" },
    { nombre: "Carlos López", departamento: "Administración", sede: "Sede Central" },
    { nombre: "Ana Torres", departamento: "Ventas", sede: "Sede Este" },
    { nombre: "Luis Gómez", departamento: "TI", sede: "Sede Norte" },
    { nombre: "Marta Díaz", departamento: "Contabilidad", sede: "Sede Central" },
    { nombre: "Jorge Herrera", departamento: "Recursos Humanos", sede: "Sede Oeste" },
    { nombre: "Patricia Ruiz", departamento: "Administración", sede: "Sede Central" },
    { nombre: "José Ramírez", departamento: "Ventas", sede: "Sede Este" },
    { nombre: "Lucía Castro", departamento: "TI", sede: "Sede Central" },
    { nombre: "Diego Silva", departamento: "Contabilidad", sede: "Sede Norte" },
    { nombre: "Sofía Morales", departamento: "Recursos Humanos", sede: "Sede Oeste" },
    { nombre: "Raúl Paredes", departamento: "Administración", sede: "Sede Central" },
    { nombre: "Gabriela Vargas", departamento: "Ventas", sede: "Sede Este" },
    { nombre: "Miguel Castro", departamento: "TI", sede: "Sede Norte" }
];
const estadosEntrada = ["Puntual", "Tardanza", "Temprano"];
const dispositivos = ["Bio-RFID 1", "Bio-RFID 2", "Bio-RFID 3"];

// Generar 100 asistencias simuladas repartidas entre 2024 y 2025
const attendanceReports = [];
let total = 0;
while (attendanceReports.length < 100) {
    const emp = empleadosSimulados[randomInt(0, empleadosSimulados.length - 1)];
    const year = randomInt(2024, 2025);
    const month = randomInt(1, 12);
    const daysInMonth = new Date(year, month, 0).getDate();
    const day = randomInt(1, daysInMonth);
    const fecha = `${year}-${pad(month)}-${pad(day)}`;
    const estado_entrada = randomItem(estadosEntrada);
    let hora_entrada, hora_salida;
    if (estado_entrada === "Puntual") {
        hora_entrada = `08:${pad(randomInt(0,5))}`;
        hora_salida = `17:${pad(randomInt(0,10))}`;
    } else if (estado_entrada === "Tardanza") {
        hora_entrada = `08:${pad(randomInt(10,30))}`;
        hora_salida = `17:${pad(randomInt(0,10))}`;
    } else { // Temprano
        hora_entrada = `07:${pad(randomInt(30,59))}`;
        hora_salida = `16:${pad(randomInt(0,20))}`;
    }
    // Evitar duplicados exactos de empleado+fecha
    if (!attendanceReports.some(
        a => a.empleado === emp.nombre && a.fecha === fecha
    )) {
        attendanceReports.push({
            empleado: emp.nombre,
            departamento: emp.departamento,
            sede: emp.sede,
            fecha: fecha,
            hora_entrada: hora_entrada,
            hora_salida: hora_salida,
            estado_entrada: estado_entrada,
            dispositivo: randomItem(dispositivos)
        });
    }
    total++;
    if (total > 1000) break;
}

// Función para ordenar por día, mes, año (de más reciente a más lejano)
function sortByDateDesc(arr) {
    return arr.slice().sort((a, b) => {
        const [ay, am, ad] = a.fecha.split('-').map(Number);
        const [by, bm, bd] = b.fecha.split('-').map(Number);
        if (ay !== by) return by - ay;
        if (am !== bm) return bm - am;
        return bd - ad;
    });
}

// Renderizar la tabla de reportes
function renderReportsTable(data) {
    const sorted = sortByDateDesc(data);
    const tbody = document.getElementById('reportsTableBody');
    tbody.innerHTML = '';
    if (sorted.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">No se encontraron asistencias</td></tr>';
        return;
    }
    sorted.forEach(rep => {
        tbody.innerHTML += `
            <tr>
                <td>${rep.empleado}</td>
                <td>${rep.departamento}</td>
                <td>${rep.sede}</td>
                <td>${rep.fecha}</td>
                <td>${rep.hora_entrada}</td>
                <td>${rep.hora_salida}</td>
                <td><span class="status-in ${rep.estado_entrada}">${rep.estado_entrada}</span></td>
                <td>${rep.dispositivo}</td>
            </tr>
        `;
    });
}

// Utilidades de fecha
function getToday() {
    const now = new Date();
    return now.toISOString().slice(0, 10);
}
function getWeekStartEnd() {
    const now = new Date();
    const day = now.getDay() || 7;
    const monday = new Date(now);
    monday.setDate(now.getDate() - day + 1);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return [
        monday.toISOString().slice(0, 10),
        sunday.toISOString().slice(0, 10)
    ];
}
function getMonthStartEnd() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return [
        start.toISOString().slice(0, 10),
        end.toISOString().slice(0, 10)
    ];
}

// Filtros
function filterByDateRange(data, start, end) {
    return data.filter(rep => rep.fecha >= start && rep.fecha <= end);
}

function resetCustomRangeInputs() {
    document.getElementById('customStart').value = "";
    document.getElementById('customEnd').value = "";
}

function resetReportFiltersAndTable() {
    resetCustomRangeInputs();
    renderReportsTable(attendanceReports);
}

// Inicial: mostrar todos los datos y limpiar el rango personalizado
document.addEventListener('DOMContentLoaded', function() {
    resetReportFiltersAndTable();
});

// Botón: Día actual
document.getElementById('btnToday').addEventListener('click', function() {
    const today = getToday();
    renderReportsTable(filterByDateRange(attendanceReports, today, today));
    resetCustomRangeInputs();
});

// Botón: Semana actual
document.getElementById('btnWeek').addEventListener('click', function() {
    const [start, end] = getWeekStartEnd();
    renderReportsTable(filterByDateRange(attendanceReports, start, end));
    resetCustomRangeInputs();
});

// Botón: Mes actual
document.getElementById('btnMonth').addEventListener('click', function() {
    const [start, end] = getMonthStartEnd();
    renderReportsTable(filterByDateRange(attendanceReports, start, end));
    resetCustomRangeInputs();
});

// Formulario: Rango personalizado
document.getElementById('customRangeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const start = document.getElementById('customStart').value;
    const end = document.getElementById('customEnd').value;
    if (!start || !end) {
        alert("Selecciona ambas fechas del rango.");
        return;
    }
    if (start > end) {
        alert("La fecha de inicio no puede ser mayor que la final.");
        return;
    }
    renderReportsTable(filterByDateRange(attendanceReports, start, end));
});

// Descargar .xls
document.getElementById('btnExportXLS').addEventListener('click', function() {
    const rows = Array.from(document.querySelectorAll('#reportsTableBody tr'));
    if (rows.length === 0 || rows[0].children[0].colSpan === 8) {
        alert("No hay datos para exportar.");
        return;
    }
    const data = [
        ["Empleado", "Departamento", "Sede", "Fecha", "Hora entrada", "Hora salida", "Estado entrada", "Dispositivo"]
    ];
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        data.push(Array.from(cells).map(cell => cell.textContent));
    });

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ReporteAsistencia");
    XLSX.writeFile(wb, "reporte_asistencia.xlsx");
});

// Botón: Reiniciar consulta
document.getElementById('btnReset').addEventListener('click', function() {
    resetReportFiltersAndTable();
});