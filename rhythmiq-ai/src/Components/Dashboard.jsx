import React, { useState, useRef, useEffect } from 'react'
import { firestore } from '../Configs/firebase'
import { addDoc, collection, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import "./Dashboard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowUp,
  faArrowDown,
  faTrash,
  faStar
} from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [songReviews, setSongReviews] = useState([]);

  const collectionRef = collection(firestore, "song-reviews");

  const songRef = useRef();
  const albumRef = useRef();
  const artistRef = useRef();
  const reviewRef = useRef();
  const voteRef = useRef();
  const ratingRef = useRef();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  /**  Display Function Firebase **/
  useEffect(() => {
    setLoading(true);

    const unsub = onSnapshot(collectionRef, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      try {
        setLoading(true);
        setSongReviews(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data from Firestore.");
        setLoading(false);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  /** Create Function Firebase **/
  const handleSave = async (e) => {
    e.preventDefault(); // Prevent refresh on action

    let data = {
      song: songRef.current.value,
      album: albumRef.current.value,
      artist: artistRef.current.value,
      review: reviewRef.current.value,
      votes: 0,
      rating: ratingRef.current.value
      // rating: parseFloat(ratingRef.current.value)
    }

    try {
      addDoc(collectionRef, data);
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  /**  Update Function Firebase **/
  const upVoteSongReview = async (id, votes) => {
    const songReviewDoc = doc(firestore, "song-reviews", id);
    const newFields = { votes: votes + 1 }
    await updateDoc(songReviewDoc, newFields)
  }

  const downVoteSongReview = async (id, votes) => {
    const songReviewDoc = doc(firestore, "song-reviews", id);
    const newFields = { votes: votes - 1 }
    await updateDoc(songReviewDoc, newFields)
  }

  /** Delete Function Firebase **/
  const deleteSongReview = async (id) => {
    const songReviewDoc = doc(firestore, "song-reviews", id);
    await deleteDoc(songReviewDoc);
  }

  return (
    <>
      <div className='song-review'>
        <form onSubmit={handleSave}>
          <label>Song Review</label>
          <br />
          <label>Song Name</label>
          <input type="text" ref={songRef} />
          <br />
          <label>Album</label>
          <input type="text" ref={albumRef} />
          <br />
          <label>Artist</label>
          <input type="text" ref={artistRef} />
          <br />
          <label>Review</label>
          <input type="text" ref={reviewRef} />
          <br />
          {/* <label>Rating</label>
          <input type="text" ref={ratingRef} pattern="[0-9]+(\.[0-9]+)?" required />
          <br /> */}
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label>
                <input
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onClick={() => setRating(currentRating)}
                  ref={ratingRef}
                />
                <FontAwesomeIcon className="start" icon={faStar}
                  color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
          <button className="button-main" type="submit">Save</button >
        </form>




      </div>




      <div className="content-container">
        <div className="song-review-container">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            songReviews.map((songs) => (
              <div className="review" key={songs.id}>
                <p>{songs.song}
                  {songs.album}
                  {songs.artist}
                  {songs.review}

                  {[...Array(5)].map((star, index) => {
                    const currentRating = songs.rating;
                    return (
                      <label>
                        <FontAwesomeIcon className="start" icon={faStar}
                          color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                          // onMouseEnter={() => setHover(currentRating)}
                          // onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </p>
                <div className="utility">
                  <div className="vote-container">
                    <button className="vote-button" onClick={() => { upVoteSongReview(songs.id, songs.votes) }}><FontAwesomeIcon icon={faArrowUp} /></button>
                    {songs.votes}
                    <button className="vote-button" onClick={() => { downVoteSongReview(songs.id, songs.votes) }}><FontAwesomeIcon icon={faArrowDown} /></button>
                  </div>
                  <button className="trash-button" onClick={() => { deleteSongReview(songs.id) }}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </>
  )
}
