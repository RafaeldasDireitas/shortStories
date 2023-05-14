import axios from "axios";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function LatestCards() {
  const { latestCards, setLatestCards } = useContext(UserContext);
  const API_LATEST_POSTS = process.env.REACT_APP_LATEST_POSTS;

  useEffect(() => {
    axios.get(API_LATEST_POSTS)
    .then((response) => {
      setLatestCards(response.data);
    });
  }, []);

  const latestCard = latestCards.map((card, index) => {
    return (
      <div className="col mb-4" key={index}>
        <Link to={`/recentstories/${card.title}?id=${card.title}`} style={{ textDecoration: 'none' }}>
        <div className="p-4 bg-primary text-light">
          <span className="badge rounded-pill mb-2">Story</span>
          <h4>{card.title}</h4>
          <p>{card.synopsis}</p>
          <div className="d-flex">
            <img
              className="rounded-circle flex-shrink-0 me-3 fit-cover"
              width="50"
              height="50"
              src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png"
            />
            <div>
              <p className="fw-bold mb-0">{card.author && card.author.username}</p>
            </div>
          </div>
        </div>
        </Link>
      </div>
    );
  });

  return (
    <>
      <section className="py-4 py-xl-5">
        <div className="container">
          <div className="text-center p-4 p-lg-5">
            <p className="fw-bold text-primary mb-2">Here to show</p>
            <h1 className="fw-bold mb-4">
              One of my projects using
              <br />
              React and Django Rest Framework
            </h1>
          </div>
        </div>
      </section>

      <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
        {latestCard}
      </div>
    </>
  );
}
