import React, { useContext } from 'react';
import UserContext from "./UserContext";
import { Link } from "react-router-dom";
import MoviesList from './MovieList';

function Home() {
  const currentUser = useContext(UserContext);

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
