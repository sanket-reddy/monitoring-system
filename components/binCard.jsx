import { Button, Card} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
export default function BinCard(props) {
    const[wetlevel ,setWetLevel] = useState(0);
    const[drylevel ,setDryLevel] = useState(0);

    useEffect(()=>{
        const fetchData = async()=>{
            let wetResp = await axios.get("https://api.thingspeak.com/channels/2570493/fields/1.json?api_key=4Z1AMMHKEW6ZP6YT&results=2")
            let dryResp = await axios.get("https://api.thingspeak.com/channels/2570493/fields/2.json?api_key=4Z1AMMHKEW6ZP6YT&results=2")
            setWetLevel(wetResp.data.feeds[0].field1)
            setDryLevel(dryResp.data.feeds[0].field1)
            setWetLevel(0);
            setDryLevel(0);
            if( wetlevel && drylevel ){
                let resp = await axios.post("/api/storedb",{userId : props.id, wetLevel : wetlevel, dryLevel : drylevel });
                console.log(resp.data);
            }
        }
        fetchData();
    })

    return (
    <Card className="p-4 bg-white w-1/5 mt-3 rounded-lg shadow-md">
      <h1 className="text-xl font-semibold mb-2">BIN - {props.serial}</h1>
      <h1 className="text-xl font-semibold mb-2">USERNAME - {props.username}</h1>
      <h2 className="text-blue-500 font-semibold mb-2">WET LEVEL = {wetlevel}</h2>
      <h2 className="text-blue-500 font-semibold mb-2">DRY LEVEL = {drylevel}</h2>
      <h2 className="text-blue-500 font-semibold mb-2">
        WET AVERAGE = {props.wetaverageLevel}
      </h2>
      <h2 className="text-blue-500 font-semibold mb-2">
        DRY AVERAGE = {props.dryaverageLevel}
      </h2>
      <h3 className="text-gray-700 text-sm">
        Location : {props.lat}, {props.lon}
      </h3>
      {props.wetlevel > props.wetaverageLevel ? (
            <div>
              <p className="text-red-500">WET : Pickup needed</p>
              <progress
                className="progress progress-error w-full"
                value={wetlevel}
                max="100"
              ></progress>
            </div>
          ) : (
            <div>
              <p className="text-green-500">WET :  NO NEED OF PICKUP</p>
              <progress
                className="progress progress-info w-full"
                value={wetlevel}
                max="100"
              ></progress>
            </div>
          )}
           {props.drylevel > props.dryaverageLevel ? (
            <div>
              <p className="text-red-500">DRY : Pickup needed</p>
              <progress
                className="progress progress-error w-full"
                value={drylevel}
                max="100"
              ></progress>
            </div>
          ) : (
            <div>
              <p className="text-green-500">DRY :  NO NEED OF PICKUP</p>
              <progress
                className="progress progress-info w-full"
                value={drylevel}
                max="100"
              ></progress>
            </div>
          )}
    </Card>
  );
}
