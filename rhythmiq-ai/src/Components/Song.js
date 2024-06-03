import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import { Row, Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { createUseStyles } from "react-jss";

export const Song = () => {
  const token = window.localStorage.getItem("token");

  const [trendingSongs, setTrendingSongs] = useState([]);
  const [change, setChange] = useState("");
  const [currentAudio, setCurrentAudio] = useState(null);

  const getTrendingSongs = async () => {
    const response = await axios.get(
      "https://api.spotify.com/v1/playlists/7BUu667Kbi9rVe3WGzJYvF",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTrendingSongs(response.data.tracks.items);
    setChange("change");
  };

  useEffect(() => {}, [window.localStorage.getItem("token")]);

  useEffect(() => {
    getTrendingSongs();
    console.log("this is trending songs", trendingSongs);
    console.log("this is token", token);
  }, [change]);

  const useStyles = createUseStyles({
    playButton: {
      height: 50,
      width: 50,
    },
    playIcon: {
      color: "black",
      height: 40,
      width: 40,
      justifyContent: "center",
    },
  });

  const styles = useStyles();

  const playAudio = (url) => {
    if (currentAudio) {
      currentAudio.pause();
    }
    const audio = new Audio(url);
    audio.play();
    audio.volume = 0.3;
    setCurrentAudio(audio);
  };

  return (
    <section className="song" id="songs">
      <Container>
        <Row>
          <Col>
            <div className="song-bx">
              <h2>Trending Songs</h2>
              <p>Top 100 Songs</p>
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                pagination={{ el: ".swiper-pagination", clickable: true }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                  clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container"
              >
                {trendingSongs.map((song) => (
                  <SwiperSlide key={song.track.id}>
                    <button
                      className={styles.playButton}
                      onClick={() => playAudio(song.track.preview_url)}
                    >
                      <FontAwesomeIcon icon={faPlay} className={styles.playIcon} />
                    </button>
                    <img
                      src={song.track.album.images[0].url}
                      alt="slide_image"
                    />
                  </SwiperSlide>
                ))}

                <div className="slider-container">
                  <div className="swiper-button-prev slider-arrow">
                    <ion-icon name="arrow-back-outline"></ion-icon>
                  </div>
                  <div className="swiper-button-next slider-arrow">
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </div>
                </div>
              </Swiper>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
