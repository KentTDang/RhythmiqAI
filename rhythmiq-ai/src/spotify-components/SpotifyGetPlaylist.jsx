import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function SpotifyGetPlaylist() {

  const NEW_RELEASES_ENDPOINT = "https://api.spotify.com/v1/browse/new-releases";
  const [token, setToken]= useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    if(localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
    }
  },[])

  const handleGetNewReleases = () => {
    try {
        axios.get(NEW_RELEASES_ENDPOINT, {
            headers : {
                Authorization: `Bearer ${token}`,
            },
            params: {

            }
        });    
    } catch(error) {
        console.error("Failed fetching new releases: ", error);
    }
    
  }

  return (
  <button onClick={handleGetNewReleases}>Get New Releases</button>
  );
}
