import React, { useState, useRef, useEffect } from 'react'
import { firestore } from '../Configs/firebase'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import "./Dashboard.css"

export default function Dashboard() {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [songReviews, setSongReviews] = useState([]);

  const collectionRef = collection(firestore, "song-reviews");

  const songRef = useRef();
  const albumRef = useRef();
  const artistRef = useRef();
  const ratingRef = useRef();

  /**  Display Function Firebase **/
  useEffect(() => {
    setLoading(true);

    const unsub = onSnapshot(collectionRef, (querySnapshot) => {
      const data =[];
      querySnapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()});
      });

      try{
        setLoading(true);
        setSongReviews(data);
        setLoading(false);
      }catch(error) {
        setError("Failed to fetch data from Firestore.");
        setLoading(false);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  /** Create Function Firebase **/ 
  const handleSave = async(e) => {
    e.preventDefault(); // Prevent refresh on action

    let data = {
      song: songRef.current.value,
      album: albumRef.current.value,
      artist: artistRef.current.value,
      rating: ratingRef.current.value,
    }

    try{
      addDoc(collectionRef, data);
    } catch(error) {
      console.log("Error : ", error);
    }
  }

  return (
    <>
   <div className='song-review'>
      <form onSubmit={handleSave}>
        <label>Song Review</label>
        <br/>
        <label>Song Name</label>
        <input type="text" ref={songRef}/>
        <br/>
        <label>Album</label>
        <input type="text" ref={albumRef}/>
        <br/>
        <label>Artist</label>
        <input type="text" ref={artistRef}/>
        <br/>
        <label>Rating</label>
        <input type="text" ref={ratingRef}/>
        <br/>
        <button type="submit">Save</button>
      </form>
   </div>
   <div className="song-review-container">
      {loading ? (
      <h1>Loading...</h1>
      ) : (
        songReviews.map((songs) => (
          <div key={songs.id}>
            <p>{songs.song} 
            {songs.album} 
            {songs.artist} 
            {songs.rating}</p>
          </div>
        ))
      )}
   </div>
   </>
  )
}
