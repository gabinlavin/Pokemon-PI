/**
 * @getAllPokemonsAPI => es una funcion que va a obtener todos los pokemons de la base de datos
 * @URL => es la URL a la cual va a hacer un axios.get
 */
const axios = require("axios");

const getAllPokemons_API = async () => {
  try {
    const URL_40_POKEMONS =
      "https://pokeapi.co/api/v2/pokemon?limit=40&offset=0";
    const response = await axios.get(URL_40_POKEMONS);
    const AllPromisesOfPokemons = response.data.results;
    const ArrayOfPromises = AllPromisesOfPokemons.map(async (pokemon) => {
        const PromiseOfPokemon = await axios.get(pokemon.url);
        return PromiseOfPokemon;
      });
      
      // console.log(ArrayOfPromises)
      //No puedo consologuear esto porque son promesas que todavia no se resuelven dentro de un Array, por eso uso Promise.all()
      let POKEMONS = [];
      await Promise.all(ArrayOfPromises).then((resolveArrayOfPromises) => {
        //Se resuelve cada promesa que hay en el array
        POKEMONS = resolveArrayOfPromises.map(({ data }) => {
          //se parsea a una estructura como vos quieras el pokemon
          //Aca hay algo q vi diferente, la API cambio, ahora tiene una propiedad "data", que ahi contiene toda la info :3, pero es lo mismo
          //podes desestructurar el pokemon, y agarrar la propiedad "data" y de ahi sacas todas las cosas, con el metodo map, mapeas cada pokemon en su variable data, y se van agregando los objetos al array solos
          return {
            id: data.id,
            name: data.name,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
            image: data.sprites.front_default,
            types: data.types.map((t) => t.type.name),
            is_default: data.is_default,
          };     
        });
        
      });
      return POKEMONS
    } catch (error) {
      console.error({
        message: "Error en el helper Get pokemmons of API",
        error,
      });
      throw new Error(error.message);
    }
  };
  
  module.exports = getAllPokemons_API;