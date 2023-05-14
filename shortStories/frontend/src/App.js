import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/home";
import BooksPage from "./views/bookspage";
import LoginPage from "./views/loginpage";
import { UserProvider } from "./context/userContext";
import Story from "./views/story";
import RecentStory from "./views/recentstories";
import CreateStory from "./views/createstory";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books"   element={<BooksPage />}></Route>
          <Route path="/story/:title" element={<Story />}></Route>
          <Route path="/recentstories/:title" element={<RecentStory />}></Route>
          <Route path="/createstory" element={<CreateStory />}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
