import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { Spinner, Row } from 'reactstrap';

function MoviesListQuery({ movies }) {
    // const [movies, setMovies] = useState(null);

    // when component has mounted retreive all popular movies from TMDB API
    // this is a generic fetch where we show popular movies on the homepage
    // TODO: only show this when we need this

    return (
      <div>
          {!movies ?   
          <Spinner
            color="dark"
          >
          </Spinner> :
          <>
          {/* TODO: add logic for handling if we've liked a movie */}
          <Row>
          {movies.map((movie, i) => ( 
          <MovieCard title={movie.title} key={i} poster_path={movie.poster_path}/>
          ))}
          </Row>
          </>
          }
      </div>

    );
  };

export default MoviesListQuery;
