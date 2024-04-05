import React, { useState, useRef, useEffect } from 'react'
import { firestore } from '../../Configs/firebase'
import { addDoc, collection, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import "./Dashboard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import bg from '../../Assets/bg.webp'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {
  faArrowUp,
  faArrowDown,
  faTrash,
  faStar,
  faPlus
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
      rating: rating
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
      <div class="nav">
        <div class="nav-links">
          <a href="">Home</a>
          <a href="">About</a>
          <a href="">Work</a>
          <a href="">Contact</a>
        </div>
      </div>

      <div className="hero">
        <h1>Share Your <br />Love for <span>Music</span> <br />With Friends.
        </h1>
        <div className="hero-stars">
          <svg xmlns="http://www.w3.org/2000/svg" width="1680" height="730" viewBox='0 0 1680 730' fill='none'>
            <circle cx="0.6" cy="0.6" r="0.6" transform="matrix(0.873077 0.487583 -0.78755 0.61625 429.154 175.316)" fill="white"></circle>
            <circle cx="0.6" cy="0.6" r="0.6" transform="matrix(0.873077 0.487583 -0.78755 0.61625 429.154 175.316)" fill="white"></circle>
            <ellipse cx="0.6" cy="0.6" rx="0.6" ry="0.6" transform="matrix(-0.95101 -0.309159 0.561017 -0.827804 1504.14 366.363)" fill="white"></ellipse>
            <ellipse cx="0.6" cy="0.6" rx="0.6" ry="0.6" transform="matrix(-0.95101 -0.309159 0.561017 -0.827804 322.141 513.363)" fill="white"></ellipse>
            <circle cx="0.6" cy="0.6" r="0.6" transform="matrix(0.994947 -0.100399 0.322552 0.946552 440 282.121)" fill="white"></circle>
            <ellipse cx="0.6" cy="0.6" rx="0.6" ry="0.6" transform="matrix(-0.95101 -0.309159 0.561017 -0.827804 1553.78 554.305)" fill="white"></ellipse>
            <ellipse cx="0.6" cy="0.6" rx="0.6" ry="0.6" transform="matrix(-0.95101 -0.309159 0.561017 -0.827804 250.141 326.566)" fill="white"></ellipse>
            <ellipse cx="0.6" cy="0.6" rx="0.6" ry="0.6" transform="matrix(-0.95101 -0.309159 0.561017 -0.827804 280.908 307.363)" fill="white"></ellipse>
            <circle cx="0.6" cy="0.6" r="0.6" transform="matrix(0.994947 -0.100399 0.322552 0.946552 410.404 338.926)" fill="white"></circle>
            <circle cx="0.6" cy="0.6" r="0.6" transform="matrix(-0.322553 -0.946552 0.994947 -0.100399 1154.39 545.258)" fill="white"></circle>
            <circle cx="0.6" cy="0.6" r="0.6" transform="matrix(-0.322553 -0.946552 0.994947 -0.100399 995.66 552.828)" fill="white"></circle>
            <circle cx="0.6" cy="0.6" r="0.6" transform="matrix(0.994947 -0.100399 0.322552 0.946552 576 145.121)" fill="white"></circle>
            <circle cx="0.6" cy="0.6" r="0.6" transform="matrix(-0.322553 -0.946552 0.994947 -0.100399 814.387 514.258)" fill="white"></circle>
            <circle cx="0.6" cy="0.6" r="0.6" transform="matrix(0.061383 -0.998114 0.99741 0.07192 961.715 604.32)" fill="white"></circle>
            <circle cx="0.6" cy="0.6" r="0.6" transform="matrix(0.322553 0.946552 -0.994947 0.100399 861.078 260.352)" fill="white"></circle>
            <circle cx="0.6" cy="0.6" r="0.6" transform="matrix(0.322553 0.946552 -0.994947 0.100399 974.557 162.211)" fill="white"></circle>
            <circle cx="0.6" cy="0.6" r="0.6" transform="matrix(0.322553 0.946552 -0.994947 0.100399 544.891 280.938)" fill="white"></circle>
            <ellipse cx="0.6" cy="0.6" rx="0.6" ry="0.6" transform="matrix(-0.95101 -0.309159 0.561017 -0.827804 1140.55 485.527)" fill="white"></ellipse>
            <circle cx="0.6" cy="0.6" r="0.6" transform="matrix(0.322553 0.946552 -0.994947 0.100399 989.111 172.809)" fill="white"></circle>
            <circle cx="0.6" cy="0.6" r="0.6" transform="matrix(0.322553 0.946552 -0.994947 0.100399 1245.01 314.668)" fill="white"></circle>
            <circle cx="0.6" cy="0.6" r="0.6" transform="matrix(-0.958827 0.28399 -0.613701 -0.789538 586.887 448.488)" fill="white"></circle>
            <ellipse cx="0.6" cy="0.6" rx="0.6" ry="0.6" transform="matrix(-0.95101 -0.309159 0.561017 -0.827804 108.141 433.363)" fill="white"></ellipse>
            <circle cx="0.6" cy="0.6" r="0.6" transform="matrix(-0.958827 0.28399 -0.613701 -0.789538 1469.98 192.406)" fill="white"></circle>
            <circle cx="0.6" cy="0.6" r="0.6" transform="matrix(-0.958827 0.28399 -0.613701 -0.789538 1327.66 447.223)" fill="white"></circle>
            <circle cx="0.6" cy="0.6" r="0.6" transform="matrix(-0.958827 0.28399 -0.613701 -0.789538 1308.95 468.746)" fill="white"></circle>
            <ellipse cx="0.6" cy="0.6" rx="0.6" ry="0.6" transform="matrix(-0.95101 -0.309159 0.561017 -0.827804 320.141 360.363)" fill="white"></ellipse>
            <ellipse cx="0.6" cy="0.6" rx="0.6" ry="0.6" transform="matrix(-0.95101 -0.309159 0.561017 -0.827804 1086.54 295.914)" fill="white"></ellipse>
            <ellipse cx="0.6" cy="0.6" rx="0.6" ry="0.6" transform="matrix(-0.95101 -0.309159 0.561017 -0.827804 1285.14 263.363)" fill="white"></ellipse>
            <ellipse cx="0.6" cy="0.6" rx="0.6" ry="0.6" transform="matrix(-0.95101 -0.309159 0.561017 -0.827804 1343.31 263.105)" fill="white"></ellipse>
            <ellipse cx="0.6" cy="0.6" rx="0.6" ry="0.6" transform="matrix(-0.95101 -0.309159 0.561017 -0.827804 696.141 281.363)" fill="white"></ellipse>
            <ellipse cx="0.6" cy="0.6" rx="0.6" ry="0.6" transform="matrix(-0.95101 -0.309159 0.561017 -0.827804 630.725 434.363)" fill="white"></ellipse>
            <ellipse cx="0.6" cy="0.6" rx="0.6" ry="0.6" transform="matrix(-0.95101 -0.309159 0.561017 -0.827804 1372.09 492.215)" fill="white"></ellipse>
          </svg>
          <img src={bg} className='img' />
        </div>
      </div>

      <div className="review-dialog">
        <Popup trigger={<button><FontAwesomeIcon icon={faPlus} /></button>}
          modal nested>
          {
            close => (
              
              <div className='song-review'>
                <div className="review-top">
                <span>Song Review</span>
                <button button onClick={() => close()}>CLOSE</button>
                </div>
                <form onSubmit={handleSave}>
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
                  {[...Array(5)].map((_, index) => {
                    const currentRating = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          value={currentRating}
                          onClick={() => setRating(currentRating)}
                          checked={currentRating === rating} // Set checked based on current rating
                        />
                        <FontAwesomeIcon
                          className="star"
                          icon={faStar}
                          color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                  <br/>
                  <button className="button-main" type="submit">Save</button >
                </form>
                
              </div>
            )
          }
        </Popup>
      </div>

      <div className="content-container">
        <div className="song-review-container">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            songReviews.map((songs) => (
              <div className="review" key={songs.id}>
                <p>{songs.song} - {songs.album} - {songs.artist} - {songs.review}
                  {[...Array(5)].map((_, index) => {
                    const currentRating = index + 1;
                    return (
                      <FontAwesomeIcon
                        key={index}
                        className="star"
                        icon={faStar}
                        color={currentRating <= songs.rating ? "#ffc107" : "#e4e5e9"}
                      />
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
