import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SpotifyGetRecommendations() {
  const RECOMMENDATIONS_ENDPOINT = "https://api.spotify.com/v1/recommendations";
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const handleGetRecommendations = async () => {
    try {
        const response = await axios.get(RECOMMENDATIONS_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Failed fetching new releases: ", error);
      }
  };

  return (
  <>
  <button onClick={handleGetRecommendations}>Get Recommendations</button>
  
  </>
  
  );
}
