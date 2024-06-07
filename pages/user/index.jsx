import BinCard from "@/components/binCard";
import ComplaintCard from "@/components/complaintCard";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

export default function Page() {
  const [token, setToken] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [wetLevel, setWetLevel] = useState(0);
  const [dryLevel, setDryLevel] = useState(0);
  const [wetAverageLevel, setWetAverageLevel] = useState(0);
  const [dryAverageLevel, setDryAverageLevel] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("stored token", storedToken);
    setToken(storedToken);

    if (storedToken) {
      const fetchUser = async () => {
        try {
          const resp = await axios.post("/api/user/fetchBin", { token: storedToken });
          if (resp.status === 200) {
            const userData = resp.data.user;
            setUser(userData);
            setComplaints(userData.complaints);

            const wl = userData.wetLevel;
            const dl = userData.dryLevel;

            if (wl.length !== 0 && dl.length !== 0) {
              setWetLevel(wl[wl.length - 1].level);
              setDryLevel(dl[dl.length - 1].level);

              setWetAverageLevel(calculateAverage(wl));
              setDryAverageLevel(calculateAverage(dl));
            }
          } else {
            console.error("Failed to fetch user data:", resp.status);
          }
        } catch (error) {
          console.error("API call failed:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const calculateAverage = (levels) => {
    if (!levels || levels.length === 0) return 0;
    const total = levels.reduce((sum, entry) => sum + entry.level, 0);
    return total / levels.length;
  };

  if (!token) {
    return <div>Please log in</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center w-full">
        {user && (
          <BinCard
            id={user.id}
            username={user.username}
            serial={1}
            wetlevel={wetLevel}
            drylevel={dryLevel}
            wetaverageLevel={wetAverageLevel}
            dryaverageLevel={dryAverageLevel}
          />
        )}
      </div>
      <h1 className="text-xl m-4">Your complaints that need to be resolved</h1>

      <div className="sm:flex sm:flex-wrap gap-x-5 ml-7">
        {complaints.map((item, index) => (
          <ComplaintCard
            key={index}
            date={item.createdAt}
            title={item.title}
            description={item.description}
          />
        ))}

        <Link
          className="bg-slate-300 w-1/2 ml-3 lg:w-[200px] h-[150px] rounded-md flex flex-col items-center justify-center"
          href="/user/complaint"
        >
          <IoMdAdd className="hover:rounded-full hover:bg-slate-400" size={80} />
          <h1 className="hover:underline">Register a complaint</h1>
        </Link>
      </div>
    </div>
  );
}
