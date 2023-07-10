const { default: axios } = require("axios")


/**
 * 
 * @param {string} id => recibimos un parametro en forma de string, para buscar el numero del pokemon del 1 al 1000
 */
const getPokemonById_API = async(id)=> {
    try {
        const URL_BY_ID = `https://pokeapi.co/api/v2/pokemon/${id}`

        const POKEMON = await axios.get(URL_BY_ID);
        console.log(POKEMON)

    } catch (error) {
        
    }
}

module.exports = getPokemonById_API