import './App.css';
import { NavBar } from "./Components/NavBar.js";
import { Banner } from "./Components/Banner.js";
import { Skills } from "./Components/Skills.js";
import Dashboard from './Components/Dash/Dashboard.jsx'

// import { Projects } from "./Components/Projects";
// import { Contact } from "./Components/Contact";
// import { Footer } from "./Components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (

    <div className="App">
      <NavBar/>
      <Banner/>
      <Skills/>
      {/* <Dashboard/> */}
    </div>
  );
}

export default App;
