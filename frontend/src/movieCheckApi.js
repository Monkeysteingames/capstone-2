
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
    return res.user;
  };

  // TMDB API routes ***********************************

  /** Get configuration settings */

  static async getTmdbConfig() {
    let res = await this.tmdbRequest(`configuration`);
    console.log(res);
    return res;
  }

  /** Get movies by keyword */

  static async getMoviesByQuery(query) {
    let res = await this.tmdbRequest(`search/multi`, query);
    return res;
  }

  /** Get movie details */

  // Add code for get movies endpoint

  /** Get genres */

  static async getGenreData() {
    let res = await this.tmdbRequest(`genre/movie/list`);
    return res;
  }

  /** Get popular movies */ 

  static async getPopularMovies() {
    let res = await this.tmdbRequest(`movie/popular`);
    //we only want to return the movies
    //TODO: add pagination
    return res.results;
  }

  // TMBD to back-end API routes *************************

  /** Update users liked movies */

}

export default MovieCheckApi;