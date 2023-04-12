const { MongoClient } = require("mongodb");
const request = require('request-promise');

require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const storeUserData = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("gzdata");
    const { user } = req.body;

    try {
        await client.connect();
        const existingUser = await db.collection("users").findOne({ email: user.email });

    if (!existingUser) {
        await db.collection("users").insertOne(user);
        res.status(200).json({
        status: 200,
        data: user,
        message: "User data has been stored.",
        });
    } else {
        res.status(200).json({
        status: 200,
        data: existingUser,
        message: "User already exists.",
        });
    }
    } catch (error) {
        console.log("Error in storeUserData:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    } finally {
        client.close();
    }
};

const addToList = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("gzdata");
    const { email, game, listType } = req.body;

    try {
        await client.connect();
        const existingUser = await db.collection("users").findOne({ email: email });

    if (!existingUser) {
        res.status(404).json({
        status: 404,
        message: "User not found.",
        });
    } else {
        let listFieldName = listType === 'favorite' ? 'favorites' : 'wishList';

        if (!existingUser[listFieldName]) {
            existingUser[listFieldName] = [];
        }

        const isDuplicate = existingUser[listFieldName].some((item) => item.id.toString() === game.id.toString());

        if (isDuplicate) {
            res.status(200).json({
            status: 200,
            message: `Game is already in the ${listType === 'favorite' ? 'favorites' : 'wish-list'}.`,
            added: false,
        });
        } else {
            const updatedList = [...existingUser[listFieldName], game];

        await db.collection("users").updateOne(
            { email: email },
            { $set: { [listFieldName]: updatedList } }
        );

            res.status(200).json({
            status: 200,
            data: updatedList,
            message: `${listType === 'favorite' ? 'Favorite' : 'Wish-list'} game added.`,
        });
        }
    }
    } catch (error) {
        console.log("Error in addToList:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    } finally {
        client.close();
    }
};

const getGames = async (req, res) => {
    try {
        const apiKey = "a492a2c81a0c4806a54e3105ca347d33";
        const page = req.query.page || 1;
        const tag = req.query.tag || '';

        let requestUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=40&page=${page}`;
    if (tag) {
        requestUrl += `&tags=${encodeURIComponent(tag)}`;
    }

        const response = await request(requestUrl);
        const games = JSON.parse(response);
    return res
        .status(200)
        .json({ status: 200, data: games, message: "List of Games retrieved" });
    } catch (err) {
        console.log("Error: ", err);
    }
};

const getTags = async (req, res) => {
    try {
        const apiKey = "a492a2c81a0c4806a54e3105ca347d33";
        const response = await request(
        `https://api.rawg.io/api/tags?key=${apiKey}&page_size=200`
    );
        const tags = JSON.parse(response);
        console.log(tags)
    return res
        .status(200)
        .json({ status: 200, data: tags, message: "List of Tags retrieved" });
    } catch (err) {
        console.log("Error: ", err);
    }
};

const getUserList = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("gzdata");
    const { email, listType } = req.query;

    try {
        await client.connect();
        const user = await db.collection("users").findOne({ email: email });

    if (!user) {
        res.status(404).json({
        status: 404,
        message: "User not found.",
        });
    } else {
        let listFieldName = listType === 'favorite' ? 'favorites' : 'wishList';
        
        const listData = user[listFieldName] || [];

        res.status(200).json({
        status: 200,
        data: listData,
        message: `User ${listType === 'favorite' ? 'favorites' : 'wish-list'} retrieved.`,
        });
    }
    } catch (error) {
        console.log("Error in getUserList:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    } finally {
        client.close();
    }
};

const saveComment = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("gzdata");
    const { email, comment } = req.body;

    try {
        await client.connect();
        const existingUser = await db.collection("users").findOne({ email: email });

    if (!existingUser) {
        res.status(404).json({
        status: 404,
        message: "User not found.",
        });
    } else {
        const gameComment = {
        gameId: req.params.id,
        comment: comment,
        userName: existingUser.name,
        };

        await db.collection("comments").insertOne(gameComment);

        res.status(200).json({
        status: 200,
        message: "Comment saved.",
        data: gameComment,
        });
    }
    } catch (error) {
        console.log("Error in saveComment:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    } finally {
        client.close();
    }
};

const getGameComments = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("gzdata");
    const { gameId } = req.params;

    try {
        await client.connect();
        const comments = await db.collection("comments").find({ gameId: gameId }).toArray();

    res.status(200).json({
        status: 200,
        data: comments,
        message: "Game comments retrieved.",
    });
    } catch (error) {
        console.log("Error in getGameComments:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    } finally {
        client.close();
    }
};

const saveGameRating = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("gzdata");
    const { email, game, rating } = req.body;

    try {
        await client.connect();
        const existingUser = await db.collection("users").findOne({ email: email });

    if (!existingUser) {
        res.status(404).json({
        status: 404,
        message: "User not found.",
        });
    } else {
        await db.collection("game_ratings").updateOne(
        { email: email, gameId: game.id },
        {
            $set: {
            email: email,
            gameId: game.id,
            rating: rating,
            },
        },
        { upsert: true }
        );

        res.status(200).json({
        status: 200,
        message: "Game rating saved.",
        });
    }
    } catch (error) {
        console.log("Error in saveGameRating:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    } finally {
    client.close();
    }
};

const getUserGameRatings = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("gzdata");
    const { email } = req.query;

    try {
        await client.connect();
        const gameRatings = await db.collection("game_ratings").find({ email: email }).toArray();

        res.status(200).json({
        status: 200,
        data: gameRatings,
        message: "User game ratings retrieved.",
    });
    } catch (error) {
        console.log("Error in getUserGameRatings:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    } finally {
    client.close();
    }
};

const removeFromFavorites = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("gzdata");
    const { email, game } = req.body;

    try {
        await client.connect();
        const existingUser = await db.collection("users").findOne({ email: email });

    if (!existingUser) {
        res.status(404).json({
        status: 404,
        message: "User not found.",
        });
    } else {
        const updatedFavorites = existingUser.favorites.filter((favorite) => favorite.id.toString() !== game.id.toString());

        await db.collection("users").updateOne(
            { email: email },
            { $set: { favorites: updatedFavorites } }
        );

        res.status(200).json({
        status: 200,
        data: updatedFavorites,
        message: "Favorite game removed.",
        });
    }
    } catch (error) {
        console.log("Error in removeFromFavorites:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    } finally {
        client.close();
    }
};

const removeFromWishList = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("gzdata");
    const { email, game } = req.body;

    try {
        await client.connect();
        const existingUser = await db.collection("users").findOne({ email: email });

    if (!existingUser) {
        res.status(404).json({
        status: 404,
        message: "User not found.",
        });
    } else {
        const updatedWishList = existingUser.wishList.filter((wishList) => wishList.id.toString() !== game.id.toString());

        await db.collection("users").updateOne(
            { email: email },
            { $set: { wishList: updatedWishList } } 
        );

        res.status(200).json({
        status: 200,
        data: updatedWishList,
        message: "Game removed from wish list.",
        });
    }
    } catch (error) {
        console.log("Error in removeFromWishList:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    } finally {
        client.close();
    }
};

module.exports = {
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
}

