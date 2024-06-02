import React, { useEffect, useState } from "react";
import axios from "axios";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  dataList: {
    listStyleType: "square",
    padding: 10,
    display: "flex",
  },
  dataListItems: {
    "& > img": {
      width: 150,
      height: 150,
    },
    gap: 10,
    padding: 5,
    fontSize: 14,
  },
});
export default function SpotifyGetRecommendations() {
  const RECOMMENDATIONS_ENDPOINT = "https://api.spotify.com/v1/recommendations";
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const styles = useStyles();

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
        params: {
          seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
          seed_genres: "classical,country",
          seed_tracks: "0c6xIDDpzE81m2q797ordA",
        },
      });
      setData(response.data.tracks);
    } catch (error) {
      console.error("Failed fetching new releases: ", error);
    }
  };

  return (
    <>
      <button onClick={handleGetRecommendations}>Get Recommendations</button>
      <div className={styles.dataList}>
        {data.map((song) => (
          <div className={styles.dataListItems}>
            <button>
              <img src={song.album.images[0].url} />
            </button>
            <p>{song.name}</p>
            <p>{song.artists[0].name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
