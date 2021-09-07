const knex = require("../db/connection");

function addCritic(reviews) {
    return reviews.map((review) => {
        return {
            review_id: review.review_id,
            content: review.content,
            score: review.score,
            created_at: review.created_at,
            updated_at: review.updated_at,
            critic_id: review.critic_id,
            movie_id: review.movie_id,
            critic: {
                critic_id: review.critic_id,
                preferred_name: review.preferred_name,
                surname: review.surname,
                organization_name: review.organization_name,
                created_at: review.created_at,
                updated_at: review.updated_at,
            },
        };
    });
}

function read(review_id) {
    return knex("reviews")
        .select("*")
        .where({ "reviews.review_id": review_id })
        .first();
}

function readWithCritic(review_id) {
    return knex("reviews")
        .join("critics", "reviews.critic_id", "critics.critic_id")
        .select(
            "reviews.*",
            "critics.created_at",
            "critics.updated_at",
            "critics.critic_id",
            "critics.preferred_name",
            "critics.surname",
            "critics.organization_name"
        )
        .where({ "reviews.review_id": review_id })
        .then(addCritic);
}

function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*");
}

function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
}

module.exports = {
    read,
    readWithCritic,
    update,
    destroy,
};
