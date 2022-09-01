"use strict";

/** Routes for movies. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Movie = require("../models/movies");
//const likeMovie = require("../schemas/likeMovie.json");

const router = express.Router();

/** POST /[username] { movie }  => { movie }
 * 
 * Adds a movie to the users liked movies
 * 
 * Data must include: 
 *      { userId, movieId, backdropPath, title, overview }
 *
 * Authorization required: admin or correct user
 **/

 router.post("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const movie = await Movie.like(req.params.username, req.body);
      return res.status(201).json({ movie });
    } catch (err) {
      return next(err);
    }
  });

/** GET /[username] 
 * 
 * Gets all movies liked by user
 *
 * Authorization required: admin or correct user
 **/

router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const movies = await Movie.findAll(req.params.username);
      return res.json({ movies });
    } catch (err) {
      return next(err);
    }
  });

/** PATCH /[username] 
 * 
 * Update the user_rating for the specified movie being sent from the frontend 
 *
 * Authorization required: admin or correct user
 **/

 router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const movie = await Movie.rate(req.params.username, req.body);
      return res.json({ movie });
    } catch (err) {
      return next(err);
    }
  });

/** DELETE /[username] 
 * 
 * Delete the specified movie from the users liked_movies 
 *
 * Authorization required: admin or correct user
 **/

router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const movie = await Movie.remove(req.params.username, req.body);
      return res.status(201).json({ movie });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
