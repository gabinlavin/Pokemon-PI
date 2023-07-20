import { useState } from "react";
// import {  useEffect } from "react"
import { useSelector } from "react-redux";
// import {useDispatch} from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import style from "./form.module.css";
//componentes
// import Card from "../../components/Card/Card"

//actions
import {
  createPokemon,
  getAllTypes,
  getPokemons,
} from "../../Redux/actions/actions";

const Form = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const initialPokemon = {
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    image: "",
    types: [],
  };

  useEffect(()=>{
    if (types.length===0 || !types){
      dispatch(getAllTypes())
    }
  },[types]);
  
  const [form, setPokemon] = useState(initialPokemon);

  const handleOnChangeInps = ({ target }) => {
    const valueInp = target.value;
    const nameInp = target.name;
    validate({ ...form, [nameInp]: valueInp });

    nameInp === "name" || nameInp === "image"
      ? setPokemon({
          ...form,
          [nameInp]: valueInp,
        })
      : setPokemon({
          ...form,
          [nameInp]: parseInt(valueInp),
        });
  };

  const handleOnChangeCheckbox = ({ target }) => {
    if (target.checked) {
      setPokemon({
        ...form,
        types: [...form.types, target.id],
      });
    } else if (!target.checked) {
      //Busco por id el nombre que quiero quitar
      const findIndexName = form.types.indexOf(target.id);
      //actualizo el array sacando el indice que encontre
      form.types.splice(findIndexName, 1);

      //seteo el estado local
      setPokemon({
        ...form,
        types: form.types,
      });
    }
  };

  const [inputErrors, setInputErrors] = useState({});

  const validate = (form) => {
    const errors = {};

    // Validación para el campo "name"
    if (!form.name) {
      errors.name = "Nombre vacío";
    } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
      errors.name = "Error en el nombre";
    }

    // Validación para el campo "hp"
    if (form.hp <= 0 || !form.hp) {
      errors.hp = "HP debe ser mayor a 0";
    }

    // Validación para el campo "attack"
    if (form.attack <= 0 || !form.attack) {
      errors.attack = "El Ataque debe ser mayor a 0";
    }

    // Validación para el campo "defense"
    if (form.defense <= 0 || !form.defense) {
      errors.defense = "La defensa debe ser mayor a 0";
    }

    // Validación para el campo "speed"
    if (form.speed <= 0 || !form.speed) {
      errors.speed = "La Velocidad debe ser mayor a 0";
    }

    // Validación para el campo "height"
    if (form.height <= 0 || !form.height) {
      errors.height = "La Altura debe ser mayor a 0";
    }

    // Validación para el campo "weight"
    if (form.weight <= 0 || !form.weight) {
      errors.weight = "El Peso debe ser mayor a 0";
    }

    setInputErrors(errors);

    return Object.keys(errors).length === 0; // Retorna true si no hay errores
  };

  const submitHanlder = (event) => {
    event.preventDefault();

    if (validate(form)) {
      dispatch(createPokemon(form));
      setPokemon(initialPokemon);
      event.target.reset();
      dispatch(getPokemons());
    }
  };

  return (
    <form onSubmit={submitHanlder} className={style.formContainer}>
      <div>
        <div>
          <div className={style.inputField}>
            <input
              type="text"
              value={form.name}
              autoComplete="off"
              onChange={handleOnChangeInps}
              name="name"
              placeholder="Introducir Nombre"
            />
            {inputErrors.name && (
              <span className={style.error}>{inputErrors.name}</span>
            )}
          </div>

          <div className={style.inputField}>
            <input
              type="text"
              value={form.image}
              autoComplete="off"
              onChange={handleOnChangeInps}
              name="image"
              placeholder="insert URL image"
            />
          </div>

          <div className={style.inputField}>
            <input
              type="number"
              placeholder="Vida... ej: 20"
              value={form.hp}
              autoComplete="off"
              onChange={handleOnChangeInps}
              name="hp"
            />
            {inputErrors.hp && (
              <span className={style.error}>{inputErrors.hp}</span>
            )}
          </div>

          <div className={style.inputField}>
            <input
              type="number"
              placeholder="Ataque... ej: 25"
              autoComplete="off"
              value={form.attack}
              onChange={handleOnChangeInps}
              name="attack"
            />
            {inputErrors.atack && (
              <span className={style.error}>{inputErrors.atack}</span>
            )}
          </div>

          <div className={style.inputField}>
            <input
              type="number"
              placeholder="Defensa... ej: 200"
              autoComplete="off"
              value={form.defense}
              onChange={handleOnChangeInps}
              name="defense"
            />
            {inputErrors.defense && (
              <span className={style.error}>{inputErrors.defense}</span>
            )}
          </div>

          <div className={style.inputField}>
            <input
              type="number"
              placeholder="Speed... ej: 80"
              value={form.speed}
              autoComplete="off"
              onChange={handleOnChangeInps}
              name="speed"
            />
            {inputErrors.speed && (
              <span className={style.error}>{inputErrors.speed}</span>
            )}
          </div>

          <div className={style.inputField}>
            <input
              type="number"
              placeholder="Altura... ej: 1.23 "
              value={form.height}
              autoComplete="off"
              onChange={handleOnChangeInps}
              name="height"
            />
            {inputErrors.height && (
              <span className={style.error}>{inputErrors.height}</span>
            )}
          </div>

          <div className={style.inputField}>
            <input
              type="number"
              placeholder="Peso... ej: "
              value={form.weight}
              autoComplete="off"
              onChange={handleOnChangeInps}
              name="weight"
            />
            {inputErrors.weight && (
              <span className={style.error}>{inputErrors.weight}</span>
            )}
          </div>
        </div>
      </div>

      <div className={style.checkboxContainer}>
        {types?.map((t) => (
          <section key={t.id}>
            <label htmlFor={t.id} className={style.checkboxLabel}>
              {t.name}
              <input
                type="checkbox"
                id={t.id}
                onChange={handleOnChangeCheckbox}
                name={t.name}
                className={style.checkboxInput}
              />
            </label>
          </section>
        ))}
      </div>

      <div className={style.buttonContainer}>
        <button type="submit" className={style.submitButton}>
          CREAR POKEMON!
        </button>
      </div>
    </form>
  );
};

export default Form;
