const axios = require("axios");
const { parsePokemon } = require("../utils/helpers");

const getPokemonById = async (id) => {
  try {
    // Consulta a la API para obtener la información del Pokémon por su ID
    const rawPokemon = (await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)).data;
    
    // Parseo de los datos del Pokémon utilizando la función parsePokemon del archivo helpers
    const pokemon = parsePokemon(rawPokemon);
    
    // Devolución del Pokémon parseado
    return pokemon;
  } catch (error) {
    // En caso de error, se devuelve false
    return false;
  }
};

module.exports = getPokemonById;