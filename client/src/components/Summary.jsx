import { useContext } from "react";
import Card from "./ui/Card";
import { PreferencesContext } from "../context/PreferencesContext";

// Componente de resumo financeiro
// Apresenta três cards com o saldo atual, total de receitas e total de despesas
// Os valores são formatados de acordo com a moeda selecionada nas preferências
const Summary = ({ balance, income, expenses }) => {
  const { currency } = useContext(PreferencesContext);

  // Formatar valores com a moeda selecionada
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  return (
    <section className="sectionCard">
      <Card
        icon={"💰"}
        title={"Saldo actual"}
        value={formatCurrency(balance)}
      />
      <Card
        icon={"📈"}
        title={"Total de receitas"}
        value={formatCurrency(income)}
      />
      <Card
        icon={"📉"}
        title={"Total de despesas"}
        value={formatCurrency(expenses)}
      />
    </section>
  );
};

export default Summary;
