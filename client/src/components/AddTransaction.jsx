import { useState } from "react";

//o formulário

const AddTransaction = ({ onAddTransaction }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("income");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTransaction = {
      description,
      amount,
      type,
      date,
    };
    
    onAddTransaction(newTransaction);
    // Limpar formulário
    setDescription("");
    setAmount(0);
    setType("income");
    setDate("");
  };

  return (
    <div>
      <h3>Adicionar nova transação</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="description">Descrição</label>
          <input
            type="text"
            placeholder="Digite a descrição..."
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Valor</label>
          <input
            type="number"
            placeholder="Digite o valor..."
            id="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div className="form-control">
          <label htmlFor="type">Tipo</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="income">Receita</option>
            <option value="expense">Despesa</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="date">Data</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button className="btn">Adicionar transação</button>
      </form>
    </div>
  );
};

export default AddTransaction;
