// Componente para selecionar um intervalo de datas
// Permite ao utilizador escolher uma data de início e uma data de fim para filtrar transações
const DateRangePicker = ({ startDate, endDate, onDateChange }) => {
  // Atualizar a data de início mantendo a data de fim
  const handleStartChange = (e) => {
    onDateChange(e.target.value, endDate);
  };

  // Atualizar a data de fim mantendo a data de início
  const handleEndChange = (e) => {
    onDateChange(startDate, e.target.value);
  };

  return (
    <div className="date-range-picker">
      <label>
        Data Início:
        <input type="date" value={startDate} onChange={handleStartChange} />
      </label>
      <label>
        Data Fim:
        <input type="date" value={endDate} onChange={handleEndChange} />
      </label>
    </div>
  );
};

export default DateRangePicker;
