import React from 'react';
import styled from 'styled-components'
import {SlSocialInstagram} from "react-icons/sl"
import {AiFillFacebook, AiOutlineTwitter, AiFillLinkedin} from "react-icons/ai"

const Footer = () => {
    return (
        <MainFooter>
        <Copy>&copy; 2023 GAME-ZONE. All rights reserved.</Copy>

        <SocialLinks>
            <IconLink href="https://www.facebook.com/">
            <AiFillFacebook size="2em" color='black' />
            </IconLink>
            <IconLink href="https://www.instagram.com/">
            <SlSocialInstagram size="1.75em" color='black' />
            </IconLink>
            <IconLink href="https://www.twitter.com/">
            <AiOutlineTwitter size="2em" color='black' />
            </IconLink>
            <IconLink href="https://www.linkedin.com/">
            <AiFillLinkedin size="2em" color='black' />
            </IconLink>
        </SocialLinks>
    </MainFooter>
    );
};

const MainFooter = styled.footer`
display: flex;
justify-content: space-between;
align-items: center;
background-color: white;
height: 50px;
margin-bottom: -200px;
`;

const Copy = styled.p`
color: black;
font-size: 1em;
margin-left: 15px;
`;

const SocialLinks = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
width: 150px;
margin-right: 15px;
`;

const IconLink = styled.a`
margin-left: 10px;
`;

export default Footer;