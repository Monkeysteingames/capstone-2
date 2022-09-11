import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import TmdbApi from '../api/tmdbApi';
import { Spinner, CardGroup } from 'reactstrap';

function MoviesQueryList({ query }) {
  const [movies, setMovies] = useState(null);

  useEffect(function fetchUserWhenMounted() {
      async function getMovies() {
      const res = await TmdbApi.getMoviesByQuery(query);
      setMovies(res);
      }
      getMovies();
  }, [query]);


  return (
    <div className='queried-movie-list'>
        {!movies ?   
        <Spinner
          color="dark"
        >
        </Spinner> :
        <>
        {/* TODO: add logic for handling if we've liked a movie */}
        <h2 className="text-white">search results for: "{query}"</h2>
        <CardGroup>
        {movies.map((movie, i) => (
        <MovieCard title={movie.title} key={i} posterPath={movie.poster_path} overview={movie.overview} id={movie.id}/>
        ))}
        </CardGroup>
        </>
        }
    </div>

  );
};

export default MoviesQueryList;