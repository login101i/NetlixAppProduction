import { useLocation } from "react-router-dom";
import "./watch.scss";
import BackspaceIcon from "@material-ui/icons/Backspace";

const Watch = () => {
  const location = useLocation();
  const movie = location.movie;
  console.log("to jest to");
  console.log(movie.trailer);

  return (
    <div className="watch">
      <div className="back">
        <BackspaceIcon />
        <span>Back</span>
      </div>
      <video className="video" autoPlay={true} progress controls src={movie.trailer}></video>
    </div>
  );
};

export default Watch;
