import AdminComplaintCard from "@/components/adminComplaint";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [token, setToken] = useState("");
  const [complaints,setComplaints] = useState([]);

  useEffect(() => {
    let storedToken = localStorage.getItem("token");
    setToken(storedToken);
    const fetchComplaint = async () => {
      try {
        let resp = await axios.get("/api/complaint");
        if(resp.status === 200){
            setComplaints(resp.data.complaints);
        }
        
    } catch (error) {
        console.log("an error has occured : ", error);
      }
    };
    if (token) {
      fetchComplaint();
    }
  }, [token]);
  console.log("compliants : ",complaints);
  if (!token) {
    return <div> no token</div>;
  } else if(complaints.length === 0) {
    return <div>No compliants are there</div>
  }
   else {
    return (
      <div className="lg:flex lg:flex-wrap">
        {complaints.map((item)=>(
            <AdminComplaintCard title = {item.title}description = {item.description} username = {item.PostedBy.username} date = {item.createdAt} id = {item.id} key = {item.id} ></AdminComplaintCard>
        ))}
      </div>
    );
  }
}
