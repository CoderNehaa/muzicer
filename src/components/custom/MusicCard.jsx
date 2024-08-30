import React, { useState } from "react";
import { addToFavorite, removeFavorite } from "@/redux/reducers/userReducer";
import { BsHeart, BsHeartFill, BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addSongToPlaylist, removeSongFromPlaylist } from "@/redux/reducers/musicReducer";

const MusicCard = ({ song }) => {
  const [showPlaylists, setShowPlaylists] = useState(false);
  const user = useSelector((state) => state.userReducer.user);
  const { playlists } = useSelector((state) => state.musicReducer);

  const dispatch = useDispatch();

  const isFavorite = (songId) => {
    if (user && user.favorites && user.favorites.length > 0) {
      const isPresent = user.favorites.some((obj) => obj._id === songId);
      return isPresent;
    } else {
      return false;
    }
  };

  function handleFavoriteClick() {
    const isFav = isFavorite(song._id);
    if (isFav) {
      dispatch(removeFavorite(song._id));
    } else {
      dispatch(addToFavorite(song));
    }
  }

  function handlePlaylistClick(playlist) {
    const isPresent = inPlaylist(playlist);
    if(isPresent){
      dispatch(removeSongFromPlaylist({songId : song._id, playlistId:playlist._id}))
    } else {  
      dispatch(addSongToPlaylist({song, playlistId:playlist._id}));
    }
    setShowPlaylists(false);
  }

  const inPlaylist = (playlist) => {
    if(playlist && playlist.songs && playlist.songs.length){
      const isPresent = playlist.songs.find((obj) => obj._id === song._id);
      return isPresent
    } else {
      return false;
    }
  }

  return (
    <div
      className="relative shadow-sm border dark:border-zinc-700 dark:shadow-md dark:shadow-zinc-700 m-4
     p-4 flex flex-col justify-between"
    >
      <div className="flex flex-col items-center">
        <iframe
          src={song.audio}
          width="100%"
          height="252"
          title={song.title}
        ></iframe>
      </div>
      <div className="flex items-center p-2">
        <span className="mr-3 text-lg" onClick={handleFavoriteClick}>
          {isFavorite(song._id) ? <BsHeartFill /> : <BsHeart />}
        </span>
        <span className="mr-3 text-2xl" onClick={(e) => setShowPlaylists(!showPlaylists)}>
          <BsPlus />
        </span>
        {
          showPlaylists && <ul className="flex flex-col items-centerb bg-white absolute bottom-5 left-24">
            {playlists &&
              playlists.length &&
              playlists.map((playlist, index) => (
                <li 
                  key={index} 
                  onClick={() => handlePlaylistClick(playlist)}
                  className="border-b capitalize px-4 font-semibold text-sm py-1 flex justify-between items-center">
                  <span>{playlist.playlistName}</span>
                  <span className="ml-3 text-green-700">
                    {inPlaylist(playlist)? <i className="fa-solid fa-circle-check"></i>:null}
                  </span>
                </li>
              ))}
          </ul>
        }
      </div>
    </div>
  );
};

export default MusicCard;
