import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TagFilter from './TagFilter';
import UserContext from './UserContext';
import StarRating from './StarRating';

const GameList = () => {
    const { user, setUser } = useContext(UserContext);
    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [pagesToShow, setPagesToShow] = useState(10);
    const [selectedTag, setSelectedTag] = useState(null);
    const navigate = useNavigate()
    const [userGameRatings, setUserGameRatings] = useState({});
    const [rating, setRating] = useState(0)


const fetchGames = async (page, tag) => {
    try {
        setIsLoading(true);
            const url = tag ? `/api/get-games?page=${page}&tag=${tag}` : `/api/get-games?page=${page}`;
            const response = await fetch(url);
            const data = await response.json();
            setGames(data.data.results);
    } catch (error) {
        console.error("Error fetching games:", error);
    } finally {
        setIsLoading(false);
    }
};

useEffect(() => {
    const fetchUserGameRatings = async () => {
        if (!user) {
            return;
        }
        try {
            const response = await fetch(`/api/getUserGameRatings?email=${user.email}`);
            const data = await response.json();
            const ratingsMap = data.data.reduce((acc, cur) => {
            acc[cur.gameId] = cur.rating;
            return acc;
        }, {});
        setUserGameRatings(ratingsMap);
        } catch (error) {
            console.error("Error fetching user game ratings:", error);
        }
    };
    fetchUserGameRatings();
    console.log(rating,"Rating")
}, [user, rating]);

const getNormalizedRatingName = (ratingName) => {
    if (ratingName === 'Everyone 10+') {
        return 'Everyone';
    }
    return ratingName;
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
};

const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
};

const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
};

const handleTagSelect = (tagId) => {
    setSelectedTag(tagId);
    setCurrentPage(1);
};

const generatePageNumbers = (currentPage, pagesToShow) => {
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = startPage + pagesToShow - 1;
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }
    return pageNumbers;
};

useEffect(() => {
    fetchGames(currentPage, selectedTag);
}, [currentPage, selectedTag]);

const handleSingleGame = (event, gameId) => {
    event.preventDefault();
    navigate(`/game/${gameId}`);
};

const handleAddToList = async (game, listType) => {
    if (!user) {
        alert(`Please sign in to add games to ${listType === 'favorite' ? 'favorites' : 'wish-list'}`);
    return;
    }

const email = user.email;
const response = await fetch('/api/add-to-list', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, game, listType }),
    });

    if (response.ok) {
        const data = await response.json();
        if (data.added) {
        alert(`Game added to ${listType === 'favorite' ? 'favorites' : 'wish-list'}!`);
    } else {
    }
    } else {
      //do nothing
    }
};

const handleRatingChange = async (game, rating) => {
    if (!user) {
        alert("Please sign in to rate games");
        return;
    }

    const email = user.email;
    const response = await fetch("/api/saveGameRating", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, game, rating }),
    });
    if (response.ok) {
        setRating(rating)
        console.log("Rating Saved")
    } else {
        alert("Failed to save game rating");
    }
};

const handleRatingSelected = (rating, game) => {
    handleRatingChange(game, rating);
};

return (
    <MainDiv>
        <PageTitle>Game List</PageTitle>
        <StyledTagFilter onTagSelect={handleTagSelect} />
        <GameDiv>
        {isLoading ? (
        <p>Loading games...</p>
        ) : (
        games.map((game) => {
            const ratingName = getNormalizedRatingName(game.esrb_rating?.name);
            const userRating = userGameRatings[game.id] || "Not rated";

            return (
                <div key={game.id}>
                <GameInfo>
                    <TitleDiv onClick={(event) => handleSingleGame(event, game.id)}>
                    <GameName>{game.name}</GameName>
                    <GameImg src={game.background_image} alt={game.name} />
                    </TitleDiv>
                    <RatingDiv>
                    <p>
                    Rating: {game.rating}/{game.rating_top}
                    </p>
                    <Age className={`rating-${game.esrb_rating?.name}`}>
                    {ratingName}
                    </Age>
                </RatingDiv>
                    <YourRating>Your Rating: {userRating}</YourRating>
                <Playtime>Playtime {game.playtime}hr</Playtime>
                <StarDiv>
<StarRating
    onRatingSelected={(rating) => handleRatingSelected(rating, game)} 
    rating={rating} 
    setRating={setRating}
/>
</StarDiv>
<ListDiv>
<select
onChange={(event) => handleAddToList(game, event.target.value)}
defaultValue=""
>
<option value="" disabled>
    Add to list :
    </option>
<option value="favorite">Add to Favorites</option>
<option value="wish-list">Add to Wish-list</option>
</select>
</ListDiv>
                </GameInfo>
            </div>
            );
        })
        )}
        </GameDiv>
        <Pagination>
        <button onClick={handlePreviousPage} disabled={isLoading || currentPage === 1}>
        Previous Page
        </button>
        {generatePageNumbers(currentPage, pagesToShow).map((pageNumber) => (
        <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            disabled={isLoading || pageNumber === currentPage}
        >
            {pageNumber}
        </button>
        ))}
        <button onClick={handleNextPage} disabled={isLoading}>
        Next Page
        </button>
    </Pagination>
    </MainDiv>
);
};

const MainDiv = styled.div``;

const Pagination = styled.div`
display: flex;
justify-content: center;
margin-top: 20px;
`;

const PageTitle = styled.h1`
font-size: 3em;
margin-top: 20px;
margin-left: 20px;
`;

const GameDiv = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
`;

const GameInfo = styled.div`
width: 410px;
height: 450px;
margin-bottom: 50px;
border: solid white 3px;
border-radius: 10px;
margin: 20px;
`;

const TitleDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
`;

const GameImg = styled.img`
width: 300px;
height: auto;
margin-top: 20px;
border-radius: 20px;
border: solid white 2px;
margin-bottom: 20px;
`;

const GameName = styled.p`
margin-top: 20px;
`;

const Age = styled.p`
margin-left: 25px;
&.rating-Mature {
    color: red;
}

&.rating-Teen {
    color: orange;
}

&.rating-Everyone {
    color: green;
}
`;

const RatingDiv = styled.div`
display: flex;
justify-content: center;
`;
const StyledTagFilter = styled(TagFilter)`
color: red;
`;

const Button = styled.button`
background-color: #2c3e50;
border: none;
color: white;
cursor: pointer;
font-size: 1rem;
margin-top: 10px;
padding: 6px 12px;
text-transform: uppercase;
transition: background-color 0.2s;

&:hover {
    background-color: #1a252f;
}
`;
const YourRating = styled.p`
margin-left: 25px;
margin-top: 10px;
margin-bottom: 10px;
`
const Playtime = styled.p`
margin-left: 25px;
`
const StarDiv = styled.div`
margin-left: 20px;
margin-bottom: 10px;
`
const ListDiv = styled.div`
margin-left: 20px;

`

export default GameList;