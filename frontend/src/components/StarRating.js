import React, { useState } from 'react';
import styled from 'styled-components';


const StarRating = ({ onRatingSelected, rating, setRating }) => {
    const [localRating, setLocalRating] = useState(0)

const handleRating = (newRating) => {
    setLocalRating(newRating)
    onRatingSelected(newRating);
};

return (
    <StarsWrapper>
        {[1, 2, 3, 4, 5].map((star) => (
        <Star
        key={star}
        selected={star <= localRating}
        onClick={() => handleRating(star)}
        >
        ★
        </Star>
    ))}
    </StarsWrapper>
);
};

const StarsWrapper = styled.div`
display: flex;
`;

const Star = styled.span`
color: ${(props) => (props.selected ? '#FFD700' : '#C0C0C0')};
cursor: pointer;
font-size: 1.5rem;
transition: color 0.2s;

&:hover {
    color: #FFD700;
}
`;

export default StarRating;
