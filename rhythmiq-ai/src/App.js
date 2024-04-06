import './App.css';
import { NavBar } from "./Components/NavBar.js";
import { Banner } from "./Components/Banner.js";
import { Song } from "./Components/Song.js";
import { Review } from "./Components/Review.js"
import Dashboard from './Components/Dash/Dashboard.jsx'

// import { reviews } from "./Components/reviews";
// import { Contact } from "./Components/Contact";
// import { Footer } from "./Components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (

    <div className="App">
      <NavBar/>
      <Banner/>
      <Song/>
      <Review/>
      {/* <Dashboard/> */}
    </div>
  );
}

export default App;
