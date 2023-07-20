import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonOfApi,
  getPokemonOfDb,
  getPokemons,
  getPokemonsForTypes,
  orderByAbc,
  orderByStrength,
} from "../../Redux/actions/actions";
import { useState } from "react";
import style from "./filters.module.css";

const Filters = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const [options, setOptions] = useState({
    types: "",
    is_default: "",
  });

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

  const handleOnChangeTypes = ({ target }) => {
    setOptions({ ...options, types: target.value });
    dispatch(getPokemonsForTypes(target.value));
  };

  const resetPokemonsTypes = () => {
    dispatch(getPokemons());
    setOptions({ ...options, types: "", is_default: "" });
    setOrder({ ...order, abc: "", ataque: "" });
  };

  const handleOnChangeOrigin = ({ target }) => {
    const value = target.value;
    if (value === "db") {
      dispatch(getPokemonOfDb());
      setOptions({ ...options, is_default: value });
    } else if (value === "api") {
      dispatch(getPokemonOfApi());
      setOptions({ ...options, is_default: value });
    }
  };

  return (
    <div>
      <select
        name="types"
        onChange={handleOnChangeTypes}
        value={options.types}
        className={style.olaLink}
      >
        {" "}
        <option value="" key="default1" hidden defaultValue={"Tipos"}>
          Tipos
        </option>
        {types?.map((type) => (
          <option value={type.name} key={type.id}>
            {type.name}
          </option>
        ))}
      </select>

      <select
        name="Origin"
        value={options.is_default}
        onChange={handleOnChangeOrigin}
        className={style.olaLink}
      >
        {" "}
        <option value="" key="default2" hidden defaultValue={"Tipos"}>
          Origen
        </option>
        <option value="db" key="db">
          Base de datos
        </option>
        <option value="api" key="api">
          Api
        </option>
      </select>

      <div>
        <select onChange={handleOrderByAbc} value={order.abc} className={style.olaLink}>
        <option value="" key="default3" hidden defaultValue={"Abc"}>
          Orden Alfabetico
        </option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
        <select
          name="Filterataque"
          onChange={handleOrderByStrength}
          key={order.ataque}
          className={style.olaLink}
          value={order.ataque}
        >
          {" "}
          <option value="" key="default4" hidden defaultValue={"Ataque"}>
            Orden por Ataque
          </option>
          <option value="mayor">Ataque: Menor a Mayor</option>
          <option value="menor">Ataque: Mayor a Menor</option>
        </select>
      </div>
      <button className={style.olaLink} onClick={resetPokemonsTypes}>
        Resetear Filtros
      </button>
    </div>
  );
};

export default Filters;
