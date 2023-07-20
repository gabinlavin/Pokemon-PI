import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className={style.card}>
  <div className={style.imageContainer}>
    <img src={props.image} alt={props.name} className={style.image} />
  </div>
  <div className={style.category}>
    <p>{props.name}</p>
  </div>
  {props.types?.map((type) => (
    <div key={type}>{type}</div>
  ))}
  <button className={style.buttonLink}>
    <Link to={`detail/${props.id}`}>Ir al detalle!</Link>
  </button>
</div>

  );
}

export default Card;
