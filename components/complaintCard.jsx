export default function ComplaintCard(props) {
  return (
    <div className="card w-3/4 m-2 lg:w-1/4 bg-slate-300  shadow-xl">
      <div className="card-body">
        <p className="card-title break-all">{props.title}</p>
        <p className="break-all" >{props.description}</p>
        <p className="font-bold break-all">Posted on : {props.date}</p>
      </div>

    </div>
  );
}
