const knex = require("../db/connection");

function list() {
    console.log(1);
    return knex("movies").select("*").groupBy("movies.movie_id");
}

function listIsShowing() {
    return knex("movies")
        .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
        .select("movies.*")
        .where({ "movies_theaters.is_showing": true })
        .groupBy("movies.movie_id");
}

module.exports = {
    list,
    listIsShowing,
};
