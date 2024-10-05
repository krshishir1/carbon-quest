import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-grad py-8">
      <div className="p-6 rounded-2xl max-w-[90rem] mx-auto grid grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 font-medium">
            <p>Simple</p>
            <p>Track</p>
            <p>Reduce</p>
          </div>
          <h1 className="text-4xl font-playfair font-semibold max-w-[25rem]">
            Make a difference! Sign Up now!
          </h1>
          {/* <div className="flex gap-4">
            <p>Come stalk us:</p>
            <div>
              <span>icon</span>
              <span>icon</span>
            </div>
          </div> */}
          <p className='mt-28 text-sm'>All rights reserved.</p>
        </div>
        <div className="">
          <p>Join Our Newsletter.</p>
          <div className="mt-5 flex flex-col gap-4">
            <Input type="text" placeholder="name" className="max-w-[20rem]" />
            <Input type="email" placeholder="email" className="max-w-[20rem]" />
            <Button className="max-w-[20rem]">Submit</Button>
          </div>
          <div className='flex gap-4 mt-14 underline font-medium text-sm'>
            <Link href=''>Terms of Use</Link>
            <Link href=''>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
