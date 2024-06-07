import axios from "axios";
import { useState } from "react";
import Router from "next/router";
export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const[lat,setLat] = useState("");
  const [lon ,setLon] = useState("");
  const [email,setEmail] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("confirm password is not matching");
      return;
    } else {
      console.log(lat,lon,email)
      let resp = await axios.post("/api/signin", { username, password,lat,lon,email });
      if(resp.status === 200){
        // alert("successful login");
        let token = resp.data.token;
        localStorage.setItem("token",token);
        Router.push("/user");
      }
      else{
        alert("something went wrong")
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-xl">Fill in the below detials to SignUp</h1>
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
        <input
          onChange={(e) => {
            setLat(e.target.value);
          }}
          type="text"
          placeholder="enter the latitude"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          onChange={(e) => {
            setLon(e.target.value);
          }}
          type="text"
          placeholder="enter the longitude"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="enter the email"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          type="password"
          placeholder="confirm the password"
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={handleSignUp} className="btn btn-neutral">
          Submit
        </button>
      </div>
    </div>
  );
}
