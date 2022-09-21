import React, { useContext } from 'react';
import UserContext from "../context/UserContext";
import LandingCarousel from '../home/Landing';
import MoviesList from '../movie/MovieList';
import Footer from '../home/Footer';

function Home() {
  const { currentUser } = useContext(UserContext);

    return (
      <div className='home'>
        {!currentUser ? 
          <>
          <LandingCarousel />
          <Footer />
          </>
        :
          <>
          <MoviesList listType={"Popular"}/>
          <MoviesList listType={"Top Rated"}/>
          <MoviesList listType={"Upcoming"}/>
          <Footer />
          </>
        }
      </div>
    );
  };

export default Home;
