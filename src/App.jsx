import "./styles/App.css";
import Card from "./components/ui/Card.jsx";
const App = () => {
  return (
    <main>
      {/* header e navbar */}
      <h1>Expense Tracker</h1>
      <br />
      <br />
      <br />
      <section className="sectionCard">
        <Card title={"Saldo actual"} value={10} />
        <Card title={"Total de receitas"} value={100} />
        <Card title={"Total de despesas"} value={1000} />
      </section>
    </main>
  );
};

export default App;
