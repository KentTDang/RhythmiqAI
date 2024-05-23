import React, { useState } from "react";
import Modal from "react-modal";
import "./Review.css";
import { faXmark, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../Configs/firebase";

export default function ReviewForm() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [song, setSong] = useState("");
  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(null);

  const collectionRef = collection(firestore, "song-reviews");

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const modalStyles = {
    content: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "transparent",
      border: "none",
    },
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent refresh on action

    const data = {
      song: song,
      album: album,
      artist: artist,
      review: review,
      votes: 0,
      rating: rating,
    };

    try {
      await addDoc(collectionRef, data);
      setSong("");
      setAlbum("");
      setArtist("");
      setReview("");
      setRating(null);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <button onClick={openModal} className="add-review-btn">
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <div className="song-review">
          <div className="review-top">
            <span style={{ color: "var(--dark-purple)" }}>Song Review</span>
            <button
              onClick={closeModal}
              style={{ color: "var(--dark-purple)" }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <form onSubmit={handleSave}>
            <label>Song Name</label>
            <input
              type="text"
              value={song}
              onChange={(e) => setSong(e.target.value)}
            />
            <br />
            <label>Album</label>
            <input
              type="text"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
            />
            <br />
            <label>Artist</label>
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
            <br />
            <label>Review</label>
            <input
              type="text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <br />
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
                    checked={currentRating === rating}
                  />
                  <FontAwesomeIcon
                    className="star"
                    icon={faStar}
                    color={
                      currentRating <= (rating ? rating : 0)
                        ? "#ffc107"
                        : "#e4e5e9"
                    }
                  />
                </label>
              );
            })}
            <br />
            <button className="button-main" type="submit">
              Save
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
