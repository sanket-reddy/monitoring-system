import Link from "next/link";

export default function Page(){
    return <div className="w-full flex gap-x-3 justify-center items-center min-h-screen" >
        <button className="btn btn-neutral">
          <Link href= "/user/login">USER</Link>
          </button>
        <button className="btn btn-neutral">
        <Link href= "/pickup">PickUp</Link>
        </button>
        <button className="btn btn-neutral">
        <Link href= "/admin/login">Admin</Link>

        </button>

  </div>
}