import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import { Outlet } from "react-router-dom";
const NavBar = () => {
  return (
    <div className={style.navbar}>
      <div className={style.navLinks}>
        <Link to="/home" className={style.navLink}>
          HOME
        </Link>
        <Link to="create" className={style.navLink}>
          FORM
        </Link>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
export default NavBar;

// <div className={style.navbar}>
// <div className={style.navLinks}>
//   <Link to="/home" className={style.navLink}>
//     HOME
//   </Link>
//   <Link to="/create" className={style.navLink}>
//     FORM
//   </Link>
// </div>
// </div>
