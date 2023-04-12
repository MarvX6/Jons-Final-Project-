import React, { useState } from 'react';
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./Header";
import GlobalStyles from "../GlobalStyles";
import AuthButton from "./Authentication";
import HomePage from "./HomePage";
import GameList from "./GameList";
import SingleGame from "./SingleGame";
import Footer from "./Footer";
import UserContext from './UserContext';
import MyGames from './MyGames';
import AboutUs from './AboutUs';

const App = () => {
    const { isLoading, error, user: auth0User } = useAuth0();
    const [user, setUser] = useState(auth0User);

return (
    <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter basename="/">
        <GlobalStyles />
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} /> 
                <Route path="/games" element={<GameList />} /> 
                <Route path="/game/:id" element={<SingleGame />} /> 
                <Route path="/my-games" element={<MyGames />} /> 
                <Route path="/profile" element={<Profile />} />
                <Route path="/about-us" element={<AboutUs />} />         
            </Routes>
          {/* <Footer />     */}
    </BrowserRouter>
    </UserContext.Provider>
);
}; 

export default App;