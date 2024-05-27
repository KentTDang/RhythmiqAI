import './App.css';
import { NavBar } from "./Components/NavBar.js";
import { Banner } from "./Components/Banner.js";
import { Song } from "./Components/Song.js";
import ReviewTable from './Components/review/ReviewTable.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import Spotify from './spotify-components/Spotify.jsx'
import SpotifyGetPlaylist from './spotify-components/SpotifyGetPlaylist.jsx';


function App() {
  return (

    <div className="App">
      <Spotify/>
      <NavBar/>
      <Banner/>
      <Song/>
      <ReviewTable />
      <SpotifyGetPlaylist />
    </div>
  );
}

export default App;
