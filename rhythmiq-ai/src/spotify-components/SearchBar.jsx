import React, { useState, useEffect } from 'react';
import axios from 'axios';

var token = window.localStorage.getItem("token");

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const searchSongs = async () => {
      if (!search) {
        return; // Skip the API call if search term is empty
      }

      try {
        const response = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            q: search,
            type: "track",
            limit: 5
          }
        });

        setSearchResults(response.data.tracks.items);
      } catch (error) {
        console.error("Error Searching", error);
      }
    };

    searchSongs();
  }, [search]);

  const handleSongSelect = (selectedSong) => {
    console.log(selectedSong);
  };

  return (
    <div>
      <input
        id="searchbar"
        placeholder="Enter a Song or Artist"
        value={search}
        onChange={handleInputChange}
        type="text"
      />
      {search && (
        <ul>
          {searchResults.map((song) => (
            <li id="songlist" key={song.id} onClick={() => handleSongSelect(song)}>
              {song.name} - {song.artists.map((artist) => artist.name).join(', ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}