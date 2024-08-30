import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Signin from "@/components/custom/Signin";
import Signup from "@/components/custom/Signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Auth() {
  const user = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      navigate('/');
    }
  } ,[user]);

  return (
    <div className="relative h-screen w-full flex flex-col justify-center items-center">
      <Tabs defaultValue="signin" className="w-1/3">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">SIGN IN</TabsTrigger>
          <TabsTrigger value="signup">SIGN UP</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Signin />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Auth;
