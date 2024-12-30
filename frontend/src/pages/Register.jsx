import React, { useState , useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/schemas/registerSchema";
import axios  from "@/config/axios"
import { Link, useNavigate } from "react-router-dom";
import { Card , CardHeader, CardContent, CardFooter} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userContext } from "@/contextApi/User.context";
const Register = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // destructuring userContext and get setUser function
  const { setUser } = useContext(userContext);

   // Initialize react-hook-form with Zod resolver
   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  // submit handler
  function submithandler(data) {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/user/register`, { userName: data.userName, email: data.email, password: data.password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        navigate("/verify-email");
      })
      .catch((err) => console.log(err));
  }
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <Card className="w-full max-w-md bg-gray-800 shadow-lg">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-bold text-gray-100">Create Account</h1>
          <p className="text-sm text-gray-400">Sign up to get started</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-6"
            onSubmit={ handleSubmit(submithandler) }
          >
          <div>
              <label className="block text-sm font-medium text-gray-400">
                Email
              </label>
              <Input
                // onChange={(e) => setEmail(e.target.value)}
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full"
              
              />
              {
                errors.email && (
                  <p className="text-[11px] text-red-600 mt-1 mx-2">{
                     errors.email.message 
                  }</p>
                )
              }
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Username
              </label>
              <Input
                // onChange={(e) => setUsername(e.target.value)}
                {...register("userName")}
                type="text"
                placeholder="Enter your username"
                className="mt-1 w-full"  
              />
              {
                errors.userName && (
                  <p className="text-[11px] text-red-600 mt-1 mx-2">
                    {
                      errors.userName.message
                    }
                  </p>
                )
              }
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Password
              </label>
              <Input
                // onChange={(e) => setPassword(e.target.value)}
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className="mt-1 w-full"
                
              />
              {
                errors.password && (
                  <p className="text-[11px] text-red-600 mt-1 mx-2">
                    {
                      errors.password.message
                    }
                  </p>
                )
              }
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
