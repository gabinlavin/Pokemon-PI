import { useState } from "react"
// import {  useEffect } from "react"
import {useSelector} from "react-redux";
// import {useDispatch} from "react-redux";

//componentes
// import Card from "../../components/Card/Card"

//actions
// import { POST_POKEMON, GET_POKEMONS } from "../../Redux/actions/actions";

import axios from "axios";

const Form = () => {
    // const dispatch = useDispatch();
    const types = useSelector((state)=>state.types);
    const [form,setPokemon] = useState({
        name: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        image: "",
        types: [],
    })

    const [errors,setErrors] = useState({
        name: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        image: "",
        types: [],
    })

    const handleOnChangeInps = ({ target }) => {
      const valueInp = target.value;
      const nameInp = target.name;
      const property = target.name;
      const value = target.value;

      setPokemon({...form, [property]:value})
      validate({...form, [property]:value})
  
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

    const validate = (form) => {
       if(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(form.nombre)) {
        setErrors({...errors,name:""})
       }else{
        setErrors({...errors,name:"Hay un error en el nombre"})
       }
       if(form.name==="") setErrors({...errors,name:"Nombre vacío"})
    }

    const submitHanlder = (event) => {
        event.preventDefault()
        axios.post("http://localhost:3001/pokemon", form)
        .then(res=>alert(res))
    }

    return (
        <form onSubmit={submitHanlder}>
          <div>
          <div>
            <div>
            <input type="text"
            value={form.name} 
            autoComplete="off"
            onChange={handleOnChangeInps} 
            name="name" 
            placeholder="Introducir Nombre" />
            {errors.name && <span>{errors.name}</span>}
            </div>

            <div>
            <input type="text" 
            value={form.image} 
            autoComplete="off"
            onChange={handleOnChangeInps} 
            name="image" 
            placeholder="insert URL image" />
            </div>

            <div>
            <input type="number"
            placeholder="Vida... ej: 20"
            value={form.hp} 
            autoComplete="off"
            onChange={handleOnChangeInps} 
            name="hp" />
            </div>

            <div>
            <input type="number" 
            placeholder="Ataque... ej: 25"
            autoComplete="off"
            value={form.attack} 
            onChange={handleOnChangeInps} 
            name="attack" />
            </div>

            <div>
            <input type="number"
            placeholder="Defensa... ej: 200"
            autoComplete="off"
            value={form.defense} 
            onChange={handleOnChangeInps} 
            name="defense" />
            </div>

            <div>
            <input type="number" 
             placeholder="Speed... ej: 80"
            value={form.speed} 
            autoComplete="off"
            onChange={handleOnChangeInps} 
            name="speed" />
            </div>

            <div>
            <input type="number" 
            placeholder="Altura... ej: 1.23 "
            value={form.height} 
            autoComplete="off"
            onChange={handleOnChangeInps} 
            name="height" />
            </div>
            
            <div>
            
            <input type="number" 
            placeholder="Peso... ej: "
            value={form.weight} 
            autoComplete="off"
            onChange={handleOnChangeInps} 
            name="weight" />
            </div>
            </div>
            </div>
             
            <div>
            {types?.map((t) => (
            <section key={t.id}>
              <label htmlFor={t.id}>
                {t.name}
              </label>
              <input
                type="checkbox"
                id={t.id}
                onChange={handleOnChangeCheckbox}
                name={t.name}
              />
            </section>
          ))}
            </div>
            <button type="submit">CREAR POKEMON!</button>
       </form>
    );
};

export default Form;