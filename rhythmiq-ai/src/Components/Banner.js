import { Container, Row, Col } from 'react-bootstrap'
import headerImg from './../Assets/img/header-img.svg'

export const Banner = () => {
    return(
        <section className='banner' id='home'>
            <Container>
                <Row className='align-items-center'>
                    <Col xs={12} md={6} xl={7}>
                        <span className='tagline'>Welcome to Rhythmiq AI</span>
                        <h1>Share Your Music Love for Music With Friends.</h1>
                        <p>WE ARE GOING TO WIN. IN GOD WE TRUST WOOT WOOT WOOT</p>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImg} alt="Header Img"/>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}