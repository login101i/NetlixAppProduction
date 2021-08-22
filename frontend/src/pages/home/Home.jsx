import { useState, useEffect } from "react";
import axios from "axios";

import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import axios from 'axios'

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axiosInstance.get(`list${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTdiZjBkOGI0YmQ4NDdkODZjNzU4YyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyOTU0MzY0MSwiZXhwIjoxNjI5ODAyODQxfQ._cKVjtMiKZdk7BewnEGEEyT-U7uHVGp4gmvarAd7kLI",
          },
        });

        setLists(res.data);
    
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  console.log(lists);

  return (
    <div className="home">
      <Navbar />

      <Featured type={type} setGenre={setGenre}/>

      {lists.map((list, index) => (
        <>
          <List list={list} key={index}/>
         
        </>
      ))}
    </div>
  );
};

export default Home;
