import { Link } from 'react-router-dom';
import styled, {keyframes} from 'styled-components';
import AuthButton from './Authentication';

const Header = () => {
    return (
        <MainDiv>
            <nav>
                <UL>
                <Ximg src="/pixel_x.png" alt="x pixel icon" />
                    <Title><NavLink to="/">GAME ZONE</NavLink></Title>
                    <LI><NavLink to="/">Home</NavLink></LI>
                    <LI><NavLink to="/games">Games</NavLink></LI>
                    <LI><NavLink to="/my-games">My Games</NavLink></LI>
                    <LI><NavLink to="/profile">Profile</NavLink></LI>
                    <LI><NavLink to="/about-us">About Us</NavLink></LI>
                <AuthButton />
                </UL>
            </nav>
        </MainDiv>
    );
};

const UL = styled.ul`
list-style: none;
display: flex;
font-size: 20px;
justify-content: right;
`
const LI = styled.li`
margin-left: 50px;
margin-right: 20px;
`
const MainDiv = styled.div`
background-color: white;
height: 50px;
`
const NavLink = styled(Link)`
text-decoration: none;
display: block;
line-height: 50px;
color: black;
`
const Ximg = styled.img`
height: 30px;
width: auto;
margin-right: auto;
margin-left: 20px;
margin-top: 10px;
`
const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 200px; 
  }
`;

const Title = styled.h1`
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  left: -1175px;
  width: 200px; 
  animation: ${typing} 3s steps(40) forwards;
`;

export default Header;