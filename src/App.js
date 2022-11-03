import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import TeamInformation from "./components/TeamInformation";
import Home from "./Home";

function App() {
  return(
    <Router>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;