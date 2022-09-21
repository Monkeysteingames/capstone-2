import React, { useEffect, useState, useContext } from 'react';
import MovieCard from './MovieCard';
import TmdbApi from '../api/tmdbApi';
import MovieCheckApi from '../api/movieCheckApi';
import { Spinner } from 'reactstrap';
import UserContext from '../context/UserContext';
import PaginatedMovies from './MoviesPaginator';
import "../movie/Movies.css";

function MoviesList({ listType }) {
    const [movies, setMovies] = useState(null);
    const { currentUser } = useContext(UserContext);

    useEffect(function fetchMoviesWhenMounted() {
        async function getMovies() {
        if (listType === "Liked") {
          // API call to backend for liked movies
          const res = await MovieCheckApi.getMovies(currentUser.username);
          setMovies(res);
        } else {
          // API call to the TMDB 
          const res = await TmdbApi.getMovieLists(listType);
          // TODO: create mapper function to convert data to camel case
          setMovies(res);
        };
        }
        getMovies();
    }, [currentUser, listType]);

    return (
      <div>
          {!movies ?
            <Spinner
              color="dark"
            >
            </Spinner> 
            :
            <>
            <h2 className="text-white category-title">{listType} Movies</h2>
            {listType === "Liked" ?
            <>
              {/* backend movies */}
              <div className="row">
              {movies.map((movie, i) => (
                <MovieCard title={movie.title} key={i} posterPath={movie.posterPath} overview={movie.overview} id={movie.movieId} />
              ))};
              </div>
            </>
            :
            <>
              <PaginatedMovies movies={movies} />
            </>
            }
          </>
          }
      </div>
    );
  };

export default MoviesList;
