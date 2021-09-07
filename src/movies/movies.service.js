const knex = require("../db/connection");

function addCritic(movies) {
    return movies.map((movie) => {
        return {
            review_id: movie.review_id,
            content: movie.content,
            score: movie.score,
            created_at: movie.created_at,
            updated_at: movie.updated_at,
            critic_id: movie.critic_id,
            movie_id: movie.movie_id,
            critic: {
                critic_id: movie.critic_id,
                preferred_name: movie.preferred_name,
                surname: movie.surname,
                organization_name: movie.organization_name,
                created_at: movie.created_at,
                updated_at: movie.updated_at,
            },
        };
    });
}

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

function listTheaters() {
    return knex("movies_theaters")
        .join("movies", "movies.movie_id", "movies_theaters.movie_id")
        .join("theaters", "movies_theaters.theater_id", "theaters.theater_id")
        .select("theaters.*", "movies_theaters.is_showing", "movies.movie_id")
        .groupBy("theaters.theater_id");
}

function listReviews(movieId) {
    console.log(movieId);
    return knex("movies")
        .join("reviews", "movies.movie_id", "reviews.movie_id")
        .join("critics", "reviews.critic_id", "critics.critic_id")
        .select("movies.*", "reviews.*", "critics.*")
        .where({ "reviews.movie_id": movieId })
        .then(addCritic);
}

function read(movie_id) {
    return knex("movies").select("*").where({ movie_id }).first();
}

module.exports = {
    list,
    listIsShowing,
    listTheaters,
    listReviews,
    read,
};
