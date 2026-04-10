// componente para editar uma transação existente
// reutiliza o mesmo layout do AddTransaction mas pré-preenchido

import { useState } from "react";

const EditTransaction = ({ transaction, onEditTransaction, onCancel }) => {
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount);
  const [type, setType] = useState(transaction.type);
  const [date, setDate] = useState(transaction.date);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTransaction = {
      ...transaction,
      description,
      amount,
      type,
      date,
    };

    onEditTransaction(updatedTransaction);
  };

  return (
    <div>
      <h3>Editar transação</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="edit-description">Descrição</label>
          <input
            type="text"
            placeholder="Digite a descrição..."
            id="edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="edit-amount">Valor</label>
          <input
            type="number"
            placeholder="Digite o valor..."
            id="edit-amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div className="form-control">
          <label htmlFor="edit-type">Tipo</label>
          <select
            id="edit-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="income">Receita</option>
            <option value="expense">Despesa</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="edit-date">Data</label>
          <input
            type="date"
            id="edit-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="edit-actions">
          <button className="btn" type="submit">
            Guardar
          </button>
          <button className="btn btn-cancel" type="button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTransaction;
