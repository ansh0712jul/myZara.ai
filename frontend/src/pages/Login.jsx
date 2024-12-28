import React,{ useState , useContext} from "react";
import axios from "../config/axios"
import { Link , useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card , CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { userContext } from "@/contextApi/User.context";

const Login = () => {

  const[username, setUsername] = useState("");

  const[password, setPassword] = useState("");

  const navigate = useNavigate();

  // destructuring userContext and get setUser function
  const { setUser } = useContext(userContext);

// handle login form submission 
  function handleLogin (e) {
    e.preventDefault();
    axios.post("/login", {username, password})
        .then( (res) =>{
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          // making user available to other components
          setUser(res.data.user);
          navigate("/home");
        })
        .catch((err) => console.log(err));
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <Card className="w-full max-w-md bg-gray-800 shadow-lg">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-bold text-gray-100">Welcome Back</h1>
          <p className="text-sm text-gray-400">Sign in to your account</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-6"
          onSubmit={handleLogin}>
            <div>
                <label className="block text-sm font-medium text-gray-400">
                  Username
                </label>
                <Input 
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter your username"
                className="mt-1 w-full"
                required
                />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Password
              </label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="mt-1 w-full"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Create one
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
