import axios from "axios";
import React, { useState } from "react";
import formatDistance from "date-fns/formatDistance";

import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import EditTweet from "../EditTweet/EditTweet";

const Tweet = ({ tweet, setData }) => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const [userData, setUserData] = useState();

  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
  const location = useLocation().pathname;
  const { id } = useParams();

  console.log(location);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(`/users/find/${tweet.userId}`);

        setUserData(findUser.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [tweet.userId, tweet.likes]);

  const handleLike = async (e) => {
    e.preventDefault();

    try {
      const like = await axios.put(`/tweets/${tweet._id}/like`, {
        id: currentUser._id,
      });

      if (location.includes("profile")) {
        const newData = await axios.get(`/tweets/user/all/${id}`);
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(`/tweets/explore`);
        setData(newData.data);
      } else {
        const newData = await axios.get(`/tweets/timeline/${currentUser._id}`);
        setData(newData.data);
      }
    } catch (err) {
      console.log("error", err);
    }
  };
   
   




  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      console.log(`${tweet._id}`);
      await axios.delete(`/tweets/${tweet._id}`, {
        id: currentUser._id,
      });
      window.location.reload(false);
    }catch (err) {
      console.log("error", err);
    }
  };



  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      console.log(`${tweet._id}`);
      // await axios.delete(`/tweets/${tweet._id}`, {
      //   id: currentUser._id,
      // });
      
    }catch (err) {
      console.log("error", err);
    }
  };






  return (
    <>
    <div>
      {userData && (
        <>
          <div className="flex space-x-2">
            {/* <img src="" alt="" /> */}
            <Link to={`/profile/${userData._id}`}>
              <h3 className="font-bold">{userData.username}</h3>
            </Link>

            <span className="font-normal">@{userData.username}</span>
            <p> - {dateStr}</p>
          </div>

          <p>{tweet.description}</p>
          <button onClick={handleLike}>
            {tweet.likes.includes(currentUser._id) ? (
              <FavoriteIcon className="mr-2 my-2 cursor-pointer"></FavoriteIcon>
            ) : (
              <FavoriteBorderIcon className="mr-2 my-2 cursor-pointer"></FavoriteBorderIcon>
            )}
            {tweet.likes.length}
          </button>
          <button onClick={handleDelete}>
          <DeleteIcon className="mr-2 my-2 cursor-pointer"></DeleteIcon>
          </button>
          <button onClick={() => setOpen(true)}>
          <EditIcon className="mr-2 my-2 cursor-pointer"></EditIcon>
          </button>
        </>
      )}
    </div>
    {open && <EditTweet tweet={tweet} setOpen={setOpen} />}
    </>
  );
};

export default Tweet;
