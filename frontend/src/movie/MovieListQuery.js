import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import TmdbApi from '../api/tmdbApi';
import { Spinner, CardGroup } from 'reactstrap';

function MoviesQueryList({ query }) {
  const [movies, setMovies] = useState(null);

  // when component has mounted retreive all popular movies from TMDB API
  // this is a generic fetch where we show popular movies on the homepage
  // TODO: only show this when we need this

  useEffect(function fetchUserWhenMounted() {
      async function getMovies() {
      const res = await TmdbApi.getMoviesByQuery(query);
      setMovies(res);
      }
      getMovies();
  }, [query]);

  console.log(movies);

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
        <MovieCard title={movie.title} key={i} poster_path={movie.poster_path} id={movie.id}/>
        ))}
        </CardGroup>
        </>
        }
    </div>

  );
};

export default MoviesQueryList;