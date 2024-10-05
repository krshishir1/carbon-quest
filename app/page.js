import Link from "next/link";
import { ArrowDown02Icon } from "hugeicons-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <section className="h-screen mt-10 max-w-[70rem] mx-auto">
        <h1 className="font-playfair text-6xl font-medium uppercase mb-10">
          Discover you Impact
        </h1>
        <div className="h-[32rem] w-full bg-neutral-400"></div>
        <div className="flex justify-between mt-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea fugit
            nulla repellendus iusto dolore magni molestias iure consectetur
            libero amet.
          </p>
          <Link
            href="/signup"
            className="border-2 border-black hover:bg-black hover:text-white transition px-4 py-2"
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className="h-screen mt-10 max-w-[70rem] mx-auto flex flex-col justify-center align-center">
        <div className='border-b pb-10 border-black'>
          <h1 className="text-5xl font-playfair font-medium uppercase text-green-500">
            About carbonquest
          </h1>
          <p className='mt-4 max-w-[50rem]'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
            dolorum, suscipit aperiam ut, repellendus totam quo ex saepe laborum
            eaque eveniet explicabo odio accusantium optio facilis, doloribus
            beatae sint quae quasi itaque voluptates maxime non similique. Earum
            sunt accusantium magnam quod omnis? Inventore, labore repellat
            repudiandae minus praesentium quam at!
          </p>
        </div>
      </section>

      <section>

      </section>

      <Footer />
    </>
  );
}
