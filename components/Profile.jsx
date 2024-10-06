"use client"

import { useRouter } from "next/navigation"

export default function Profile({name}) {

    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        router.push("/login")
    }

  return (
    <div className="px-4 py-3 rounded-lg fixed bottom-4 left-4 w-48 bg-gray-200/50">
      <div className="flex gap-2">
        <div>
          <img src="/profile-picture.png" className="w-12 h-12 rounded-full" />
        </div>
        <div className="flex flex-col gap-1">
            <h5 className="text-base font-bold">{name}</h5>
            <p onClick={handleLogout} className="text-blue-600 hover:underline text-sm cursor-pointer">Logout</p>
        </div>
      </div>
    </div>
  );
}
