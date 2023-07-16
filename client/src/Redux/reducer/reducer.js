import { GET_POKEMONS, GET_POKEMON, GET_ALL_TYPES, GET_POKEMON_BY_NAME } from "../actions/actions";


const initialState={
    foundPokemons: true,
    pokemons: [],
    access: false,
    pokemon: [],
    types: [],
    order: {
      orderHiTolow: false,
      orderLowToHi: false,
    },
    orderAlf: {
      a_z: false,
      z_a: false
    },
    pages: 1,
    input: 1,
  };

const rootReducer=(state = initialState, action)=>{
    switch (action.type){
    case GET_POKEMONS:
        return{ ...state, pokemons: action.payload};
    case GET_POKEMON:
        return{ ...state, pokemon: action.payload };
    case GET_ALL_TYPES:
      return{ ...state, types: action.payload, pokemon: [] };
    case GET_POKEMON_BY_NAME:
      return{...state, pokemons: action.payload}
    default:
        return {...state};
    }
};

export default rootReducer;

