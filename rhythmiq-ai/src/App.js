import React from "react";
import "./App.css";
import { NavBar } from "./Components/NavBar.js";
import { Banner } from "./Components/Banner.js";
import ReviewTable from "./Components/review/ReviewTable.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Spotify from "./Components/spotify/Spotify.jsx";
import SpotifyGetTrendingSongs from "./Components/spotify/SpotifyGetTrendingSongs.jsx"
import SpotifyGetNewReleases from "./Components/spotify/SpotifyGetNewReleases.jsx";
import SpotifyGetRecommendations from "./Components/spotify/SpotifyGetRecommendations.jsx";

function App() {
  return (
    <div className="App">
      <Spotify />
      <NavBar />
      <Banner />
      <SpotifyGetTrendingSongs />
      <ReviewTable />
      <SpotifyGetNewReleases />
      <SpotifyGetRecommendations />
    </div>
  );
}

export default App;
