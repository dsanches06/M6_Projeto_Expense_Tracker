import { useContext } from 'react'
import Card from "./ui/Card"
import { PreferencesContext } from '../context/PreferencesContext'

//os três cards (saldo, receitas, despesas)

const Summary = ({ balance, income, expenses }) => {
  const { currency } = useContext(PreferencesContext)

  // Formatar valores com a moeda selecionada
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: currency,
    }).format(value)
  }

  return (
    <section className="sectionCard">
      <Card icon={"💰"} title={"Saldo actual"} value={formatCurrency(balance)} />
      <Card icon={"📈"} title={"Total de receitas"} value={formatCurrency(income)} />
      <Card icon={"📉"} title={"Total de despesas"} value={formatCurrency(expenses)} />
    </section>
  )
}

export default Summary
