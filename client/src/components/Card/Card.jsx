import style from "./Card.module.css";
import { Link } from "react-router-dom";
const Card = (props)=>{
    return(
        <div className={style.card}>
            <p>Name:{props.name}</p>
            <p>Image:{props.image}</p>
            {props.types?.map(type=>(<div>{type}</div>))}
           <button><Link to ={`detail/${props.id}`}>Ir al detalle!</Link></button> 
        </div>
    )
}

export default Card;