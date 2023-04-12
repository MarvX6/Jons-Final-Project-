import styled from "styled-components"
import AuthButton from "./Authentication"
import GameList from "./GameList"

const HomePage = () => {

    return (
        <HomeDiv>
            <div>
                <HomeTxtContainer>
                    <H1>Not sure what to play next?</H1>
                    <br></br>
                    <H2>Don't worry, we've got you covered.</H2>
                    <br></br>
                    <H3>Discover new games, keep track of the ones you</H3>
                    <H3>want to play, and connect with friends.</H3>
                </HomeTxtContainer>
                <BackgroundImg src="/homepage_arcade.png" alt="arcade box wallpaper" />
            </div>
        </HomeDiv>
    )
}

const BackgroundImg = styled.img`
position: fixed;
right: 0;
top: 50;
`
const HomeDiv = styled.div`
`
const H1 = styled.h1`
font-size: 4em;
margin-bottom: 50px;
color: #00FF41;
text-shadow: -4px -4px 0 #fffb05,  
             4px -4px 0 #fffb05,  
             -4px 4px 0 #fffb05,  
             4px 4px 0 #fffb05;
`
const H2 = styled.h2`
font-size: 2.75em;
margin-bottom: 50px;
color: #00FF00;
text-shadow: -4px -4px 0 #FFA500,  
             4px -4px 0 #FFA500,  
             -4px 4px 0 #FFA500,  
             4px 4px 0 #FFA500;
`
const H3 = styled.h3`
font-size: 2em;
color: #00FF41;
text-shadow: -4px -4px 0 #FF0000,  
             4px -4px 0 #FF0000,  
             -4px 4px 0 #FF0000,  
             4px 4px 0 #FF0000;

`
const HomeTxtContainer = styled.div`
width: 65%;
position: absolute;
z-index: 1;
margin-top: 220px;
margin-left: 30px;
`
export default HomePage