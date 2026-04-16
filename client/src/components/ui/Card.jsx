import "../../styles/card.css";

// Componente de card reutilizável
// Exibe um ícone, título e valor dentro de um card estilizado
// Utilizado no resumo financeiro (saldo, receitas, despesas)
const Card = (props) => {
  return (
    <div className="card">
      <div className="cardIcon">{props.icon}</div>
      <div className="cardContent">
        <h2 className="cardTitle">{props.title}</h2>
        <div className="cardValue">{props.value}</div>
      </div>
    </div>
  );
};

export default Card;
