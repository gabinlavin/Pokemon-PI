import { useState } from "react";
import { useDispatch } from "react-redux";
import { orderByAbc, orderByStrength } from "../../Redux/actions/actions";
import style from "./orders.module.css"
import React from "react"


const Orders = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState({
    abc: "",
    ataque: "",
  });

  const handleOrderByAbc = ({ target }) => {
    setOrder({ ...order, abc: target.value });
    dispatch(orderByAbc(target.value));
  };
  const handleOrderByStrength = ({ target }) => {
    setOrder({ ...order, ataque: target.value });
    dispatch(orderByStrength(target.value));
  };
  return (
    <div>
      <select name="filterAbc"
       onChange={handleOrderByAbc}
        key={order.abc}
        className={style.olaLink}>
        <option value="all">Orden alfabetico</option>
        <option value="asc">A - Z</option>
        <option value="desc">Z - A</option>
      </select>
      <select
        name="filterAbc"
        onChange={handleOrderByStrength}
        key={order.ataque}
        className={style.olaLink}
      >
        <option value="all">Orden por ataque</option>
        <option value="mayor">Ataque: Menor a Mayor</option>
        <option value="menor">Ataque: Mayor a Menor</option>
      </select>
    </div>
  );
};
export default Orders;



// Componente Orders
// import React from "react";
// import style from "./orders.module.css";

// const Orders = ({ orderByAbc, orderByStrength, resetOrders }) => {
//   return (
//     <div>
//       <select
//         name="filterAbc"
//         onChange={orderByAbc}
//         className={style.olaLink}
//         value=""
//       >
//         <option disabled hidden value="">
//           Orden alfabetico
//         </option>
//         <option value="asc">A - Z</option>
//         <option value="desc">Z - A</option>
//       </select>
//       <select
//         name="filterStrength"
//         onChange={orderByStrength}
//         className={style.olaLink}
//         value=""
//       >
//         <option disabled hidden value="">
//           Orden por ataque
//         </option>
//         <option value="mayor">Ataque: Menor a Mayor</option>
//         <option value="menor">Ataque: Mayor a Menor</option>
//       </select>
//       <button onClick={resetOrders}>Resetear Orders</button>
//     </div>
//   );
// };

// export default Orders;

