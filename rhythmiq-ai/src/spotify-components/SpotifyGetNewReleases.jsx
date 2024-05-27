import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function SpotifyGetNewReleases() {

  const NEW_RELEASES_ENDPOINT = "https://api.spotify.com/v1/browse/new-releases";
  const [token, setToken]= useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    if(localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
    }
  },[])

  const handleGetNewReleases = async() => {
    try {
        const response = await axios.get(NEW_RELEASES_ENDPOINT, {
            headers : {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        setData(response.data);
    } catch(error) {
        console.error("Failed fetching new releases: ", error);
    }
    
  }

  return (
  <>
  <button onClick={handleGetNewReleases}>Get New Releases</button>
  {data?.albums?.items ? data.albums.items.map((item) => <p key={item.id}>{item.name}</p>) : null}
  </>
  
  );
}
