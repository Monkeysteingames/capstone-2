import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TmbdLogo from "../assets/TMDBLogo.svg"
import "../home/Footer.css";
import { BsLinkedin, BsGithub } from "react-icons/bs";


const Footer = () => (
  <div className="footer">
    <Container>
        <Row className="justify-content-md-center">
        <Col sm={8}>
            <img src={TmbdLogo} height="50" alt="TMDB Logo" />
            <p>Movie data sourced from TMDB API - <a href="https://www.themoviedb.org">www.themoviedb.org</a></p>
        </Col>
        <Col md="auto">
            <p>Website Author - Zachary George Augustine</p>
            <p>Contact - zacharyaugustine6@gmail.com</p>
        </Col>
        <Col md="auto">
            <a href="https://www.linkedin.com/in/zachary-augustine"><BsLinkedin/> </a>
            <a href="https://www.github.com/Monkeysteingames"><BsGithub/></a>
        </Col>
        </Row>
    </Container>
  </div>
);

export default Footer;