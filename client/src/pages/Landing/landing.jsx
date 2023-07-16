import { Link } from "react-router-dom";

const Landing = () => {
    return(
        <>
            <h1>Esta es la vista Landing!!!!</h1>
            <Link to={"/home"}>Entrar a Home</Link>
       </>
    )
}

export default Landing;