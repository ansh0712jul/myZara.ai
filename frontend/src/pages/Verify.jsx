import React,{ useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form";
// import { loginSchema } from "@/schemas/loginSchema";
import axios from "../config/axios"
import { Link , useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card , CardHeader, CardContent } from "@/components/ui/card";


const Verify = () => {

  const[email, setemail] = useState("");

  const[verificationCode, setverificationCode] = useState("");

  const navigate = useNavigate();

//   // Initialize react-hook-form with Zod resolver
//      const {
//       register,
//       handleSubmit,
//       formState: { errors },
//     } = useForm({
//       resolver: zodResolver(loginSchema),
//     });

// handle login form submission 
  function handleVerification (e) {
    e.preventDefault();
    axios.post("/user/verify-email", {email,verificationCode})
        .then( (res) =>{
          console.log(res.data);
          navigate("/");
        })
        .catch((err) => console.log("invalid verification code",err));
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <Card className="w-full max-w-md bg-gray-800 shadow-lg">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-bold text-gray-100">Verify Your Email</h1>
          
        </CardHeader>
        <CardContent>
          <form className="space-y-6"
          onSubmit={handleVerification }>
            <div>
                <label className="block text-sm font-medium text-gray-400">
                  Email
                </label>
                <Input 
                onChange={(e) => setemail(e.target.value)}
                // {...register("userName")}
                type="email"
                placeholder="Enter your Email"
                className="mt-1 w-full"
                value={email}
               
                />
                {/* {
                errors.userName && (
                  <p className="text-[11px] text-red-600 mt-1 mx-2">
                    {
                      errors.userName.message
                    }
                  </p>
                )
              } */}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">
                VerificationCode
              </label>
              <Input
                onChange={(e) => setverificationCode(e.target.value)}
                // {...register("password")}
                value={verificationCode}
                type="string"
                placeholder="Enter your Code"
                className="mt-1 w-full"
              
              />
              {/* {
                errors.password && (
                  <p className="text-[11px] text-red-600 mt-1 mx-2">
                    {
                      errors.password.message
                    }
                  </p>
                )
              } */}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Verify;
