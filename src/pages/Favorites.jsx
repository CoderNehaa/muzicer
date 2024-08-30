import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MusicCard from "@/components/custom/MusicCard";
import { Link, useNavigate } from "react-router-dom";

const Favorites = () => {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if(!user){
      navigate('/');
    }
  },[user]);

  return (
    <div className="h-auto w-full mt-16">
      <div className="h-auto md:w-3/4 xl:w-1/2 m-auto">
        <h1 className="text-start tracking-wide text-4xl font-semibold py-5">
          Favorites
        </h1>
        <div>
          {user && user.favorites && user.favorites.length ? (
            user.favorites.map((song, index) => (
              <MusicCard key={index} song={song} />
            ))
          ) : (
            <span className="text-xl tracking-wide">
              There are no songs in your favorites list.{" "}
              <Link to="/" className="text-red-600 font-semibold">
                {" "}
                Add Songs{" "}
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
