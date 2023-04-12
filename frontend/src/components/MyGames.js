import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MyGames = () => {
    const [favorites, setFavorites] = useState([]);
    const [wishList, setWishList] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate()

useEffect(() => {
    if (user) {
    const fetchUserList = async (listType) => {
        try {
            const response = await fetch(`/api/getUserList?email=${user.email}&listType=${listType}`
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
            if (listType === "favorite") {
            setFavorites(data.data);
        } else {
            setWishList(data.data);
        }
        } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        }
    };
    fetchUserList("favorite");
    fetchUserList("wishList");
    }
}, [user]);

const handleRemoveFromFavorites = async (game) => {
    try {
        const response = await fetch("/api/removeFromFavorites", {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email: user.email,
        game,
        }),
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data = await response.json();
    setFavorites(data.data);
    } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    }
};

const handleRemoveFromWishList = async (game) => {
    try {
        const response = await fetch("/api/removeFromWishList", {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email: user.email,
        game,
        }),
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data = await response.json();
    setWishList(data.data);
    } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    }
};

const handleSingleGame = (event, gameId) => {
    event.preventDefault();
    navigate(`/game/${gameId}`);
};

const GameList = (gameList, listType) => (
    <>
    {gameList.map((game) => (
        <FavDiv key={game.id}>
            <h2>{game.name}</h2>
            <FavImg src={game.background_image} alt={game.name} onClick={(event) => handleSingleGame(event, game.id)} />
            {listType === "favorite" && (
            <Remove onClick={() => handleRemoveFromFavorites(game)}>
            Remove from favorites
            </Remove>
        )}
        {listType === "wishList" && (
            <Remove onClick={() => handleRemoveFromWishList(game)}>
            Remove from wish list
            </Remove>
        )}
        </FavDiv>
    ))}
    </>
);

return (
    <div>
        <PageTitle>My Games</PageTitle>
        <ListContainer>
        <ListColumn>
        <ListTitle>Favorites</ListTitle>
        {GameList(favorites, "favorite")}
        </ListColumn>
        <ListColumn>
        <ListTitle>Wish List</ListTitle>
        {GameList(wishList, "wishList")}
        </ListColumn>
    </ListContainer>
    </div>
);
};

const FavImg = styled.img`
height: auto;
width: 300px;
`;

const FavDiv = styled.div`
display: flex;
flex-direction: column;
`;

const Remove = styled.button`
width: 300px;
margin-bottom: 20px;
margin-top: 15px;
`;

const ListContainer = styled.div`
display: flex;
margin: 20px;
`;

const ListColumn = styled.div`
flex: 1;
margin: 20px;
`;

const ListTitle = styled.h2`
margin-bottom: 20px;
font-size: 25px;
color: red;
text-decoration: underline;
`;
const PageTitle = styled.h1`
font-size: 35px;
margin: 20px;
`
export default MyGames;
