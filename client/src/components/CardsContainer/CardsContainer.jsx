import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";

const CardsContainer = (props) => {
  const pokemons = useSelector((state) => state.pokemons);
  const currentPage = useSelector((state) => state.currentPage);
  const perPage = useSelector((state) => state.perPage);

  if (!pokemons) {
    return <div>Cargando...</div>;
  }
    // Obtener el índice inicial y final de los pokemones a mostrar
    const indexOfLastPokemon = currentPage * perPage;
    const indexOfFirstPokemon = indexOfLastPokemon - perPage;
    const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  
  
    return (
      <div className={style.container}>
        {currentPokemons.length ? (
          currentPokemons.map((pokemon) => (
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
          ))
        ) : (
          <div>¡No se encontraron Pokemones!</div>
        )}
      </div>
    );
  };

export default CardsContainer;