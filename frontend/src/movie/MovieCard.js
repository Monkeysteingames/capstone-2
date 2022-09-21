import React, { useState  } from 'react';
import {CardBody, CardTitle, Card, CardImg, Button, Modal, ModalBody} from 'reactstrap';
import MovieDetailsCard from '../movie/MovieDetailsCard';   
import { FaEllipsisV } from "react-icons/fa";


function MovieCard({ title, posterPath, overview, id }) {
  const [modal, setModal] = useState(false);
  const imgPath = `https://image.tmdb.org/t/p/w300/${posterPath}`

  const toggle = () => setModal(!modal);

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
          <CardTitle>
            {title}
          </CardTitle>
          <Button
          onClick={toggle}
          ><FaEllipsisV/></Button>
        </CardBody>
      </Card>
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
