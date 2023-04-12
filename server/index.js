"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const {
    getGames,
    getTags,
    storeUserData,
    addToList,
    getUserList,
    saveComment,
    getGameComments,
    saveGameRating,
    getUserGameRatings,
    removeFromFavorites,
    removeFromWishList,
} = require("./handlers.js");

const { checkAuth } = require("./middleware.js")

express()
    // Below are methods that are included in express(). We chain them for convenience.
    // --------------------------------------------------------------------------------

    // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
    .use(morgan("tiny"))
    .use(express.json())

    // Any requests for static files will go into the public folder
    .use(express.static("public"))
    

    // Nothing to modify above or below this line
    // ---------------------------------
    .get("/api/get-games", getGames)
    .get("/api/get-tags", getTags)
    .get("/api/getUserList", getUserList)//getUserList change
    .get("/api/games/:gameId/comments", getGameComments)
    .get("/api/getUserGameRatings", getUserGameRatings)

    .post("/api/storeUserData", storeUserData)
    .post('/api/add-to-list', addToList)//addToList
    .post("/api/games/:id/comments", saveComment )
    .post("/api/saveGameRating", saveGameRating)

    .patch("/api/games/rating", saveGameRating)
    
    .delete("/api/removeFromFavorites", removeFromFavorites)
    .delete("/api/removeFromWishList", removeFromWishList)
    // ---------------------------------
    // Nothing to modify above or below this line

    // this is our catch all endpoint.
    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
        });
    })

    // Node spins up our server and sets it to listen on port 8000.
    .listen(8000, () => console.log(`Listening on port 8000`));
