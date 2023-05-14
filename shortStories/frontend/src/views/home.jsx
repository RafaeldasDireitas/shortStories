import { useEffect, useContext, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import axios from "axios";
import { UserContext } from "../context/userContext";
import Card from "../components/Card";
import LatestCards from "../components/LatestCards";
import CreatePost from "../components/CreatePost";

export default function Home() {
  const {
    isLoggedIn,
    setIsLoggedIn,
    loginUsernameData,
    setLoginUsernameData,
    userData,
    setUserData,
  } = useContext(UserContext);

  const API_POSTS = process.env.REACT_APP_POSTS

  useEffect(() => {
    if (loginUsernameData) {
      axios
        .get(`${API_POSTS}/${loginUsernameData}/`)
        .then((response) => {
          setUserData(response.data); //returns username if correct in login
        });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        {isLoggedIn && <Header>Welcome, {loginUsernameData}</Header>}
        {isLoggedIn && <Card></Card>}
        <LatestCards></LatestCards>
      </div>
    </>
  );
}
