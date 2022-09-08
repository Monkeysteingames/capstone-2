"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for movies. */

class Movie {
    /**Get the userID base on username provided **/

    static async getUserId(username) {
        const userRes = await db.query(
            `SELECT id  
            FROM users
            WHERE username = $1`,
            [username]
        );

        //get the id that we've gathered from the db for the username provided
        const userId = userRes.rows[0].id;

        return userId;
    }

    /** add movie to users liked movies
     * 
     *  Returns { userId,
            movieId,
            title,
            overview,
            userRating,
            poster_path }
     * 
     *  Throws BadRequestError on duplicates
     * **/

    static async like(username, { movieId, title, overview, posterPath }) {
        const userId = await this.getUserId(username);

        const duplicateCheck = await db.query(
            `SELECT id 
            FROM liked_movies 
            WHERE user_id = $1 
            AND movie_id = $2`,
            [userId, movieId]
        );

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate movie liked for: ${movieId} by user ${userId}`);
        };

        const result = await db.query(
            `INSERT INTO liked_movies
            (user_id,
            movie_id,
            title,
            overview,
            user_rating,
            poster_path)
            VALUES ($1, $2, $3, $4, 0, $5)
            RETURNING user_id AS "userId", 
            movie_id AS "movieId", 
            title, 
            overview, 
            user_rating AS "userRating", 
            poster_path AS "posterPath"`,
            [
                userId,
                movieId,
                title,
                overview,
                posterPath               
            ]
        );

        const movie = result.rows[0];

        return movie;
    };

    /** get all movies liked by user
     * 
     *  Returns [{ userId,
            movieId,
            title,
            overview,
            userRating,
            posterPath }, ...]
     * 
     * **/

    static async findAll(username) {
        const userId = await this.getUserId(username);

        const result = await db.query(
            `SELECT user_id AS "userId",
                    movie_id AS "movieId",
                    title,
                    overview,
                    user_rating AS "userRating",
                    poster_path AS "posterPath"
            FROM liked_movies
            WHERE user_id = $1
            ORDER BY title`,
            [userId]        
        );

        return result.rows;
    };

    /** Update user_rating with `data`.
     *
     * Data must include:
     *   { movieId, userRating }
     *
     * Returns { userId,
            movieId,
            title,
            overview,
            userRating,
            posterPath }
     *
     * Throws NotFoundError if not found.
     */

    static async rate(username, { movieId, userRating }) {
        const userId = await this.getUserId(username);

        const result = await db.query(
            `UPDATE liked_movies
            SET user_rating = $1
            WHERE user_id = $2
            AND movie_id = $3
            RETURNING user_id AS "userId",
                    movie_id AS "movieId",
                    title,
                    overview,
                    user_rating AS "userRating",
                    poster_path AS "posterPath"`,
            [userRating, userId, movieId]
        );

        const movie = result.rows[0];
    
        if (!movie) throw new NotFoundError(`No liked movie with ID: ${movieId}`);

        return movie;
    };

    /** Remove movie from user's liked_movies
     *
     * Data must include:
     *   { movieId }
     *
     * Returns { undefined }
     *
     */
    
    static async remove(username, { movieId }) {
        const userId = await this.getUserId(username);

        const result = await db.query(`
            DELETE FROM liked_movies
            WHERE movie_id = $1 
            AND user_id = $2`,
            [movieId, userId]
        );
        
        return movieId;
    };
};

module.exports = Movie;