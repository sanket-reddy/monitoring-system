import ComplaintCard from "@/components/complaintCard";
import { Card } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
export default function Page() {
  const [token, setToken] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [level, setLevel] = useState(0);
  useEffect(() => {
    let storedToken = localStorage.getItem("token");
    setToken(storedToken);
    const fetchUser = async () => {
      let resp = await axios.post("/api/user/fetchBin", { token });
      if (resp.status === 200) {
        setComplaints(resp.data.user.complaints);
        console.log("level : ", resp.data.user.level);
        if (resp.data.user.level.length !== 0) {
          let currentLevel = resp.data.user.level;
          setLevel(currentLevel[currentLevel.length - 1].level);
        } else {
          setLevel(30);
        }
      } else if (resp.status === 400) {
        console.log("something went wrong");
      }
    };
    if (token) {
      fetchUser();
    }
  }, [token]);
  const averageLevel = 40;
  if (!token) {
    return <div>pls do login</div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center w-full">
        <Card className="p-4 bg-white mt-5 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold mb-2">BIN - 1</h1>
          <h2 className="text-blue-500 font-semibold mb-2">LEVEL = {level}</h2>
          <h2 className="text-blue-500 font-semibold mb-2">
            AVERAGE = {averageLevel}
          </h2>
          <h3 className="text-gray-700 text-sm">
            Location : 77.59337820456454, 12.979826299677097
          </h3>
          {level > averageLevel ? (
            <div>
              <p className="text-red-500">Pickup needed</p>
              <progress
                className="progress progress-error w-full"
                value={level}
                max="100"
              ></progress>
            </div>
          ) : (
            <div>
              <p className="text-green-500">NO NEED OF PICKUP</p>
              <progress
                className="progress progress-info w-full"
                value={level}
                max="100"
              ></progress>
            </div>
          )}
        </Card>
      </div>
      <h1 className="text-xl m-4">your complaints that needed to resolved</h1>

      <div className="sm:flex sm:flex-wrap  gap-x-5 ml-7">
        {complaints.map((item) => (
          <ComplaintCard
            date={item.createdAt}
            title={item.title}
            description={item.description}
          ></ComplaintCard>
        ))}

        <Link
          className="bg-slate-300 w-1/2 ml-3 lg:w-[200px] h-[150px]  rounded-md flex flex-col items-center justify-center"
          href="/user/complaint"
        >
          <IoMdAdd
            className="hover:rounded-full hover:bg-slate-400"
            size={80}
          />
          <h1 className="hover:underline">Register a compliant</h1>
        </Link>
      </div>
    </div>
  );
}
