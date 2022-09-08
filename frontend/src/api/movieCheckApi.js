import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * 
 */

class MovieCheckApi {
  // The token for interactions with the backend API will be stored here.
  static token;
  // API key for requests made to The Movie Database API will be stored here.
  // static tmbdApiKey;

  static async request(endpoint, data = {}, method = "get", ) {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { 
      Authorization: `Bearer ${MovieCheckApi.token}`,
      'Access-Control-Allow-Origin' : 'http://localhost:3001',
      'Access-Control-Allow-Credentials' : 'true',
      "Access-Control-Allow-Methods" : "GET, POST, PATCH, DELETE"
    };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async tmdbRequest(endpoint, data = {}, method = "get", ) {
    console.debug("TMDB API Call:", endpoint, data, method);

    const url = `${TMDB_BASE_URL}${endpoint}`;
  
    const params = (method === 'get') 
    ? {api_key : "e0a084cd13b35534c48fa5cf58a90e6e", ...data}
    : {};

    try {
      return (await axios({ url, method, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  
  // back-end API routes *****************************

  /** Authenticate user when attempting login. */

  static async authenticate(user) {
    let res = await this.request(`auth/token`, user, 'post');
    return res.token;
  };

  /** Register new user to DB on signup. */

  static async register(newUser) {
    let res = await this.request(`auth/register`, newUser, 'post');
    return res.token;
  };

  /** Get user by username. */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  };

  /** Patch user info with data from profile page. */

  static async updateUser(username, user) {
    let res = await this.request(`users/${username}`, user, 'patch');
    return res.data;
  };

  /** Add new movie to users liked_movies */

  static async addMovie(username, data) {
    let res = await this.request(`movies/${username}`, data, 'post');
    return res.movie;
  };

  /** Get all users liked_movies */

  static async getMovies(username, data) {
    let res = await this.request(`movies/${username}`, data, 'get');
    return res.movies;
  };

  /** Rate movie in users liked_movies */

  static async rateMovie(username, data) {
    let res = await this.request(`movies/${username}`, data, 'patch');
    return res.movie;
  };

  /** Remove movie from useres liked_movies */

  static async removeMovie(username, data) {
    let res = await this.request(`movies/${username}`, data, 'delete');
    return res;
  };

  // TMDB API routes ***********************************

  /** Get configuration settings */

  static async getTmdbConfig() {
    let res = await this.tmdbRequest(`configuration`);
    console.log(res);
    return res;
  };

  /** Get movies by keyword */

  static async getMoviesByQuery(query) {
    let data = {
      query,
      language : "en-US",
      include_adult : "false"
    }
    let res = await this.tmdbRequest(`search/movie`, data);
    return res;
  };

  /** Get popular movies */ 

  static async getPopularMovies() {
    let res = await this.tmdbRequest(`movie/popular`);
    return res.results;
  };

  
  /** Get new movies */ 

  static async getTopRatedMovies() {
    let res = await this.tmdbRequest(`movie/top_rated`);
    return res.results;
  };

  
  /** Get upcoming releases movies */ 

  static async getUpcomingMovies() {
    let res = await this.tmdbRequest(`movie/upcoming`);
    return res.results;
  };

  /** Call all requests for popular, upcoming, and new releases
   * 
   *  We're then going to combine the data into an object and send that to the front end
   * 
   *  On the front end we're filtering this data when we display the movieList component
   */

  static async getMovieLists(listType) {
    let res;

    if (listType === "Popular" ) {
    res = await this.getPopularMovies();
    } else if (listType === "Top Rated") {
    res = await this.getTopRatedMovies();
    } else if (listType === "Upcoming") {
    res = await this.getUpcomingMovies();
    }

    return res;
  }

};

export default MovieCheckApi;