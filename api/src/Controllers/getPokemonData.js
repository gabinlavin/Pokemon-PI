const axios = require("axios");
const { parsePokemon, getPokemonTypesFromDb } = require("../utils/helpers");
const { Pokemon } = require("../db");

const getPokemonData = async () => {
  try {
    // Obtener los Pokémon desde la base de datos
    const pokemonsInDb = await Pokemon.findAll();
    
    // Obtener los Pokémon completos desde la base de datos, incluyendo los tipos de cada Pokémon
    const pokemonsInDbCompletos = await Promise.all(
      pokemonsInDb.reverse().map(async (pokemonInDb) => {
        const pokemonTypes = await getPokemonTypesFromDb(pokemonInDb);
        const pokemonCompleto = {
          ...pokemonInDb.dataValues,
          types: pokemonTypes,
        };
        return pokemonCompleto;
      })
    );

    // Obtener los Pokémon desde la API
    const pokemonPromises = [];
    let i = 1;
    while (i <= 120) {
      let apiData = await axios(`https://pokeapi.co/api/v2/pokemon/${i}`);
      pokemonPromises.push(apiData);
      i++;
    }

    // Parsear los datos de los Pokémon de la API utilizando la función parsePokemon del archivo helpers
    const rawPokemons = (await Promise.all(pokemonPromises)).map(
      (response) => response.data
    );
    const parsedPokemons = rawPokemons.map((pokemon) => parsePokemon(pokemon));

    // Combinar los Pokémon de la base de datos y los Pokémon de la API en un solo array
    const allPokemons = [...pokemonsInDbCompletos, ...parsedPokemons];

    return allPokemons;
  } catch (error) {
    // Lanzar un error con el mensaje de error
    throw Error(error.message);
  }
};

module.exports = getPokemonData;