
import { Link } from "react-router-dom";
import style from "./landing.module.css"
const Landing = () => {
    return(
        <div className={style.landing}>
            <Link className={style.button} to={"/home"}>HOME</Link>
       </div>
    )
}

export default Landing;
