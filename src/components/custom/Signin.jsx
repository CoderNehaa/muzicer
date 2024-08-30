import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { DialogClose } from "@radix-ui/react-dialog";
import { getEmail, signin } from "@/redux/reducers/userReducer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    const result = await dispatch(signin(formData));
    if (result) {
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  async function handlePasswordMail() {
    if(!emailAddress){
      toast.error("Invalid email");
      return;
    }
    await dispatch(getEmail(emailAddress));
  }

  return (
    <Card className="min-h-[500px] relative">
      <CardHeader>
        <CardTitle>SIGN IN</CardTitle>
        <CardDescription>Sign in to your account.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="abc@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="relative space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
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
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute top-9 right-2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

        <Dialog>
          <DialogTrigger asChild>
            <span>Forgot Password? </span>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Enter email</DialogTitle>
            </DialogHeader>
            <Input
              id="email"
              type="email"
              value={emailAddress}
              onChange={(e) => {
                setEmailAddress(e.target.value)
              }}
              placeholder="abc@gmail.com"
              className="col-span-3"
              required={true}
            />
            <DialogClose>
              <Button type="submit" onClick={handlePasswordMail}>
                Send Email
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default Signin;
