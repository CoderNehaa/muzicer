import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from '@/redux/reducers/userReducer';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';

const Signup = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      console.log(password, confirmPassword);
      toast.error("Passwords do not match!");
      return;
    }
    dispatch(signup({
      username:formData.username,
      email:formData.email,
      password:formData.password
    })).then((data) => {
      console.log(data);
      if(data.payload){
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        })
      }
    })
  };

  return (
      <Card className="min-h-[500px] relative">
        <CardHeader>
          <CardTitle>SIGN UP</CardTitle>
          <CardDescription>
            Don't have an account? Create New Account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
              />
              <button
              type="button"
              className="absolute top-9 right-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
            </div>
            <div className="relative space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
              type="button"
              className="absolute top-9 right-2"
              onClick={() => setShowConfirmPassword(!showPassword)}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
            </div>
            <CardFooter className="p-0">
            <Button type="submit" className="mb-5">
              Submit
            </Button>
          </CardFooter>
          </form>
        </CardContent>
      </Card>
  );

}

export default Signup;
