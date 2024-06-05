import axios from "axios";
import { useEffect, useState } from "react";
export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token") ?? "";
      setToken(storedToken);
    }
  }, []);

  const handleComplaint = async () => {
    if (title === "" || description === "") {
      alert("no detials are entered");
      return;
    } else {
      let resp = await axios.post("/api/user/complaint", {
        title,
        description,
        token
      });
      if (resp.status === 200) {
        alert("complaint registered succesfully");
      }
    }
    // console.log("title : ", title);
    // console.log("description : ", description);
  };

  if (token) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center">
        <h1 className="text-lg">Fill in the detials to register a complaint</h1>
        <div className="bg-base-200 w-96 shadow-xl  flex h-[400px] flex-col items-center gap-y-2  p-2">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="Enter the title here"
            className="input  input-b ordered w-full"
          />
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="textarea h-3/4 w-full  textarea-bordered"
            placeholder="enter the description here"
          ></textarea>
          <button onClick={handleComplaint} className="btn w-1/3 btn-neutral">
            Submit
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>LOGIN TO REGISTER THE COMPLAINT</h1>
      </div>
    );
  }
}
