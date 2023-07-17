import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../Redux/actions/actions";
import { getAllTypes } from "../../Redux/actions/actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";


const Home = () => {

    const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getAllTypes());
  }, []);

  return (
    <>
      <SearchBar/>
      <Filters />
      <CardsContainer />
    </>
  );
};

export default Home;
