import React, { useState, useEffect } from 'react'
import { db } from '../Configs/firebase'
import { getDocs, collection } from 'firebase/firestore'

export default function Dashboard() {


  const [musicList, setMusicList] = useState([]);
  const musicCollectionRef = collection(db, "songs");

  useEffect(() => {
    const getMusicList = async () => {
      // Read Data
      try {
        const data = await getDocs(musicCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMusicList(filteredData);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      // Set the music list
      
    };
    getMusicList();
  }, []);



  return (
    <div>
      {musicList.map((song) => {
        <div>
          <h1>{song.artist}</h1>
          <p>{song.genre}</p>
        </div>
      })}
    </div>
  )
}
