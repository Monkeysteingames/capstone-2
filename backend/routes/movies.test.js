"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const Movie = require("../models/movies");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /movies */


/************************************** GET /movies */


/************************************** PATCH /movies */


/************************************** DELETE /movies */
