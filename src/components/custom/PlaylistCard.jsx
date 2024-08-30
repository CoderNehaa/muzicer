import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePlaylist } from "@/redux/reducers/musicReducer";

const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleDelete(){
    dispatch(deletePlaylist(playlist._id));
  }
  
  return (
    <div className="border-2 dark:border-zinc-700 shadow-md dark:shadow-zinc-700 m-4 flex 
    flex-col justify-center items-center h-[200px] w-[200px] relative">
      <span 
        className="font-semibold text-xl capitalize cursor-pointer" 
        onClick={() => navigate(`/playlist/${playlist._id}/details`)}>
        {playlist.playlistName}
      </span>
      <span>Songs : {playlist.songs.length}</span>
      <Button className="px-2 py-0 m-3" onClick={() => navigate("/")}>
        Add Song <i className="fa-solid fa-plus ml-2"></i>
      </Button>
      <button className="absolute bottom-2 right-3 text-red-700" onClick={handleDelete}>
        <i className="fa-solid fa-trash ml-2"></i>
      </button>
    </div>
  );
};

export default PlaylistCard;
