import React, { useEffect, useState, useContext } from 'react';
import MovieCard from './MovieCard';
import TmdbApi from '../api/tmdbApi';
import MovieCheckApi from '../api/movieCheckApi';
import { Spinner, CardGroup } from 'reactstrap';
import UserContext from '../context/UserContext';

function MoviesList({ listType }) {
    const [movies, setMovies] = useState(null);
    const { currentUser } = useContext(UserContext);

    useEffect(function fetchUserWhenMounted() {
        async function getMovies() {
        if (listType === "Liked") {
        // API call to backend for liked movies
        const res = await MovieCheckApi.getMovies(currentUser.username);
        setMovies(res);
        } else {
        // API call to the TMDB 
        const res = await TmdbApi.getMovieLists(listType);
        setMovies(res);
        };
        }
        getMovies();
    }, [listType]);


    return (
      <div>
          {!movies ?   
          <Spinner
            color="dark"
          >
          </Spinner> :
          <>
          <h2 className="text-white">{listType} Movies</h2>
          {/* if we're pulling the list from our backend, the posterPath is camel cased
          if we're getting data from TMDB API then the poster_path is snake cased */}
          {listType === "Liked" ?
          <CardGroup>
            {/* backend movies */}
            {movies.map((movie, i) => (
              <MovieCard title={movie.title} key={i} posterPath={movie.posterPath} overview={movie.overview} id={movie.movieId}/>
            ))};
          </CardGroup>
          :
          <CardGroup>
            {/* TMDB movies */}
            {movies.map((movie, i) => (
              <MovieCard title={movie.title} key={i} posterPath={movie.poster_path} overview={movie.overview} id={movie.id}/>
            ))};
          </CardGroup>
          }
          </>
          }
      </div>

    );
  };

export default MoviesList;
