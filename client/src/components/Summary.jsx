import Card from "./ui/Card";
//os três cards (saldo, receitas, despesas)

const Summary = ({ saldo, receitas, despesas }) => {
  return (
    <section className="sectionCard">
      <Card icon={"💰"} title={"Saldo actual"} value={saldo} />
      <Card icon={"📈"} title={"Total de receitas"} value={receitas} />
      <Card icon={"📉"} title={"Total de despesas"} value={despesas} />
    </section>
  );
};

export default Summary;
