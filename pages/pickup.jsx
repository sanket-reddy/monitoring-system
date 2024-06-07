import BinCard from "@/components/binCard";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [location, setLocation] = useState([]);
  const [addedUsers, setAddedUsers] = useState(new Set()); 
  const [delivery ,setDelvery] =useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let resp = await axios.get("/api/getallusers");
      console.log(resp.data.users);
      setUsers(resp.data.users);
    };
    fetchData();
  }, []);

  const calculateAverage = (levels) => {
    if (!levels || levels.length === 0) return 0;
    const total = levels.reduce((sum, entry) => sum + entry.level, 0);
    return total / levels.length;
  };

  useEffect(() => {
    users.forEach((user) => {
      if (addedUsers.has(user.id)) return; 

      const wetLevel = user.wetLevel && user.wetLevel.length > 0
        ? user.wetLevel[user.wetLevel.length - 1].level
        : 0;
      const dryLevel = user.dryLevel && user.dryLevel.length > 0
        ? user.dryLevel[user.dryLevel.length - 1].level
        : 0;

      const wetAverageLevel = calculateAverage(user.wetLevel);
      const dryAverageLevel = calculateAverage(user.dryLevel);

      if (wetLevel > wetAverageLevel || dryLevel > dryAverageLevel) {
        setLocation(prevLocation => [
          ...prevLocation,
          { lat: user.lat, lon: user.lon }
        ]);
        setAddedUsers(prevAddedUsers => new Set(prevAddedUsers).add(user.id)); // Update the added users set
      }
    });
  }, [users]);

  const sendRoutePlanRequest = async () => {
    const body = {
      mode: "drive",
      agents: [
        {
          start_location: [77.59337820456454, 12.979826299677097],
          time_windows: [[0, 7200]],
        },
      ],
      shipments: location.map((loc, index) => ({
        id: `order_${index + 1}`,
        pickup: { location_index: 0, duration: 120 },
        delivery: { location: [parseFloat(loc.lat), parseFloat(loc.lon)], duration: 120 },
      })),
      locations: [
        {
          id: "warehouse-0",
          location: [77.5764372, 12.9648252],
        },
      ],
    };

    try {
      const response = await axios.post(
        "https://api.geoapify.com/v1/routeplanner?apiKey=e725a5a8245f4837b37460a35ee24aa0",
        body,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Response:", response);
      setDelvery(response.data.features[0].properties.actions)
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <div className="lg:flex lg:flex-wrap gap-x-3">
      {users.map((user, index) => {
        const wetLevel = user.wetLevel && user.wetLevel.length > 0
          ? user.wetLevel[user.wetLevel.length - 1].level
          : "0";
        const dryLevel = user.dryLevel && user.dryLevel.length > 0
          ? user.dryLevel[user.dryLevel.length - 1].level
          : "0";

        const wetAverageLevel = calculateAverage(user.wetLevel);
        const dryAverageLevel = calculateAverage(user.dryLevel);

        return (
          <BinCard
            key={user.id}
            id={user.id}
            username={user.username}
            serial={index + 1}
            wetlevel={wetLevel}
            lat = {user.lat}
            lon = {user.lon}
            drylevel={dryLevel}
            wetaverageLevel={wetAverageLevel}
            dryaverageLevel={dryAverageLevel}
          ></BinCard>
        );
      })}
      </div>
      <div className="w-full flex justify-center mt-3">
      <Button variant = "contained" onClick={sendRoutePlanRequest}>Send Route Plan Request</Button>
      </div>
      {delivery.slice(0, delivery.length / 2).map((item) => (
  <h1>{item.shipment_id}</h1>
))}
    </div>
  );
}
