import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";

const CardsContainer = (props) => {
  const pokemons = useSelector((state) => state.pokemons);
  if (!pokemons) {
    return <div>Cargando...</div>;
  }
  //filtrar por types
  

  return (
    <div className={style.container}>
      {pokemons.length ? pokemons.map((pokemon) => {
        return (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            hp={pokemon.hp}
            attack={pokemon.attack}
            defense={pokemon.defense}
            speed={pokemon.speed}
            height={pokemon.height}
            weight={pokemon.weight}
            image={pokemon.image}
            types={pokemon.types}
          />
        );
      })
    : <div>¡No se encontraron Pokemones!</div>
    }
    </div>
  );
};

export default CardsContainer;