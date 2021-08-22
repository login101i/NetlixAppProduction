import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";

import "./listItems.scss";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AddIcon from "@material-ui/icons/Add";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const trailer = "https://www.w3schools.com/html/mov_bbb.mp4";

const ListItems = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

    const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });


  useEffect(() => {
    const getMovie = async () => {
      try {
        const getId = await axiosInstance.get("movies/find/" + item, {
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTdiZjBkOGI0YmQ4NDdkODZjNzU4YyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyOTU0MzY0MSwiZXhwIjoxNjI5ODAyODQxfQ._cKVjtMiKZdk7BewnEGEEyT-U7uHVGp4gmvarAd7kLI",
          },
        });
        setMovie(getId.data);
        console.log(movie);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  return (
    <>
      <Link to={{pathname:"/watch", movie:movie}}>
        <div className="listItem" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ left: isHovered && index * 225 - 250 + index * 2.5 }}>
          <img src={movie.img} alt="" />
          {isHovered && (
            <>
              
              <div className="itemInfo">
                <div className="icons">
                  <PlayArrowIcon className="icon" />
                  <AddIcon className="icon" />
                  <ThumbDownIcon className="icon" />
                  <ThumbUpIcon className="icon" />
                </div>
                <div className="itemInfoTop">
                  <span>{movie.duration}</span>
                  <div className="limit">{item.limit}</div>
                  <span>{movie.year}</span>
                </div>
                <div className="desc">{movie.desc} .</div>
              </div>
              <div className="genre">{movie.genre}</div>
            </>
          )}
        </div>
      </Link>
    </>
  );
};

export default ListItems;
