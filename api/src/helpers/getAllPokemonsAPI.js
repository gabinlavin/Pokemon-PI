/**
 * @getAllPokemonsAPI => es una funcion que va a obtener todos los pokemons de la base de datos
 * @URL => es la URL a la cual va a hacer un axios.get
 */
const axios = require("axios")

 const getAllPokemonsAPI = async () => {
    try {
        
    const URL_40_POKEMONS = "https://pokeapi.co/api/v2/pokemon?limit=40&offset=0";
    const DATA_POKEMONS = await axios.get(URL_40_POKEMONS);

    console.log(DATA_POKEMONS)





    } catch (error) {
        throw error.message
    }
}

module.exports = getAllPokemonsAPI