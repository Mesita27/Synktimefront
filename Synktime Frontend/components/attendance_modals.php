<!-- Modal Comentario/Acción -->
<div class="modal" id="attendanceCommentModal">
    <div class="modal-content modal-content-md">
        <span class="modal-close" onclick="closeAttendanceCommentModal()"><i class="fas fa-times"></i></span>
        <h3>Agregar Comentario o Acción</h3>
        <form id="attendanceCommentForm">
            <div class="form-group">
                <label for="comentario">Comentario / Acción</label>
                <textarea id="comentario" name="comentario" rows="4" required></textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn-primary">Guardar</button>
                <button type="button" class="btn-secondary" onclick="closeAttendanceCommentModal()">Cancelar</button>
            </div>
        </form>
    </div>
</div>