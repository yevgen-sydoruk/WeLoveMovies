const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const movie = await service.read(req.params.movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    next({
        status: 404,
        message: "Movie cannot be found.",
    });
}

async function list(req, res, next) {
    const isShowing = req.query.is_showing;
    if (isShowing) {
        res.json({ data: await service.listIsShowing() });
    } else {
        res.json({ data: await service.list() });
    }
}

async function listTheaters(req, res, next) {
    res.json({ data: await service.listTheaters() });
}

async function read(req, res, next) {
    res.json({ data: res.locals.movie });
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    listTheaters: [
        asyncErrorBoundary(movieExists),
        asyncErrorBoundary(listTheaters),
    ],
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
};
