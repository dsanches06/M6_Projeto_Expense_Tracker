import "../../styles/card.css";

const Card = (props) => {
  return (
    <div className="card">
      <h2 className="cardTitle">{props.title}</h2>
      <div className="cardValue">{props.value.toFixed(2)} €</div>
    </div>
  );
};

export default Card;
