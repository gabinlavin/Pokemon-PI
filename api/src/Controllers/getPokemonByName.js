const axios = require("axios");
const { parsePokemon, getPokemonTypesFromDb } = require("../utils/helpers");
const { Pokemon } = require("../db");

const getPokemonByName = async (name) => {
  try {
    // Normalizar el nombre del Pokémon convirtiéndolo a minúsculas
    const nameNormalized = name.toLowerCase();
    
    // Buscar el Pokémon en la base de datos por su nombre
    const pokemonInDb = await Pokemon.findOne({
      where: { name: nameNormalized },
    });
    
    // Si el Pokémon está en la base de datos
    if (pokemonInDb) {
      // Obtener los tipos del Pokémon desde la base de datos
      const pokemonTypes = await getPokemonTypesFromDb(pokemonInDb);
      
      // Imprimir los tipos del Pokémon en la consola
      console.log(pokemonTypes);
      
      // Devolver un objeto que combina los datos del Pokémon desde la base de datos y los tipos obtenidos
      return { ...pokemonInDb.dataValues, types: pokemonTypes };
    }
    
    // Si el Pokémon no está en la base de datos, realizar una consulta a la API de Pokémon por su nombre
    const rawPokemon = (
      await axios(`https://pokeapi.co/api/v2/pokemon/${nameNormalized}`)
    ).data;
    
    // Parsear los datos del Pokémon utilizando la función parsePokemon del archivo helpers
    const pokemon = parsePokemon(rawPokemon);
    
    // Devolver el Pokémon parseado
    return pokemon;
  } catch (error) {
    // Imprimir el mensaje de error en la consola
    console.log(error.message);
  }
};

module.exports = getPokemonByName;