import React, { useState, useRef } from 'react'
import { firestore } from '../Configs/firebase'
import { addDoc, collection } from 'firebase/firestore'
import "./Dashboard.css"

export default function Dashboard() {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const collectionRef = collection(firestore, "song-reviews");

  const songRef = useRef();
  const albumRef = useRef();
  const artistRef = useRef();
  const ratingRef = useRef();


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
  )
}
