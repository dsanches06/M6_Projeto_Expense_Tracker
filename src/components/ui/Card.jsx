import "../../styles/card.css";

const Card = (props) => {
  return (
    <div className="card">
      <div className="cardTitle">
        <h2>{props.title}</h2>
      </div>
      <div className="cardValue">{props.value} €</div>
    </div>
  );
};

export default Card;
