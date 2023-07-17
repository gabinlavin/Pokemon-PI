import {
  GET_POKEMONS,
  GET_POKEMON,
  GET_ALL_TYPES,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_TYPE,
  GET_POKEMON_ORIGIN_DB,
  GET_POKEMON_ORIGIN_API,
} from "../actions/actions";

const initialState = {
  foundPokemons: true,
  pokemons: [],
  access: false,
  pokemon: [],
  types: [],
  pages: 1,
  input: 1,
  filtered: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return { ...state, pokemons: action.payload };

    case GET_POKEMON:
      return { ...state, pokemon: action.payload };

    case GET_ALL_TYPES:
      return { ...state, types: action.payload, pokemon: [] };

    case GET_POKEMON_BY_NAME:
      return { ...state, pokemons: action.payload };

    case GET_POKEMON_ORIGIN_DB:
       state.pokemons = state.pokemons.filter(
        (pokemon) => pokemon.is_default === false
      );
      return {...state, pokemons: state.pokemons}

    case GET_POKEMON_ORIGIN_API:
      state.pokemons = state.pokemons.filter(
        (pokemon) => pokemon.is_default === true
      );
      return {...state, pokemons: state.pokemons}

    case GET_POKEMON_TYPE:
      state.pokemons = state.pokemons.filter((pokemon) => {
        return pokemon.types.some((type) => type === action.payload);
      });

    default:
      return { ...state };
  }
};

export default rootReducer;
