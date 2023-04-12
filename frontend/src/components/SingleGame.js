import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import StarRating from './StarRating';

const SingleGame = () => {
    const { id } = useParams(); 
    const [game, setGame] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState(null);
    const [commentInput, setCommentInput] = useState('');
    const { user } = useAuth0();
    const [rating, setRating] = useState(0);

const fetchGame = async (gameId) => {
    try {
        setIsLoading(true);
        const apiKey = "a492a2c81a0c4806a54e3105ca347d33"; 
        const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }  
    const data = await response.json();
    setGame(data);
    console.log(data);
    } catch (error) {
    console.error("Error fetching game:", error);
    } finally {
    setIsLoading(false);
    }
};

const fetchComments = async (gameId) => {
    try {
        const response = await fetch(`/api/games/${gameId}/comments`);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
        setComments(data.data);
    } catch (error) {
    console.error("Error fetching comments:", error);
    }
};

useEffect(() => {
    if (id) {
        fetchGame(id);
        fetchComments(id);
    }
}, [id]);

if (isLoading) {
    return <p>Loading game...</p>;
}

if (!game) {
    return <p>No game data available</p>;
}

const handleRatingSubmit = async () => {
    try {
        const response = await fetch(`/api/games/rating`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email, game, rating }),
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    console.log(responseData);

    } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    }
};

const handleSubmitComment = async () => {
    if (commentInput.trim()) {
        try {
            const response = await fetch(`/api/games/${game.id}/comments`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email, comment: commentInput.trim() }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const responseData = await response.json();

        // Update the comments state with the new comment object from the response
        setComments([...comments, responseData.data]);
        setCommentInput("");
        } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        }
    }
};


return (
    <div>
    <GameInfo>
        <GameTitle>{game.name}</GameTitle>
        <GameImg src={game.background_image} alt={game.name} />
        <RatingSection>
        <h2>Your Rating:</h2>
        <StarRating onRatingSelected={setRating} rating={rating} setRating={setRating} />
        <SubmitRatingButton onClick={handleRatingSubmit}>
        Submit Rating
        </SubmitRatingButton>
        </RatingSection>
        <InformationDIV>
        <Stats>
            <StatText>Rating: {game.rating}/{game.rating_top}</StatText>
            <StatText>Released on: {game.released}</StatText>
            <StatText>Playtime: {game.playtime}hr</StatText>
            <StatText>Platforms:</StatText>
            <ul>
                {game.platforms.map((platform) => (
                <Console key={platform.platform.id}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{platform.platform.name}</Console>
            ))}
            </ul>
        </Stats>
            <div>
            <About>About</About>
            <Description>{game.description_raw}</Description>
            </div>
        </InformationDIV>
    </GameInfo>
    <CommentsSection>
    <h2>Comments:</h2>
    {comments ? (
    comments.map((comment) => (
    <Comment key={comment._id}>
    <strong>{comment.userName}: </strong>
    {comment.comment}
    </Comment>
))
) : (
<p>No comments available</p>
)}
    <CommentInput
        type="text"
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        placeholder="Type your comment here..."
    />
    <SubmitCommentButton onClick={handleSubmitComment}>
    Submit Comment
    </SubmitCommentButton>
</CommentsSection>
</div>
);
};

const GameTitle = styled.h1`
font-size: 3em;
display: flex;
justify-content: center;
margin-top: 30px;
margin-bottom: 30px;
`
const GameImg = styled.img`
width: 1000px;
height: auto;
margin-bottom: 30px;
`
const GameInfo = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const Description = styled.p`
max-width: 750px;
`
const InformationDIV = styled.div`
display: flex;
margin-bottom: 70px;
`
const Stats = styled.div`
display: flex;
flex-direction: column;
margin-right: 50px;
border: solid 2px white;
padding: 20px;
max-height:350px;
`
const About = styled.h2`
font-size: 2em;
font-weight: bold;
margin-bottom: 30px;
`
const StatText = styled.p`
margin-bottom: 10px;
`
const Console = styled.li`
margin-bottom: 10px;
`
const CommentsSection = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 30px;
`;

const Comment = styled.p`
background-color: black;
border-radius: 5px;
padding: 10px;
margin: 10px;
width: 80%;
`;

const CommentInput = styled.input`
width: 80%;
padding: 10px;
border-radius: 5px;
margin-top: 10px;
`;

const SubmitCommentButton = styled.button`
background-color: #4caf50;
border: none;
color: white;
text-align: center;
display: inline-block;
font-size: 16px;
margin-top: 10px;
padding: 10px 20px;
border-radius: 5px;
cursor: pointer;
&:hover {
    background-color: #45a049;
}
`;
const RatingSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 30px;
`;

const SubmitRatingButton = styled.button`
background-color: #4caf50;
border: none;
color: white;
text-align: center;
display: inline-block;
font-size: 16px;
margin-top: 10px;
padding: 10px 20px;
border-radius: 5px;
cursor: pointer;
&:hover {
    background-color: #45a049;
}
`;

export default SingleGame