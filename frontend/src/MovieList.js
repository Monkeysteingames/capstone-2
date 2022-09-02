import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import MovieCheckApi from './movieCheckApi';
import { Spinner, Row } from 'reactstrap';

function MoviesList({ listType }) {
    const [movies, setMovies] = useState(null);

    // when component has mounted retreive all popular movies from TMDB API
    // this is a generic fetch where we show popular movies on the homepage
    // TODO: only show this when we need this

    useEffect(function fetchUserWhenMounted() {
        async function getMovies() {
        const res = await MovieCheckApi.getMovieLists(listType);
        setMovies(res);
        }
        getMovies();
    }, []);

    console.log(movies);

    return (
      <div>
          {!movies ?   
          <Spinner
            color="dark"
            type="grow"
          >
          </Spinner> :
          <>
          {/* TODO: add logic for handling if we've liked a movie */}
          <h2>{listType} Movies</h2>
          <Row>
          {movies.map((movie, i) => ( 
          <MovieCard title={movie.title} key={i} backdrop_path={movie.backdrop_path}/>
          ))}
          </Row>
          </>
          }
      </div>

    );
  };

export default MoviesList;
