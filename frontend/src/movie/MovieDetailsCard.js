import React, { useContext, useState, useEffect } from 'react';
import { CardBody, CardTitle, Card, CardImg, Button } from 'reactstrap';
import { FaRegThumbsUp, FaCheckSquare } from "react-icons/fa";
import MovieCheckApi from '../api/movieCheckApi';
import UserContext from '../context/UserContext';

function MovieDetailsCard({ title, posterPath, overview, id, setRefreshMovies }) {
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
  }, [currentUser, id]);

  async function likeMovie() {
    const res = await MovieCheckApi.addMovie(currentUser.username, {
      movieId : id, 
      title : title, 
      overview : overview, 
      posterPath : posterPath
    });
    if (res) {
      setLiked(true);
    }
  };

  async function dislikeMovie() {
    const res = await MovieCheckApi.removeMovie(currentUser.username, {
      movieId : id, 
      title : title, 
      overview : overview, 
      posterPath : posterPath
    });
    if (res) {
      setRefreshMovies();
      setLiked(false);
    };
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
            onClick={dislikeMovie}
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