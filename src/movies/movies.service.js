const knex = require("../db/connection");

function list() {
    return knex("movies").select("*").groupBy("movies.movie_id");
}

function listIsShowing() {
    return knex("movies")
        .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
        .select("movies.*")
        .where({ "movies_theaters.is_showing": true })
        .groupBy("movies.movie_id");
}

function read(movie_id) {
    return knex("movies").select("*").where({ movie_id }).first();
}

module.exports = {
    list,
    listIsShowing,
    read,
};
