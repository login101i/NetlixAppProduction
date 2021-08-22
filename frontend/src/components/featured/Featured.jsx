import { useState, useEffect } from "react";
import axios from "axios";
import "./featured.scss";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import InfoIcon from "@material-ui/icons/Info";

const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState({});

    const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axiosInstance.get(`movies/random`, {
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTdiZjBkOGI0YmQ4NDdkODZjNzU4YyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyOTU0MzY0MSwiZXhwIjoxNjI5ODAyODQxfQ._cKVjtMiKZdk7BewnEGEEyT-U7uHVGp4gmvarAd7kLI",
          },
        });
        setContent(res.data[0]);
        console.log(content);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre" onChange={(e) => setGenre(e.target.value)}>
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
            <option value="romance">romance</option>
          </select>
        </div>
      )}
      <img className="imgHome" src={"https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"} alt="" />
      <div className="info">
        <img src={content.img} alt="" />
        <span className="des">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, ipsam quo, necessitatibus quos ipsum magni velit iure voluptates officia nisi voluptatum totam sapiente aspernatur, quam adipisci et placeat officiis. Pariatur nulla atque eum!</span>
        <div className="buttons">
          <button className="playIcon">
            <PlayCircleOutlineIcon />
            <span>Play</span>
          </button>

          <button className="infoIcon">
            <InfoIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
