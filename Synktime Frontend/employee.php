<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Empleados | SynkTime</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Fonts & Icons -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Dashboard Styles -->
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/layout.css">
    <link rel="stylesheet" href="assets/css/employee.css">
</head>
<body>
<div class="app-container">
    <?php include 'components/sidebar.php'; ?>
    <div class="main-wrapper">
        <?php include 'components/header.php'; ?>
        <main class="main-content">
            <div class="employee-header">
                <h2 class="page-title"><i class="fas fa-users"></i> Empleados</h2>
                <div class="employee-actions">
                    <button class="btn-primary" id="btnAddEmployee"><i class="fas fa-user-plus"></i> Registrar empleado</button>
                    <button class="btn-secondary" id="btnExportXLS"><i class="fas fa-file-excel"></i> Exportar .xls</button>
                </div>
            </div>
            <?php include 'components/employee_query.php'; ?>
            <div class="employee-table-container">
                <table class="employee-table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Identificación</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Departamento</th>
                            <th>Sede</th>
                            <th>Fecha contratación</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Ejemplo de fila de empleado -->
                        <tr>
                            <td>EMP0101</td>
                            <td>CC123456</td>
                            <td>Juan Pérez</td>
                            <td>juan.perez@email.com</td>
                            <td>Recursos Humanos</td>
                            <td>Sede Central</td>
                            <td>2021-08-01</td>
                            <td><span class="status-active">Activo</span></td>
                            <td>
                                <button class="btn-icon btn-edit" title="Editar" onclick="openEditEmployee(this)"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon btn-delete" title="Eliminar" onclick="openDeleteEmployee(this)"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>EMP0102</td>
                            <td>CC987654</td>
                            <td>María García</td>
                            <td>maria.garcia@email.com</td>
                            <td>TI</td>
                            <td>Sede Norte</td>
                            <td>2022-02-15</td>
                            <td><span class="status-inactive">Inactivo</span></td>
                            <td>
                                <button class="btn-icon btn-edit" title="Editar" onclick="openEditEmployee(this)"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon btn-delete" title="Eliminar" onclick="openDeleteEmployee(this)"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                        <!-- ...más empleados -->
                    </tbody>
                </table>
            </div>
            <?php include 'components/employee_modals.php'; ?>
        </main>
    </div>
</div>
<script src="assets/js/employee.js"></script>
</body>
</html>