import { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function Card() {
  const { userData } = useContext(UserContext);

  const cards = userData.map((card, index) => {
    return (
      <div className="col-md-6 pt-5" key={index}>
        <Link to={`/story/${card.title}?id=${card.title}`} style={{ textDecoration: 'none' }}>
          <div className="card p-3 container bg-primary text-light">
            {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">
                {card.synopsis}
              </p>
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
