import React from "react";
import { useSelector } from "react-redux";

const avatarStyle = {
  height: "40px",
  width: "40px",
  padding: "5px",
  borderRadius: "50%",
  backgroundColor:"rgba(218, 165, 32, 0.8)",
  color: "white",
};

const Avatar = () => {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div style={avatarStyle} className="flex flex-col justify-center items-center">
     {user && user.username ? user.username[0]:""}
    </div>
  );
};

export default Avatar;
