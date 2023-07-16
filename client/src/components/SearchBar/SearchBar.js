import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByName } from '../../Redux/actions/actions';

const SearchBar = () => {
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!searchTerm){
        return
    }
    else{dispatch(getPokemonByName(searchTerm))}
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Buscar pokémon por nombre..."
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchBar;