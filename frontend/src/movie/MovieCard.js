import React, { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserContext from '../context/UserContext';
import {CardBody, CardTitle, Card, CardImg, Button, Modal, ModalBody} from 'reactstrap';
import MovieDetailsCard from '../movie/MovieDetailsCard';   
import { FaEllipsisV } from "react-icons/fa";
import "./Movies.css";


function MovieCard({ title, posterPath, overview, id }) {
  const [modal, setModal] = useState(false);
  const { currentUser } = useContext(UserContext);
  const imgPath = `https://image.tmdb.org/t/p/w300/${posterPath}`;
  const circleButtonStyle = {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:40,
    height:40,
    borderRadius:50,
};

  const toggle = () => setModal(!modal);

  
  // eclipse title for the card face - 15 characters is our limit
  const maxChars = 15;
  const eclipsedTitle = title.slice(0, maxChars) + "...";

  return (
    <>
      <Card
      className="my-2"
      color="dark"
      inverse
      style={{
      width: '20rem',
      }}
      >
        <CardBody className='card-body'>
          <CardImg src={imgPath} >
          </CardImg>
          <Container>
            <Row>
              <Col>
                <CardTitle>
                  {title.length > 18 ? 
                  <>
                  {eclipsedTitle}
                  </>
                  :
                  <>
                  {title}
                  </>
                  }
                </CardTitle>
              </Col>
              {currentUser ?
              <Col className='col-sm-auto offset-sm-1'> 
                <Button 
                style={circleButtonStyle}
                onClick={toggle}
                ><FaEllipsisV/></Button>
              </Col>
              :
              <></>
              } 
            </Row>
          </Container>
        </CardBody>
      </Card>
      {/* TODO: Add logic to prevent interaction,
      Instead redirect to signup/log in page  */}
      { modal ?
        <Modal isOpen={modal} toggle={toggle} color="dark">
          <ModalBody className='movie-modal center'>
          <MovieDetailsCard title={title} posterPath={posterPath} overview={overview} id={id} />
          </ModalBody>
          <Button color="secondary" onClick={toggle}>
            close
          </Button>
        </Modal>
        :
        <></>
      }
    </>
  );
};

export default MovieCard;
