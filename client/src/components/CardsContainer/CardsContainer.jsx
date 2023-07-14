import Card from "../Card/Card"
import style from "./CardsContainer.module.css"
import { useSelector } from "react-redux"


const CardsContainer = (props)=>{
	const pokemons = useSelector(state=>state.pokemons)
  if (!pokemons) {
    return <div>Cargando...</div>;
  }
    return(
        <div className={style.container}>
            <h1>Pagina: {props.currentPage} </h1>
            <div>
                <button onClick={props.prevHandler}>Prev</button>
                <button onClick={props.nextHandler}>Next</button>
            </div>
            {pokemons.map(pokemon=>{
                return<Card key={pokemon.id}
                id={pokemon.id}
		        name={pokemon.name}
		        hp ={pokemon.hp}
		        attack ={pokemon.attack}
		        defense ={pokemon.defense}
		        speed ={pokemon.speed}
		        height={pokemon.height}
		        weight ={pokemon.weight}
		        image={pokemon.image}
				types={pokemon.types}
                />
            })}
        </div>
    )
}

export default CardsContainer;