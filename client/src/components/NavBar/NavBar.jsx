import { Link } from "react-router-dom"
import style from "./NavBar.module.css"
import {Outlet} from "react-router-dom"
const NavBar = ()=>{
    return(
        <div className={style.mainContainer}>
            <Link to="/home">HOME</Link>
            <Link to="create">FORM</Link>
            <Outlet></Outlet>
        </div>
    )
}
export default NavBar;