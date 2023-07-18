import axios from "axios";
//Basicos
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON = "GET_POKEMON";
export const POST_POKEMON = "POST_POKEMON";
export const GET_POKEMON_ID = "GET_POKEMON_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const GET_POKEMON_TYPE = "GET_POKEMON_TYPE";

//get pokemons by db
export const GET_POKEMON_ORIGIN_DB = "GET_POKEMON_ORIGIN_DB";
export const GET_POKEMON_ORIGIN_API = "GET_POKEMON_ORIGIN_API"

//Ordenamiento y filtrados!
export const ORDER_BY_STRENGTH = "ORDER_BY_STRENGTH";
export const ORDER_BY_ABC = "ORDER_BY_ABC";

//paginado
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

//-----------------------------------------------------------

export const getPokemons = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/pokemon");
      const pokemons = apiData.data;
      dispatch({ type: GET_POKEMONS, payload: pokemons });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getPokemon = (id) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`http://localhost:3001/pokemon/${id}`);
      const pokemon = apiData.data;
      dispatch({ type: GET_POKEMON, payload: pokemon });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllTypes = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/type");
      const types = apiData.data;
      dispatch({ type: GET_ALL_TYPES, payload: types });
    } catch (error) {
      console.error(error);
    }
  };
};

export const createPokemon = (pokemonCreated) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/pokemon",
      pokemonCreated
    );
    alert(`Se creo a ${response.data.name} con exito`);
  } catch (error) {
    alert("No se ha creado el pokemon, nombre repetido");
  }
};

export const getPokemonByName = (name) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`http://localhost:3001/pokemon?name=${name}`);
      const pokemonByName = apiData.data
      dispatch({ type: GET_POKEMON_BY_NAME, payload: pokemonByName})
    } catch (error) {
      console.error(error);
    }
  };
};


//Obtener los pokemones de la db
export const getPokemonOfDb = () => {
  return { type: GET_POKEMON_ORIGIN_DB }
};
export const getPokemonOfApi = () => {
  console.log("api")
  return { type: GET_POKEMON_ORIGIN_API }
};

//Obtener los pokemones por los tipos
export const getPokemonsForTypes = (payload) => ({
  type: GET_POKEMON_TYPE,
  payload,
});

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
}


//Orden alfabetico
export function orderByAbc (payload) {
  return {
      type: "ORDER_BY_ABC",
      payload
  }
}

//orden por ataque
export function orderByStrength(payload) {
  return {
    type: "ORDER_BY_STRENGTH",
    payload,
  };
}