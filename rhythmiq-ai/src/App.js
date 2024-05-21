import './App.css';
import { NavBar } from "./Components/NavBar.js";
import { Banner } from "./Components/Banner.js";
import { Song } from "./Components/Song.js";
import ReviewTable from './Components/review/ReviewTable.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (

    <div className="App">
      <NavBar/>
      <Banner/>
      <Song/>
      <ReviewTable />
    </div>
  );
}

export default App;
