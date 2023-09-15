import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { changeProfile, logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";




const EditTweet = ({ tweet, setOpen }) => {
    

    const { currentUser } = useSelector((state) => state.user);
    const [editText, setEditText] = useState("");

    const handleEdit = async (e) => {
        e.preventDefault();
    
        try {
          console.log(`${tweet._id}`);
          const editedTweet = await axios.put(`/tweets/edit/${tweet._id}`, {
            id: currentUser._id,
            description: editText,
          });
          window.location.reload(false);
        }catch (err) {
          console.log("error", err);
        }
      };

return (
    <div className="absolute w-full h-full top-0 left-0 bg-transparent flex items-center justify-center">
      <div className="w-[600px] h-[600px] bg-slate-200 rounded-lg p-8 flex flex-col gap-4 relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 cursor-pointer"
        >
          X
        </button>
        <h2 className="font-bold text-xl">Edit Tweet</h2>
        <textarea
          type="text"
          placeholder="Enter the updates"
          onChange={(e) => setEditText(e.target.value)}
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <button
        onClick={handleEdit}
          className="bg-blue-500 text-white py-2 rounded-full"
        >
          Update
        </button>
      </div>
    </div>
  );
};


export default EditTweet;
