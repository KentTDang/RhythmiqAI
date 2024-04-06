import './App.css';
import { NavBar } from "./Components/NavBar.js";
import { Banner } from "./Components/Banner.js";
// import { Skills } from "./components/Skills";
// import { Projects } from "./components/Projects";
// import { Contact } from "./components/Contact";
// import { Footer } from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css'

// import Dashboard from './Components/Dash/Dashboard.jsx'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (

    <div className="App">
      <NavBar/>
      <Banner/>
    </div>

    // <div>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<Dashboard/>}/>
    //     </Routes>
    //   </BrowserRouter>
    // </div>
  );
}

export default App;
