import './App.css';
import { NavBar } from './Components/Dash/NavBar.js';
import 'bootstrap/dist/css/bootstrap.min.css'

// import Dashboard from './Components/Dash/Dashboard.jsx'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (

    <div className="App">
      <NavBar/>
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
