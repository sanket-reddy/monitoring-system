import { useRouter, useRouterRouter } from "next/router";
import { useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
export default function Page(){
    const router = useRouter();
    useEffect(()=>{
        
    })
return <div>
    <div className="flex flex-col items-center w-1/5 shadow-xl bg-base-100">
    <IoMdAdd  className="hover:rounded-full hover:bg-slate-300" onClick={()=>{router.push("/user/complaint")}} size={80}/>
    <h1>complaint</h1>
    </div>
</div>
}