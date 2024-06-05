import axios from "axios";
import { useState } from "react";
import Router from "next/router";
export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
 let resp =  await axios.post("/api/user/login", { username, password });
      if(resp.status === 200){
        let token = resp.data.token;
        localStorage.setItem("token",token);
        Router.push("/user");
      }
      else{
        alert("something went wrong")
      }
    
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-xl">Fill in the below detials to Login</h1>
      <div className="card w-96  flex flex-col justify-center items-center gap-y-3 p-4 bg-base-800 border border-black shadow-xl ">
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          placeholder="enter the username"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="enter the password"
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={handleSignUp} className="btn btn-neutral">
          Submit
        </button>
      </div>
    </div>
  );
}
