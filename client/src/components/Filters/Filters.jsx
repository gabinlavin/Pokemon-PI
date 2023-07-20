import { useDispatch, useSelector } from "react-redux";
import { getPokemonOfApi, getPokemonOfDb, getPokemons, getPokemonsForTypes } from "../../Redux/actions/actions";
import { useState } from "react";
import style from './filters.module.css'


const Filters = () => {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);

    const [options, setOptions] = useState({
        types: "",
        is_default: "",
      });
    
    const handleOnChangeTypes = ({ target }) => {
        setOptions({ ...options, types: target.value });
        dispatch(getPokemonsForTypes(target.value));
      };

    const resetPokemonsTypes = () => {
        dispatch(getPokemons())
        setOptions({ ...options, types: "", is_default: ""});
    }

    const handleOnChangeOrigin = ({ target }) => {
        const value = target.value;
        if (value=== "db"){
            dispatch(getPokemonOfDb())
            setOptions({...options, is_default: value})
        } else if (value==="api"){
            dispatch(getPokemonOfApi())
            setOptions({...options, is_default: value})
        }
    }

  return (
    <div>
      <select 
       name="types"
       onChange={handleOnChangeTypes}
       value={options.types}
       className={style.olaLink}>
        {" "}
        <option value="" key="default" hidden defaultValue={"Tipos"}>
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
        className={style.olaLink}>
             {" "}
        <option value="" key="default" hidden defaultValue={"Tipos"}>
          Origen
        </option>
        <option value="db" key="db" >
            Base de datos
        </option>
        <option value="api" key="api">
            Api
        </option>
        </select>
      <button className={style.olaLink} onClick={resetPokemonsTypes} >Resetear Filtros</button>
    </div>
  );
};

export default Filters;
