import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginUsernameData, setLoginUsernameData] = useState("");
    const [userData, setUserData] = useState([{}]);
    const [latestCards, setLatestCards] = useState([{}]); //so the useParams can grab the latestCards in recentstories

    return (
        <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, loginUsernameData, setLoginUsernameData, userData, setUserData, latestCards, setLatestCards}}>
            {children}
        </UserContext.Provider>
    )
}

