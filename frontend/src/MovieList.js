import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import MovieCheckApi from './movieCheckApi';
import { Spinner } from 'reactstrap';

function MoviesList() {
    const [movies, setMovies] = useState(null);

    // when component has mounted retreive all popular movies from TMDB API
    // this is a generic fetch where we show popular movies on the homepage
    // TODO: only show this when we need this

    useEffect(function fetchUserWhenMounted() {
        async function getMovies() {
            const res = await MovieCheckApi.getPopularMovies();
            setMovies(res);
        }
        getMovies();
    }, []);

    return (
      <div>
          {!movies ?   
          <Spinner
            color="dark"
            type="grow"
          >
          </Spinner> :
          <>
          {movies.map((movie, i) => ( 
          <MovieCard title={movie.title} key={i} backdrop_path={movie.backdrop_path}/>
          ))}
          </>
          }
      </div>

    );
  };


  export default MoviesList;