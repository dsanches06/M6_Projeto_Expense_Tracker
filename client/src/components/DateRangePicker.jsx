const DateRangePicker = ({ startDate, endDate, onDateChange }) => {
  const handleStartChange = (e) => {
    onDateChange(e.target.value, endDate);
  };

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
