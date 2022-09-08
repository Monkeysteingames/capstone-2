import React, { useContext, useState } from 'react';
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import MoviesList from '../movie/MovieList';

function Home({ movieQuery={} }) {
  const currentUser = useContext(UserContext);
  const [didSearch, setDidSearch] = useState(false);

    return (
      <div className='home'>
        {!currentUser ? 
          <>
            <h2>Create an account or log in Placeholder!</h2>
            <Link to="/login">
              <button>
                Login 
              </button>
            </Link>
            <Link to="/signup">
              <button>
                Sign up 
              </button>
            </Link>
          </>
        :
          <>
          <MoviesList listType={"Popular"}/>
          <MoviesList listType={"Top Rated"}/>
          <MoviesList listType={"Upcoming"}/>
          </>
        }
      </div>
    );
  };

export default Home;
