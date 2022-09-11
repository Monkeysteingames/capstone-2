import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * 
 */

class MovieCheckApi {
  // The token for interactions with the backend API will be stored here.
  static token;

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

  static async getMovies(username) {
    console.log(username)
    let res = await this.request(`movies/${username}`);
    return res.movies;
  };

    /** Get movie by id in user's liked_movies */

    static async getMovie(username, movieId) {
      let res = await this.request(`movies/${username}/${parseInt(movieId)}`);
      return res.movie;
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

};

export default MovieCheckApi;