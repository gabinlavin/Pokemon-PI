import "./App.css";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Home, Landing, Detail, Form } from "./pages/index";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* {location.pathname !== "/" && <NavBar /> } */}
        <Route path="/home" element={<NavBar />}>
          <Route index element={<Home />} />

          <Route path="detail/:id" element={<Detail></Detail>} />

          <Route path="create" element={<Form></Form>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
