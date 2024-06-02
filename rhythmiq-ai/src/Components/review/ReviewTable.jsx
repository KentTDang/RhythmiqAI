import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import "./Review.css";
import { firestore } from "../../Configs/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faTrash,
  faStar,
  faMagnifyingGlass,
  faDisplay,
} from "@fortawesome/free-solid-svg-icons";
import "animate.css";
import ReviewForm from "./ReviewForm";

export default function ReviewTable() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [songReviews, setSongReviews] = useState([]);
  const [filter, setFilter] = useState("");

  // Update state for form fields
  const [artist, setArtist] = useState("");

  const collectionRef = collection(firestore, "song-reviews");

  useEffect(() => {
    setLoading(true);

    const q = filter
      ? query(collectionRef, where("artist", "==", filter))
      : collectionRef;

    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSongReviews(data);
        setLoading(false);
      },
      (error) => {
        setError("Failed to fetch data from Firestore.");
        setLoading(false);
      },
    );

    return () => unsub();
  }, [filter]);

  async function queryCollection(searchArtist) {
    setFilter(searchArtist);
  }

  /**  Update Function Firebase **/
  const upVoteSongReview = async (id, votes) => {
    const songReviewDoc = doc(firestore, "song-reviews", id);
    const newFields = { votes: votes + 1 };
    await updateDoc(songReviewDoc, newFields);
  };

  const downVoteSongReview = async (id, votes) => {
    const songReviewDoc = doc(firestore, "song-reviews", id);
    const newFields = { votes: votes - 1 };
    await updateDoc(songReviewDoc, newFields);
  };

  /** Delete Function Firebase **/
  const deleteSongReview = async (id) => {
    const songReviewDoc = doc(firestore, "song-reviews", id);
    await deleteDoc(songReviewDoc);
  };

  return (
    <>
      <section className="review" id="reviews">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="review-tool-bar">
            <h2 className="review-header">Reviews</h2>
            <div className="review-tool-bar-actions">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  queryCollection(artist);
                }}
              >
                <div className="review-search-bar">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  <input
                    type="text"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder="Search by Artist..."
                  />
                  <button type="submit"></button>
                </div>
              </form>
              <ReviewForm />
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-center">
          <div className="review-dialog">
            <div className="song-review-container">
              {loading ? (
                <h1>Loading...</h1>
              ) : songReviews.length > 0 ? (
                songReviews.map((song) => (
                  <div className="review" key={song.id}>
                    <h3>
                      {song.song} - {song.album}
                    </h3>
                    <p>Artist: {song.artist}</p>
                    <p>{song.review}</p>
                    <div className="rating">
                      {[...Array(5)].map((_, index) => {
                        return (
                          <FontAwesomeIcon
                            key={index}
                            icon={faStar}
                            color={index < song.rating ? "#ffc107" : "#e4e5e9"}
                          />
                        );
                      })}
                    </div>
                    <div className="utility">
                      <div className="vote-container">
                        <button
                          className="vote-button"
                          onClick={() => upVoteSongReview(song.id, song.votes)}
                        >
                          <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                        {song.votes}
                        <button
                          className="vote-button"
                          onClick={() =>
                            downVoteSongReview(song.id, song.votes)
                          }
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                      </div>
                      <button
                        className="trash-button"
                        onClick={() => deleteSongReview(song.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews found.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
