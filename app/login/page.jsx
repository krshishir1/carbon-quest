"use client"

import { Input } from "@nextui-org/input";
import Link from "next/link";
import { Button } from "@nextui-org/react";

import { useRouter } from "next/navigation";

import { useState } from "react";
import axios from "axios"

export default function Login() {

  const router = useRouter()

  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    try {

      const request = {
        method: "POST",
        url: "http://localhost:3000/auth/login",
        data: details
      }

      const {data} = await axios(request)

      const {token, user} = data

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      router.push("/dashboard")

    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="flex">
      <section className="w-1/2 border-r grid place-items-center h-screen">
        <div>
          <div className="my-10 text-center">
            <h1 className="font-medium font-[impact] text-4xl">CarbonQuest</h1>
            <p>A Quest to Conqueror Carbon Emission.</p>
          </div>
          <form action="" className="flex flex-col gap-4">
            <Input
              type="text"
              label="username"
              className="w-[25rem]"
              value={details.username}
              onChange={(e) =>
                setDetails((prev) => ({ ...prev, username: e.target.value }))
              }
            />
            <Input
              type="password"
              label="password"
              className="w-[25rem]"
              value={details.password}
              onChange={(e) =>
                setDetails((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            {/* <Link href="" className="text-blue-400 text-xs font-medium text-right">Forgot password?</Link> */}
            <Button onClick={handleLogin} color="primary" className="mt-3">
              Log In
            </Button>
            <p className="font-medium text-center text-xs">
              New to CarbonQuest?{" "}
              <Link href="/signup" className="text-blue-400">
                Sign Up
              </Link>{" "}
              here.
            </p>
          </form>
        </div>
      </section>
      <section className="w-1/2"></section>
    </div>
  );
}
