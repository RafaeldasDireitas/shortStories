import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import '../../src/App.css';

export default function CardFromBooks() {
  const API_ALL_POSTS = process.env.REACT_APP_ALL_POSTS;
  const [allBooks, setAllBooks] = useState([{}]);

  useEffect(() => {
    axios.get(API_ALL_POSTS).then((response) => {
      setAllBooks(response.data);
    });
  }, []);

  const cards = allBooks.map((cards, index) => {
    return (
      <div className="col-md-6 pt-5" key={index}>
        <Link
          to={`/story/${cards.title}?id=${cards.title}`}
          style={{ textDecoration: "none" }}
        >
          <div className="card p-3 container bg-primary text-light card-organizer">
            {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
            <div className="card-body pt-0">
              <h5 className="card-title">{cards.title}</h5>
              <p className="card-text text-right">{cards.synopsis}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <>
      <div className="row mw-100 m-1">{cards}</div>
    </>
  );
}
