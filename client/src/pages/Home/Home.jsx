import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../Redux/actions/actions";


const Home = () => {

const dispatch = useDispatch();

    useEffect(()=>{
    dispatch(getPokemons());
    },[])

    return(
        <>
            <h1>Esta es la vista HOME!!!!</h1>
            <CardsContainer />
       </>
    )
}

export default Home;