import {
  GET_POKEMONS,
  GET_POKEMON,
  GET_ALL_TYPES,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_TYPE,
  GET_POKEMON_ORIGIN_DB,
  GET_POKEMON_ORIGIN_API,
  ORDER_BY_ABC,
  ORDER_BY_STRENGTH,
  SET_CURRENT_PAGE,
} from "../actions/actions";

const initialState = {
  foundPokemons: true,
  pokemons: [],
  access: false,
  pokemon: [],
  types: [],
  pages: 1,
  input: 1,
  filtered: [],
  currentPage: 1,
  perPage: 12,
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
      return { ...state, pokemons: state.pokemons };

    case GET_POKEMON_ORIGIN_API:
      state.pokemons = state.pokemons.filter(
        (pokemon) => pokemon.is_default === true
      );
      return { ...state, pokemons: state.pokemons };

    case GET_POKEMON_TYPE:
      state.pokemons = state.pokemons.filter((pokemon) => {
        return pokemon.types.some((type) => type === action.payload);
      });

    case ORDER_BY_ABC:
      let orderPokemons = [...state.pokemons]; // Crear una copia del estado actual
      if (action.payload === "asc") {
        orderPokemons.sort((a, b) => a.name.localeCompare(b.name)); // Orden ascendente
      } else if (action.payload === "desc") {
        orderPokemons.sort((a, b) => b.name.localeCompare(a.name)); // Orden descendente
      }
      return {
        ...state,
        pokemons: orderPokemons,
      };

    case ORDER_BY_STRENGTH:
      let strengthPokemons = [...state.pokemons];
      if (action.payload === "mayor") {
        strengthPokemons.sort((a, b) => a.attack - b.attack); // orden de mayor a menor
      } else if (action.payload === "menor") {
        strengthPokemons.sort((a, b) => b.attack - a.attack); // orden de menor a mayor
      }
      return {
        ...state,
        pokemons: strengthPokemons,
      };
      
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
