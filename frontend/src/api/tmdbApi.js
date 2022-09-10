import axios from "axios";

const TMDB_BASE_URL = 'https://api.themoviedb.org/3/';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * 
 */

class TmdbApi { 
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
    return res.results;
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

export default TmdbApi;