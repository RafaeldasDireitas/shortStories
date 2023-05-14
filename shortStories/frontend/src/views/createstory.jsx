import { useContext, useEffect } from "react";
import CreatePost from "../components/CreatePost";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/userContext";

export default function CreateStory() {
    const { loginUsernameData } = useContext(UserContext);

    return (
        <>
        <div className="container">
            <Navbar></Navbar>
            <CreatePost></CreatePost>
        </div>
        
        </>
    )
}