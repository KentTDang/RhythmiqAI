
import { Swiper, SwiperSlide } from 'swiper/react'
import { useEffect, useState } from 'react'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'
import headerImg from './../Assets/img/header-img.svg'
import axios from 'axios'
import { Row, Container, Col } from 'react-bootstrap'


export const Song = () => {

  var token = window.localStorage.getItem("token")

  const [trendingSongs, setTrendingSongs] = useState([])
  const [change, setChange] = useState("")

  const getTrendingSongs = async () => {
    const response = await axios.get("https://api.spotify.com/v1/playlists/7BUu667Kbi9rVe3WGzJYvF", {
      headers: {
        Authorization: `Bearer ${token}`
      }

    })
    setTrendingSongs(response.data.tracks.items)
    setChange("change")
  }

  useEffect(()=> {

  }, [window.localStorage.getItem("token")])

  useEffect(() => {
    getTrendingSongs()
    console.log("this is trending songs", trendingSongs)
    console.log("this is token", token)

  }, [change])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };



  return (
    <section className="song" id="songs">
      <Container>
        <Row>
          <Col>
            <div className="song-bx">
              <h2>Trending Songs</h2>
              <p>FAT FAT FAT FAT FATFA FATFTGSYTBXUBWUYBXU</p>
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
                  modifier: 2.5
                }
              }
              paginatio={{el:'.swiper-pagination',clickable:true}}
              navigation={{
                nextEl:'.swiper-button-next',
                prevEl:'.swiper-button-prev',
                clickable: true,
              }}
              modules={[EffectCoverflow,Pagination,Navigation]} 
              className='swiper_container'>

              {trendingSongs.map((song) => (
                <SwiperSlide>
                  <img src={song.track.album.images[0].url} alt="slide_image"/>
             
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
