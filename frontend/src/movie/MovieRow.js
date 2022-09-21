import React from 'react';
import MovieCard from './MovieCard';

function MovieRow({ movies }) {

  return (
    <div className='movie-list'>
        <div className="row">
        {!movies ? 
        <></>
            :
        <>
            {movies.map((movie, i) => (
                <MovieCard title={movie.title} key={i} posterPath={movie.poster_path} overview={movie.overview} id={movie.id} />
            ))}
        </>
        }
        </div>
    </div>
  );
};

export default MovieRow;