import { useContext } from "react";
import Card from "./ui/Card";
import { PreferencesContext } from "../context/PreferencesContext";

// Componente de resumo financeiro
// Apresenta três cards com o saldo atual, total de receitas e total de despesas
// Os valores são formatados de acordo com a moeda selecionada nas preferências

// Taxas de câmbio fixas (base EUR)
const RATES = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.86,
};

function convertCurrency(value, from, to) {
  if (from === to) return value;
  // Converter para EUR se necessário
  const valueInEur = from === "EUR" ? value : value / RATES[from];
  // Converter de EUR para destino
  return valueInEur * RATES[to];
}

const Summary = ({ balance, income, expenses, currency, baseCurrency = "EUR" }) => {
  // Converter valores para a moeda selecionada
  const convertedBalance = convertCurrency(balance, baseCurrency, currency);
  const convertedIncome = convertCurrency(income, baseCurrency, currency);
  const convertedExpenses = convertCurrency(expenses, baseCurrency, currency);

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
        value={formatCurrency(convertedBalance)}
      />
      <Card
        icon={"📈"}
        title={"Total de receitas"}
        value={formatCurrency(convertedIncome)}
      />
      <Card
        icon={"📉"}
        title={"Total de despesas"}
        value={formatCurrency(convertedExpenses)}
      />
    </section>
  );
};

export default Summary;
