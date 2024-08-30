import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPlaylist,
  getUserPlaylists,
} from "@/redux/reducers/musicReducer";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PlaylistCard from "@/components/custom/PlaylistCard";
import { useNavigate } from "react-router-dom";

const Playlists = () => {
  const [playlistName, setPlaylistName] = useState("");
  const { user } = useSelector((state) => state.userReducer);
  const { playlists } = useSelector((state) => state.musicReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(getUserPlaylists());
    } else {
      navigate('/')
    }
  }, [user]);

  async function handleSubmit() {
    await dispatch(createPlaylist(playlistName));
    setPlaylistName("");
  }

  return (
    <div className="h-auto w-full mt-16">
      <div className="h-auto sm:w-4/5 md:w-3/4 xl:w-1/2 m-14 sm:m-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-start tracking-wide text-4xl font-semibold py-5">
            Your Playlists
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-40">
                Create New <i className="fa-solid fa-plus ml-2"></i>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Playlist</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="name" className="text-right">
                    Playlist Name
                  </Label>
                  <Input
                    id="name"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    placeholder="Enter Playlist Name"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button onClick={handleSubmit} type="submit">
                    Create
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="m-4">
          {playlists && playlists.length ? (
            <div className="flex flex-wrap justify-center items-start sm:items-center">
              {playlists.map((playlist, index) => (
                <PlaylistCard playlist={playlist} key={index} />
              ))}
            </div>
          ) : (
            <span className="text-xl tracking-wide">
              You have not created playlists yet.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlists;
