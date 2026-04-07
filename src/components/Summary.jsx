import Card from "./ui/Card.jsx";
//os três cards (saldo, receitas, despesas)

const Summary = ({ saldo, receitas, despesas }) => {
  return (
    <section className="sectionCard">
      <Card title={"Saldo actual"} value={saldo} />
      <Card title={"Total de receitas"} value={receitas} />
      <Card title={"Total de despesas"} value={despesas} />
    </section>
  );
};

export default Summary;
