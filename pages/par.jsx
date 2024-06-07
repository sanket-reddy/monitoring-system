import { useEffect, useState } from "react";
import { Button, Card} from "@mui/material";
import axios from "axios";

export default function Page() {
  const [level, setLevel] = useState(0);
  const [orders, setorder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.thingspeak.com/channels/2570493/feeds.json?api_key=4Z1AMMHKEW6ZP6YT&results=2");
        console.log(response.data);
        setLevel(response.data.feeds[0].field1);
      } catch (error) {
        console.error("Error fetching level data:", error);
      }
    };

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  const averageLevel = 53;

  const handle = async () => {
    // if (level < 100 - averageLevel) {
    //   let response = await axios.post("http://localhost:3000/getlevel", {
    //     pickup: false,
    //   });
    //   console.log(response.data);
    //   setRoute(response.data.optimizedWaypoints);
    //   console.log(route);
    // } else {
    //   let response = await axios.post("http://localhost:3000/getlevel", {
    //     level,
    //     pickup: true,
    //   });
    //   console.log(response.data);
    //   setRoute(response.data.optimizedWaypoints);
    //   console.log(route);
    // }
    let response = await axios.post("http://localhost:3000/routeplanner");
    console.log(response.data);
    setorder(response.data);
  };

  return (
    <div className="containe mr-0 min-h-screen p-10 bg-slate-200 ">
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card className="p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-semibold mb-2">BIN - 1</h1>
          <h2 className="text-blue-500 font-semibold mb-2">LEVEL = {level}</h2>
          <h2 className="text-blue-500 font-semibold mb-2">
            AVERAGE = {averageLevel}
          </h2>
          <h3 className="text-gray-700 text-sm">
            Location : 77.59337820456454, 12.979826299677097
          </h3>
          {level > averageLevel ? (
            <p className="text-red-500">Pickup needed</p>
          ) : (
            <p className="text-red-500">NO NEED OF PICKUP</p>
          )}
          <progress
            className="progress progress-accent w-full"
            value="70"
            max="100"
          ></progress>
        </Card>
        <Card className="p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-semibold mb-2">BIN - 2</h1>
          <h2 className="text-blue-500 font-semibold mb-2">LEVEL = 57</h2>
          <h2 className="text-blue-500 font-semibold mb-2">AVERAGE = 49</h2>
          <h3 className="text-gray-700 text-sm">
            Location : 77.58668265, 12.96906865{" "}
          </h3>
          <p className="text-red-500 mt-1 text-md">PICKUP NEEDED</p>
        </Card>
        <Card className="p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-semibold mb-2">BIN - 3</h1>
          <h2 className="text-blue-500 font-semibold mb-2">LEVEL = 60</h2>
          <h2 className="text-blue-500 font-semibold mb-2">AVERAGE = 40</h2>
          <h3 className="text-gray-700 text-sm">
            Location: 77.60147291695439, 12.96496525{" "}
          </h3>
          <p className="text-red-500 mt-1 text-md">PICKUP NEEDED</p>
        </Card>
        <Card className="p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-semibold mb-2">BIN - 4</h1>
          <h2 className="text-blue-500 font-semibold mb-2">LEVEL = 44</h2>
          <h2 className="text-blue-500 font-semibold mb-2">AVERAGE = 40</h2>
          <h3 className="text-gray-700 text-sm">
            Location : 77.59615794488309, 12.970045
          </h3>
          <p className="text-red-500 mt-1 text-md"> NO PICKUP NEEDED</p>
        </Card>
        <Card className="p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-semibold mb-2">BIN - 5</h1>
          <h2 className="text-blue-500 font-semibold mb-2">LEVEL = 74</h2>
          <h2 className="text-blue-500 font-semibold mb-2">AVERAGE = 65</h2>
          <h3 className="text-gray-700 text-sm">
            Location: 77.59181155, 12.95560465
          </h3>
          <p className="text-red-500 mt-1 text-md">PICKUP NEEDED</p>
        </Card>
        <Card className="p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-semibold mb-2">BIN - 6</h1>
          <h2 className="text-blue-500 font-semibold mb-2">LEVEL = 50</h2>
          <h2 className="text-blue-500 font-semibold mb-2">AVERAGE = 56</h2>
          <h3 className="text-gray-700 text-sm">
            {" "}
            Location : 77.56903559144436, 12.9594065
          </h3>
          <p className="text-red-500 mt-1 text-md">PICKUP NEEDED</p>
        </Card>
        <Card className="p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-semibold mb-2">BIN - 7</h1>
          <h2 className="text-blue-500 font-semibold mb-2">LEVEL = 50</h2>
          <h2 className="text-blue-500 font-semibold mb-2">AVERAGE = 40</h2>
          <h3 className="text-gray-700 text-sm">
            Location: 77.5800842131508, 12.96803425
          </h3>
          <p className="text-red-500 mt-1 text-md"> NO PICKUP NEEDED</p>
        </Card>
      </div>
      <br></br>
      <br></br>
      <center>
        <Button variant="contained" className="mt-4s" onClick={handle}>
          CALCULATE{" "}
        </Button>
      </center>
      {/* <div>
        {route.length > 0 ? (
          route.map((location, index) => (
            <p key={index}>
              location {index + 1} : {location}
            </p>
          ))
        ) : (
          <p>No route available</p>
        )}
      </div> */}
      <div>
        <h2>Orders List</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h3>Order ID: {order.id}</h3>
              <p>
                Pickup Location: {order.pickup.location[0]},{" "}
                {order.pickup.location[1]}
              </p>
              <p>Pickup Duration: {order.pickup.duration}</p>
              <p>
                Delivery Location: {order.delivery.location[0]},{" "}
                {order.delivery.location[1]}
              </p>
              <p>Delivery Duration: {order.delivery.duration}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
