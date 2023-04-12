import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TagFilter = ({ onTagSelect }) => {
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);

useEffect(() => {
    fetchTags();
}, []);

const fetchTags = async () => {
    try {
        const response = await fetch('/api/get-tags');
        const data = await response.json();
        setTags(data.data.results);
    } catch (error) {
        console.error('Error fetching tags:', error);
    }
};

const handleTagSelect = (tagId) => {
    setSelectedTag(tagId);
    onTagSelect(tagId);
};

const getSelectedTagName = () => {
    if (!selectedTag) return 'All';
    const selected = tags.find((tag) => tag.id === selectedTag);
    return selected ? selected.name : '';
};

return (
    <FilterDiv>
        <DropdownContainer>
        <FilterTitle>
        Filter: {getSelectedTagName()}
        </FilterTitle>
        <TagList>
            <TagItem
            active={!selectedTag}
            onClick={() => handleTagSelect(null)}
        >
            All
        </TagItem>
        {tags.map((tag) => (
            <TagItem
            key={tag.id}
            active={selectedTag === tag.id}
            onClick={() => handleTagSelect(tag.id)}
            >
            {tag.name}
            </TagItem>
        ))}
        </TagList>
    </DropdownContainer>
    </FilterDiv>
);
};

const FilterDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 20px;
`;

const DropdownContainer = styled.div`
position: relative;
&:hover > ul {
    display: flex;
}
`;

const FilterTitle = styled.h3`
margin-right: 10px;
`;

const TagList = styled.ul`
display: none;
flex-direction: column;
position: absolute;
top: 100%;
left: 0;
background-color: white;
padding: 0;
list-style: none;
z-index: 1000;
max-height: 200px; 
overflow-y: scroll; 
`;

const TagItem = styled.li`
margin-right: 10px;
padding: 5px 10px;
background-color: ${(props) => (props.active ? 'blue' : 'transparent')};
color: ${(props) => (props.active ? 'red' : 'inherit')};
cursor: pointer;

&:hover {
    background-color: ${(props) => (props.active ? 'blue' : 'blue')};
}
`;

export default TagFilter;