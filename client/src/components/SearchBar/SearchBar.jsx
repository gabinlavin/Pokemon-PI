import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByName } from '../../Redux/actions/actions';
import style from './searchBar.module.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchTerm) {
      return;
    } else {
      dispatch(getPokemonByName(searchTerm));
    }
  };

  return (
    <div className={style.searchBar}>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Buscar..."
          className={style.input}
        />
        <button type="submit" className={style.button} onSubmit={handleSubmit}>
        <span class="span">🔎</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;