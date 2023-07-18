import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getAllTypes } from "../../Redux/actions/actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";
import Orders from "../../components/Orders/Orders";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Pagination from "../../components/Paginado/Paginado";
import { setCurrentPage } from "../../Redux/actions/actions";

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const currentPage = useSelector((state) => state.currentPage);
  const perPage = useSelector((state) => state.perPage);

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getAllTypes());
  }, []);

  // Calcular la cantidad total de páginas
  const totalPages = Math.ceil(pokemons.length / perPage);

  // Función para cambiar la página actual
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <>
      <SearchBar />
      <Filters />
      <Orders />
      <CardsContainer />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Home;
