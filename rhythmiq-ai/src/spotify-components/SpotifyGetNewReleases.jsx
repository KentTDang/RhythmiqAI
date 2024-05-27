import React, { useState, useEffect } from "react";
import axios from "axios";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  dataList: {
    listStyleType: "square",
    padding: 10,
  }, 
  dataListItem: {
    "& > img": {
      width: 35,
      height: 35,
    },
    display: "flex",
    gap: 10,
    padding: 5,
  },
});

export default function SpotifyGetNewReleases() {
  const NEW_RELEASES_ENDPOINT =
    "https://api.spotify.com/v1/browse/new-releases";
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const handleGetNewReleases = async () => {
    try {
      const response = await axios.get(NEW_RELEASES_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.albums.items);
    } catch (error) {
      console.error("Failed fetching new releases: ", error);
    }
  };

  
  const styles = useStyles()

  return (
    <>
      <button onClick={handleGetNewReleases}>Get New Releases</button>
      <ul className={styles.dataList}>
      {data.map((song) => (
        <li className={styles.dataListItem}>
          <p key={song.id}>{song.name}</p>
          <img src={song.images[0].url} />
        </li>
      ))}
      </ul>
      
    </>
  );
}
