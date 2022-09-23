# movie-check
 Website designed for movie lovers!

Deployed Link: https://movie-check.surge.sh/

------------

Movie Check is a website that allows you to browse movies and create a list of movies you've liked. It creates a list for you to go over your favorited movies. 

------------

# Features

 - Creating a custom profile. 
 - Eidting your profile. 
    - I wanted to give the user a custom space that gives them a unique experience
  
 - Searching for movies sourced from TDMB (The Movie Database) API
 - Liking movies and adding them to your favorites list
    - This is the bread and butter of website. I love movies, and also love creating lists. The favorited movie list in essence creates a viewing list of movies you've liked as well as movies you'd be interested in watching. 

-----------

# Testing

- To run the tests, you will need to run the moviecheck.sql file located in the backend directory.
- Tests are ran on the moviecheck-test database. Running 'npm test' while in the backend directory in your terminal will run the testing sequence. 

-----------

# User Flow

The landing page of the website provide an informative carousel that flips through the features of the website. The 3 main categories of premiered lists are visible while visiting not logged in. Those 3 categories are: Popular Movies, Top Movies, Upcoming Movies.

The user is unable to interact with the movie cards until they sign in/up. Once an account has been created the same list of movies will be visible on the home screen, minus the landing carousel. The movie cards will now show a details button that upon clicking pulls up a details panel. It provides an expanded image of the movie poster along with an overview of the movie, title, and like button. 

If the user likes a movie, within the nav bar there's a link to show them their list of liked movies. Additionally, the user may also use the 'search' tab in the nav to query a movie of choice by title name. 

If the user choose to as well, they may edit the details of the profile. 
