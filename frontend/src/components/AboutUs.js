import React, { useState } from 'react';
import styled from 'styled-components';

const AboutUs = () => {

    return (
        <AboutDiv>
            <Title>About Us</Title>
            <p>
                We are a video game cataloguing company dedicated to 
                providing a comprehensive database of video games for 
                gamers and industry professionals alike. Our mission 
                is to connect gamers with their next favorite game, while 
                also providing valuable data to developers, publishers, 
                and researchers. With over 150,000 games in our catalog, 
                we strive to provide the most accurate and up-to-date 
                information on all aspects of the gaming world, from the 
                latest releases to timeless classics. Our passionate team 
                of gamers and industry veterans works tirelessly to improve 
                and expand our database, ensuring that you'll always find what 
                you're looking for.
            </p>
            <ContactUs>Contact Us</ContactUs>
            <Form>
                <Label>Email</Label>
                <input type="email"/>

                <Label>Subject</Label>
                <input type="text" />

                <Label>Message</Label>
                <textarea/>

                <Submit type="submit">Submit</Submit>
            </Form>
        </AboutDiv>
    )
}

const Form = styled.form`
display: flex;
flex-direction: column;
width: 500px;
`
const Title = styled.h1`
font-size: 35px;
margin-bottom: 50px;
margin-top: 400px;
`
const AboutDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 800px;
margin: 0 auto;
`
const ContactUs = styled.h3`
margin-top: 75px;
`
const Label = styled.label`
color: white;
font-size: 15px;
margin-bottom: 10px;
margin-top: 10px;
`
const Submit = styled.button`
margin-top: 15px;
`

export default AboutUs;