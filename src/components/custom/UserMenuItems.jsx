import React from "react"
import { useNavigate } from "react-router-dom"
import {
    Home,
    LogOut,
    Music,
    Heart
  } from "lucide-react"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useDispatch, useSelector } from "react-redux"
import { signOut } from "@/redux/reducers/userReducer"
import Avatar from "./Avatar"
import PasswordDialog from "./PasswordDialog"

 const UserMenuItems = () => {
    const {user} = useSelector((state) => state.userReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleLogout(){
       dispatch(signOut());
    }

    return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button>
                <Avatar />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 fixed z-50 top-5 -right-10">
          <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate('/')}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/favorites')}>
              <Heart className="mr-2 h-4 w-4" />
              <span>Favorites</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/playlists')}>
              <Music className="mr-2 h-4 w-4" />
              <span>My Playlists</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              <PasswordDialog />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu></div>
    )
  }
  export default UserMenuItems;
