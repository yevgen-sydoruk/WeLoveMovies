const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
    const reviewId = req.params.reviewId;
    const review = await service.read(reviewId);

    if (review) {
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message: "Review cannot be found" });
}

async function update(req, res, next) {
    const review = res.locals.review;
    const reviewId = review.reviewId;
    const updatedReview = {
        ...review,
        ...req.body.data,
    };
    const completed = await service.update(updatedReview);
    if (completed) {
        next();
    }
}

async function read(req, res, next) {
    const updatedReview = res.locals.review;
    const reviewId = updatedReview.review_id;
    const review = await service.readWithCritic(reviewId);
    res.json({ data: review[0] });
}

module.exports = {
    update: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(update),
        asyncErrorBoundary(read),
    ],
};
