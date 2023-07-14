import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON = "GET_POKEMON";
// export const POST_POKEMON = "POST_POKEMON";
export const SET_PAGES = "SET_PAGES";
export const SET_INPUT = "SET_INPUT"


export const getPokemons = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/pokemon");
      const pokemons = apiData.data;
      dispatch({ type: GET_POKEMONS, payload: pokemons });
    } catch (error) {
      console.error(error);
      // Manejar el error apropiadamente, por ejemplo, con dispatch de una acción de error
    }
  };
};

export const getPokemon =(id)=>{
return async function(dispatch){
  try{
    const apiData = await axios.get(`http://localhost:3001/pokemon/${id}`);
  const pokemon = apiData.data;
  dispatch({ type: GET_POKEMON, payload: pokemon});
    } catch(error) {
      console.error(error);
    }
  };
};

// export const createPokemon = (pokemonCreated) => async dispatch => {
//   try {
//     const response = await axios.post ("http://localhost:3001/pokemon", pokemonCreated);
//     alert(`Se creo a ${response.data.name} con exito`)
//   } catch (error) {
//     alert("No se ha creado el pokemon, nombre repetido")
//   }
// }

// export const filterBySource = () => {
//   dispatch({ type: "FILTER_BY_SOURCE" });
// }

// export const setPagina = (payload)=> {
//   return ({type: SET_PAGES, payload})
// }
// export const setInput = (payload) => ({type: SET_INPUT, payload})