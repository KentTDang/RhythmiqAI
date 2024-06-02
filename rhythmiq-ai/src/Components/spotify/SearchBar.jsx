import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {create, debounce} from 'lodash'
import {createUseStyles} from 'react-jss'


var token = window.localStorage.getItem("token");

const searchSongs = async (search) => {
  if (!search) {
    return [];
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

    return response.data.tracks.items

  } catch (error) {
    console.error("Error Searching", error);
  }
};

var debounceSearchSongs = debounce(searchSongs, 300, {maxWait: 400})

const useStyles = createUseStyles({
  searchSongResultList: {
    listStyleType: "square",
    padding: 10,
  }, 
  searchSongResultListItem: {
    "& > img": {
      width: 35,
      height: 35,
    },
    display: "flex",
    gap: 10,
    padding: 5,
  },


})


export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const styles = useStyles()

  const handleInputChange = async (event) => {
     setSearch(event.target.value)
  };

  useEffect(() => {

    debounceSearchSongs(search)?.then((_searchResults) => {
         setSearchResults(_searchResults)
     })
    
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
        <ul className = {styles.searchSongResultList}>
          {searchResults.map((song) => (
            <li id="songlist" className = {styles.searchSongResultListItem} key={song.id} onClick={() => handleSongSelect(song)}>
              <img src = {song.album.images[0].url}/> 
              
              {song.name} - {song.artists.map((artist) => artist.name).join(', ')}

            </li>
          ))}
          
        </ul>
      )}
    </div>
  );
}