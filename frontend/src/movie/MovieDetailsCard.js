import React, { useContext, useState, useEffect } from 'react';
import { CardBody, CardTitle, Card, CardImg, Button } from 'reactstrap';
import { FaRegThumbsUp, FaCheckSquare } from "react-icons/fa";
import MovieCheckApi from '../api/movieCheckApi';
import UserContext from '../context/UserContext';

function MovieDetailsCard({ title, posterPath, overview, id }) {
  const { currentUser } = useContext(UserContext);
  const [isLiked, setLiked] = useState(false);

  const imgPath = `https://image.tmdb.org/t/p/w342/${posterPath}`;

  useEffect(function fetchUserWhenMounted() {
    async function getMovie() {
    const res = await MovieCheckApi.getMovie(currentUser.username, id);
    if (res) {
    setLiked(true);
    }
    };
    getMovie();
  }, [id]);

  async function likeMovie() {
    const res = await MovieCheckApi.addMovie(currentUser.username, {
      movieId : id, 
      title : title, 
      overview : overview, 
      posterPath : posterPath
    });
    setLiked(true);
  };

  return (
      <Card
      className="my-2"
      color="dark"
      inverse
      style={{
      width: '18rem',
      }}
      >
        <CardBody
        className="text-center"
        >
          <CardImg src={imgPath} >
          </CardImg>
          <CardTitle tag="h4">
            {title}
          </CardTitle>
          <p>{overview}</p>
          {isLiked ? 
            <Button
            color="success"
            outline
            ><FaCheckSquare/></Button>
          :
            <Button
            onClick={likeMovie}
            color="success"
            outline
            ><FaRegThumbsUp/></Button>
          } 
        </CardBody>
      </Card>
  );
};

export default MovieDetailsCard;