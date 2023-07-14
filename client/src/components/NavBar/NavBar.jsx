import { Link } from "react-router-dom/cjs/react-router-dom"
import style from "./NavBar.module.css"
const NavBar = ()=>{
    return(
        <div className={style.mainContainer}>
            <Link to="/Home">HOME</Link>
            <Link to="/create">FORM</Link>
        </div>
    )
}
export default NavBar;