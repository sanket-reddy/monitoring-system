import axios from "axios";

export default function AdminComplaintCard(props) {
  const handleResolve = async()=>{
    let resp = await axios.post("/api/complaintresolved",{complaintId : props.id});
    if(resp.status === 200){
      console.log(resp.data);
    }
    else{
      console.log("something went wrong");
    }
  }  
  
  return (
      <div className="card w-3/4 m-2 lg:w-1/4 bg-slate-300  shadow-xl">
        <div className="card-body">
          <p className="card-title break-all">{props.title}</p>
          <p className="text-lg" >postedBy : {props.username}</p>
          <p className="break-all" >{props.description}</p>
          <p className="font-bold break-all">Posted on : {props.date}</p>
          <p>Is the issue resolved ?</p>
          <button className="btn btn-active btn-neutral" onClick={handleResolve} >Resolved</button>
        </div>
  
      </div>
    );
  }
  