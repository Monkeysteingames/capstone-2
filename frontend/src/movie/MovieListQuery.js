import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import TmdbApi from '../api/tmdbApi';
import { Spinner } from 'reactstrap';
import { FaSearch } from "react-icons/fa";

function MoviesQueryList({ query }) {
  const [movies, setMovies] = useState(null);

  useEffect(function fetchMoviesWhenMounted() {
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
        <h2 className="col-sm-6 .order-sm-2 offset-sm-1 text-white"><FaSearch/> Search for: "{query}"</h2>
        <div className='row'>
        {movies.map((movie, i) => (
            <MovieCard title={movie.title} key={i} posterPath={movie.poster_path} overview={movie.overview} id={movie.id} />
        ))}
        </div>
        </>
        }
    </div>

  );
};

export default MoviesQueryList;