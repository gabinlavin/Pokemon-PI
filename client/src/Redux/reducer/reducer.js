import { GET_POKEMONS, GET_POKEMON } from "../actions/actions";


const initialState={
    foundPokemons: true,
    pokemons: [],
    access: false,
    pokemonId: {},
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
        return{ ...state, pokemons: action.payload };
    case GET_POKEMON:
        return{ ...state, pokemon: action.payload };
    default:
        return {...state};
    }
};

export default rootReducer;

