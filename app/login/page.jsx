import { Input } from "@nextui-org/input";
import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function Login() {
  return (
    <div className="flex">
      <section className="w-1/2 border-r grid place-items-center h-screen">
        <div>
          <div className="my-10 text-center">
            <h1 className="font-medium font-[impact] text-4xl">CarbonQuest</h1>
            <p>A Quest to Conqueror Carbon Emission.</p>
          </div>
          <form action="" className="flex flex-col gap-4">
            <Input type="text" label="username" className="w-[25rem]" />
            <Input type="password" label="password" className="w-[25rem]" />
            <Link href="" className="text-blue-400 text-xs font-medium text-right">Forgot password?</Link>
            <Button color="primary" className="mt-3">
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
