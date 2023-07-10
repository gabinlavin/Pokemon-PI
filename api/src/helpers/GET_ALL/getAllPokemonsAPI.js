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
    /**
     * !FORMA EN LA QUE LLEGA LA INFO, NOS METEMOS A LA PROPIEDAD RESULTS
     * results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
    { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
    { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
    { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
    { name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10/' },
    { name: 'metapod', url: 'https://pokeapi.co/api/v2/pokemon/11/' },
    {
      name: 'butterfree',
      url: 'https://pokeapi.co/api/v2/pokemon/12/'
    },
    { name: 'weedle', url: 'https://pokeapi.co/api/v2/pokemon/13/' },
    { name: 'kakuna', url: 'https://pokeapi.co/api/v2/pokemon/14/' },
    { name: 'beedrill', url: 'https://pokeapi.co/api/v2/pokemon/15/' },
    { name: 'pidgey', url: 'https://pokeapi.co/api/v2/pokemon/16/' },
    { name: 'pidgeotto', url: 'https://pokeapi.co/api/v2/pokemon/17/' },
    { name: 'pidgeot', url: 'https://pokeapi.co/api/v2/pokemon/18/' },
    { name: 'rattata', url: 'https://pokeapi.co/api/v2/pokemon/19/' },
    { name: 'raticate', url: 'https://pokeapi.co/api/v2/pokemon/20/' },
    { name: 'spearow', url: 'https://pokeapi.co/api/v2/pokemon/21/' },
    { name: 'fearow', url: 'https://pokeapi.co/api/v2/pokemon/22/' },
    { name: 'ekans', url: 'https://pokeapi.co/api/v2/pokemon/23/' },
    { name: 'arbok', url: 'https://pokeapi.co/api/v2/pokemon/24/' },
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
    { name: 'raichu', url: 'https://pokeapi.co/api/v2/pokemon/26/' },
    { name: 'sandshrew', url: 'https://pokeapi.co/api/v2/pokemon/27/' },
    { name: 'sandslash', url: 'https://pokeapi.co/api/v2/pokemon/28/' },
    { name: 'nidoran-f', url: 'https://pokeapi.co/api/v2/pokemon/29/' },
    { name: 'nidorina', url: 'https://pokeapi.co/api/v2/pokemon/30/' },
    { name: 'nidoqueen', url: 'https://pokeapi.co/api/v2/pokemon/31/' },
    { name: 'nidoran-m', url: 'https://pokeapi.co/api/v2/pokemon/32/' },
    { name: 'nidorino', url: 'https://pokeapi.co/api/v2/pokemon/33/' },
    { name: 'nidoking', url: 'https://pokeapi.co/api/v2/pokemon/34/' },
    { name: 'clefairy', url: 'https://pokeapi.co/api/v2/pokemon/35/' },
    { name: 'clefable', url: 'https://pokeapi.co/api/v2/pokemon/36/' },
    { name: 'vulpix', url: 'https://pokeapi.co/api/v2/pokemon/37/' },
    { name: 'ninetales', url: 'https://pokeapi.co/api/v2/pokemon/38/' },
    {
      name: 'jigglypuff',
      url: 'https://pokeapi.co/api/v2/pokemon/39/'
    },
    {
      name: 'wigglytuff',
      url: 'https://pokeapi.co/api/v2/pokemon/40/'
    }
  ]
}
     */

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

    console.log(POKEMONS);
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
