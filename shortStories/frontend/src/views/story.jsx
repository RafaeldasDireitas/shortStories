import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import parse from 'html-react-parser';

const StoryPage = () => {
  const { userData } = useContext(UserContext);

  const { title } = useParams();
  const cardData = userData && userData.find((card) => card.title === title); // coming from Card component

  if (!cardData) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <h1>{cardData.title}</h1>
        <h1>{cardData.synopsis}</h1>
        {parse(cardData.text)}
        
      </>
    );
  }
};

export default function Story() {
  return (
    <div>
      <StoryPage />
    </div>
  );
}
