
const getPokemonByName_API = require("../helpers/GET_BY_NAME/getPokemonAPIByName");
const getPokemonByName_DB = require("../helpers/GET_BY_NAME/getPokemonDBByName");

const getPokemonByName = async (name) => {
  try {
    let pokemonArr = []
    let pokemon = await getPokemonByName_API(name);
    //si tira error al obtener por el nombre indicado en la API me tira un error con la prop msg, busca en la BDD
    if (pokemon.msg) {
      pokemon = await getPokemonByName_DB(name)
      pokemon = JSON.parse(JSON.stringify(pokemon));
      pokemon.types = pokemon.Types.map(t=>t.name);
      delete (pokemon.Types);
      pokemonArr.push(pokemon)
      return pokemonArr;
    }
    pokemonArr.push(pokemon)
    return pokemonArr;
  } catch (error) {
    throw error
  }

   
    // // Normalizar el nombre del Pokémon convirtiéndolo a minúsculas
    // const nameNormalized = name.toLowerCase();
    
    // // Buscar el Pokémon en la base de datos por su nombre
    // const pokemonInDb = await Pokemon.findOne({
    //   where: { name: nameNormalized },
    // });
    
    // // Si el Pokémon está en la base de datos
    // if (pokemonInDb) {
    //   // Obtener los tipos del Pokémon desde la base de datos
    //   const pokemonTypes = await getPokemonTypesFromDb(pokemonInDb);
      
    //   // Imprimir los tipos del Pokémon en la consola
    //   console.log(pokemonTypes);
      
    //   // Devolver un objeto que combina los datos del Pokémon desde la base de datos y los tipos obtenidos
    //   return { ...pokemonInDb.dataValues, types: pokemonTypes };
    // }
    
    // // Si el Pokémon no está en la base de datos, realizar una consulta a la API de Pokémon por su nombre
    // const rawPokemon = (
    //   await axios(`https://pokeapi.co/api/v2/pokemon/${nameNormalized}`)
    // ).data;
    
    // // Parsear los datos del Pokémon utilizando la función parsePokemon del archivo helpers
    // const pokemon = parsePokemon(rawPokemon);
    
    // // Devolver el Pokémon parseado
    // return pokemon;
};

module.exports = getPokemonByName;