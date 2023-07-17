
import { Link } from "react-router-dom";
import style from "./landing.module.css"
const Landing = () => {
    return(
        <div className={style.landing}>
            <Link to={"/home"}>HOME</Link>
       </div>
    )
}

export default Landing;



// import React from "react";
// import { Link } from "react-router-dom";
// import style from "./landing.module.css";

// const Landing = () => {
//   return (
//     <div className={style.landing}>
//       <div className={style.background}></div>
//       <Link to={"/home"}>HOME</Link>
//     </div>
//   );
// }

// export default Landing;