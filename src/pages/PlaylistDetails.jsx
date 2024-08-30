import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import MusicCard from '../components/custom/MusicCard';

const PlaylistDetails = () => {
    const {playlists} = useSelector((state) => state.musicReducer);
    const [currPlaylist, setCurrPlaylist] = useState();
    const {id} = useParams();
    
    useEffect(() => {
        if(playlists && playlists.length){
            const playlist = playlists.find((obj) => obj._id === id);
            if(playlist){
                setCurrPlaylist(playlist);
            }
        }
    } , [id]);

  return (
    <div className="h-auto w-full mt-16">
      {currPlaylist && <div className="h-auto w-4/5 md:w-3/4 xl:w-1/2 m-auto">
        <h1 className="text-start tracking-wide text-4xl font-semibold py-5 capitalize">
        Your playlist - {currPlaylist.playlistName}
        </h1>
        <div>
          {currPlaylist.songs && currPlaylist.songs.length
            ? currPlaylist.songs.map((song, index) => <MusicCard key={index} song={song} />)
            : null}
        </div>
      </div>}
    </div>
  )
}

export default PlaylistDetails;
