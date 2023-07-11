const axios = require("axios");
const getAllPokemons_API = require("../helpers/GET_ALL/getAllPokemonsAPI");
const getAllPokemons_DB = require("../helpers/GET_ALL/getAllpokemonsDB");


const getPokemonData = async () => {
  try {
    //Dividimos la logica en dos.
    //Una logica va a buscar  pokemons en la base de datos, con sus correspondientes tipos
    //La otra logica va a buscar 40 pokemons en la API de pokemons
    const API_POKEMONS = await getAllPokemons_API();
    const DB_POKEMONS = await getAllPokemons_DB();
    const ALL_POKEMONS = [...DB_POKEMONS, ...API_POKEMONS];
    return ALL_POKEMONS;
  } catch (error) {
    // Lanzar un error con el mensaje de error
    throw Error(error.message);
  }
};

module.exports = getPokemonData;