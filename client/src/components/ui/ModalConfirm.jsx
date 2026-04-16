
// Componente modal de confirmação
// Exibe um diálogo de confirmação antes de apagar uma transação
// Apresenta botões para cancelar ou confirmar a eliminação
const ModalConfirm = ({ cancel, confirm }) => {
  return (
    <div className="modal-overlay" onClick={cancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Confirmar eliminação</h3>
        <p>Tens a certeza que queres apagar esta transação?</p>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={cancel}>
            Cancelar
          </button>
          <button className="btn-confirm-delete" onClick={confirm}>
            Apagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
