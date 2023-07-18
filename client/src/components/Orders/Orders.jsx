import { useState } from "react";
import { useDispatch } from "react-redux";
import { orderByAbc, orderByStrength } from "../../Redux/actions/actions";

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
        key={order.abc}>
        <option value="all">Orden alfabetico</option>
        <option value="asc">A - Z</option>
        <option value="desc">Z - A</option>
      </select>
      <select
        name="filterAbc"
        onChange={handleOrderByStrength}
        key={order.ataque}
      >
        <option value="all">Orden por ataque</option>
        <option value="mayor">Ataque: Menor a Mayor</option>
        <option value="menor">Ataque: Mayor a Menor</option>
      </select>
    </div>
  );
};
export default Orders;

