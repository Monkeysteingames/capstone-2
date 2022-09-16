import React, { useState  } from 'react';
import {CardBody, CardTitle, Card, CardImg, Button, Modal, ModalBody} from 'reactstrap';
import MovieDetailsCard from '../movie/MovieDetailsCard';


function MovieCard({ title, posterPath, overview, id, setRefreshMovies }) {
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
      width: '18rem',
      }}
      >
        <CardBody className='card-body opacity-0'>
          <CardImg src={imgPath} >
          </CardImg>
          <CardTitle tag="h4">
            {title}
          </CardTitle>
          <Button
          onClick={toggle}
          color="info"
          outline
          >details</Button>
        </CardBody>
      </Card>
      { modal ?
        <Modal isOpen={modal} toggle={toggle} color="dark">
          <ModalBody>
          <MovieDetailsCard title={title} posterPath={posterPath} overview={overview} id={id} setRefreshMovies={setRefreshMovies} />
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
