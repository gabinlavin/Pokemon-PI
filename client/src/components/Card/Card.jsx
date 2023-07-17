import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className={style.card}>
      <p>Name: {props.name}</p>
      <img src={props.image} alt={props.name} />
      {props.types?.map((type) => <div key={type}>{type}</div>)}
      <button>
        <Link to={`detail/${props.id}`}>Ir al detalle!</Link>
      </button>
    </div>
  );
}

export default Card;