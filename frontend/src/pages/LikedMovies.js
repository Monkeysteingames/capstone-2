import React from "react";
import MoviesList from '../movie/MovieList';

function LikedMovies() {

    return (
    <div>
        <MoviesList listType={"Liked"} />
    </div>
    );
};

export default LikedMovies;