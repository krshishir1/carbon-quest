import { Input } from "@nextui-org/input";
import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function SignUp() {
  return (
    <div className="flex">
      <section className="w-1/2 border-r flex flex-col items-center justify-center h-screen">
        <div>
          <div>
            <Link href="/">CarobonQuest.</Link>
            <p>.</p>
          </div>

          <div className="flex justify-between border w-full"></div>
          <h1>Sign Up</h1>
          <p>A Quest to Conqueror Carbon Emission.</p>
          <form action="" className="flex flex-col gap-4">
            <Input type="text" label="username" className="w-[25rem]" />
            <Input type="email" label="email" className="w-[25rem]" />
            <Input type="password" label="password" className="w-[25rem]" />
            <p className="mt-1 text-right text-xs">
              Already have an account?{" "}
              <Link href="" className="text-blue-400">
                Login
              </Link>{" "}
              here.
            </p>
            <Button color="primary" className="mt-3">
              Sign Up
            </Button>
          </form>
        </div>
      </section>
      <section className="w-1/2"></section>
    </div>
  );
}
