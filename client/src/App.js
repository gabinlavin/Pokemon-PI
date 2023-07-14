import './App.css';
import { Navigate, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Home, Landing, Detail, Form } from "./pages/index";
import NavBar from './components/NavBar/NavBar';


function App() {

const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar /> }
      <Route exact path="/" component={Landing}/>
      <Route path="/home" render={()=> <Home/>} />
      <Route exact path="/detail" component={Detail}/>
      <Route exact path="/create" component={Form}/>

    </div>
  );
}

export default App;
