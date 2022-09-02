import React, { useContext  } from 'react';
import {CardBody, CardTitle, Card, CardImg} from 'reactstrap';
import UserContext from './UserContext';


function MovieCard({title, backdrop_path, overview}) {
  const { currentUser } = useContext(UserContext);
  const imgPath = `https://image.tmdb.org/t/p/w300/${backdrop_path}`

  return (
    <div>
      <Card
      body
      style={{
      backgroundColor: 'lightgray',
      borderColor: 'lightgray',
      width: '18rem'
      }}
      >
        <CardBody>
          <CardImg src={imgPath} >
          </CardImg>
          <CardTitle tag="h4">
            {title}
          </CardTitle>
        </CardBody>
      </Card>
    </div>
  );
};

export default MovieCard;
