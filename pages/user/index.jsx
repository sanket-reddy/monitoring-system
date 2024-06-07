import BinCard from "@/components/binCard";
import ComplaintCard from "@/components/complaintCard";
import { Card } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

export default function Page() {
  const [token, setToken] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [wetLevel, setWetLevel] = useState(0);
  const [dryLevel, setDryLevel] = useState(0);
  const[wetAverageLevel,setWetAverageLevel] = useState(0);
  const[dryAverageLevel,setDryAverageLevel] = useState(0);

  const [user, setUser] = useState();

  useEffect(() => {
    let storedToken = localStorage.getItem("token");
    setToken(storedToken);
    const fetchUser = async () => {
      let resp = await axios.post("/api/user/fetchBin", { token });
      if (resp.status === 200) {
        setUser(resp.data.user);
        setComplaints(resp.data.user.complaints);

        let wl = resp.data.user.wetLevel;
        let dl = resp.data.user.dryLevel;
        if (wl.length !== 0 && dl.length !== 0) {
          setWetLevel(wl[wl.length - 1].level);
          setDryLevel(dl[dl.length - 1].level);

          // Calculate wet and dry average levels
          const wetAverageLevel = calculateAverage(wl);
          const dryAverageLevel = calculateAverage(dl);

          // Pass the wet and dry average levels to BinCard component
          setWetAverageLevel(wetAverageLevel);
          setDryAverageLevel(dryAverageLevel);
        }
      } else if (resp.status === 400) {
        console.log("something went wrong");
      }
    };
    if (token) {
      fetchUser();
    }
  }, [token]);

  // Function to calculate average
  const calculateAverage = (levels) => {
    if (!levels || levels.length === 0) return 0;
    const total = levels.reduce((sum, entry) => sum + entry.level, 0);
    return total / levels.length;
  };

  if (!token) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center w-full">

        <BinCard
          id={user?.id}
          username={user?.username}
          serial={1}
          wetlevel={wetLevel}
          drylevel={dryLevel}
          wetaverageLevel={wetAverageLevel}
          dryaverageLevel={dryAverageLevel}
        />
      </div>
      <h1 className="text-xl m-4">Your complaints that need to be resolved</h1>

      <div className="sm:flex sm:flex-wrap  gap-x-5 ml-7">
        {complaints.map((item, index) => (
          <ComplaintCard
            key={index}
            date={item.createdAt}
            title={item.title}
            description={item.description}
          />
        ))}

        <Link
          className="bg-slate-300 w-1/2 ml-3 lg:w-[200px] h-[150px]  rounded-md flex flex-col items-center justify-center"
          href="/user/complaint"
        >
          <IoMdAdd className="hover:rounded-full hover:bg-slate-400" size={80} />
          <h1 className="hover:underline">Register a complaint</h1>
        </Link>
      </div>
    </div>
  );
}
