import Link from "next/link";
import {ArrowDown02Icon} from 'hugeicons-react'
import FAQs from "@/components/Faq";

export default function Home() {
  return (
    <>
      <section className="bg-neutral-900 text-white h-screen relative">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="text-6xl font-semibold font-protest uppercase text-center tracking-wider leading-[4rem]">
            <h1 className="flex items-center justify-center gap-2">
              Mindful{" "}
              <p className="px-5 py-1 bg-white rounded-2xl">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <g clip-path="url(#clip0_104_69)">
                    {" "}
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M120 14.2857C120 6.39593 113.604 0 105.714 0H94.2857C86.3959 0 80 6.39594 80 14.2857V17.2269C80 29.9541 64.6123 36.3279 55.6128 27.3284L53.533 25.2487C47.9541 19.6698 38.9089 19.6698 33.3299 25.2487L25.2487 33.3299C19.6698 38.9088 19.6698 47.954 25.2487 53.533L27.3285 55.6128C36.328 64.6123 29.9542 80 17.227 80H14.2857C6.39593 80 0 86.3959 0 94.2857V105.714C0 113.604 6.39593 120 14.2857 120H17.2269C29.9542 120 36.328 135.388 27.3285 144.387L25.2487 146.467C19.6698 152.046 19.6698 161.091 25.2487 166.67L33.3299 174.751C38.9089 180.33 47.9541 180.33 53.533 174.751L55.6128 172.671C64.6122 163.672 80 170.046 80 182.773V185.714C80 193.604 86.3959 200 94.2857 200H105.714C113.604 200 120 193.604 120 185.714V182.773C120 170.046 135.388 163.672 144.387 172.671L146.467 174.751C152.046 180.33 161.091 180.33 166.67 174.751L174.751 166.67C180.33 161.091 180.33 152.046 174.751 146.467L172.672 144.387C163.672 135.388 170.046 120 182.773 120H185.714C193.604 120 200 113.604 200 105.714V94.2857C200 86.3959 193.604 80 185.714 80H182.773C170.046 80 163.672 64.6123 172.671 55.6128L174.751 53.5329C180.33 47.954 180.33 38.9088 174.751 33.3299L166.67 25.2487C161.091 19.6697 152.046 19.6697 146.467 25.2487L144.387 27.3284C135.388 36.3279 120 29.9541 120 17.2269V14.2857Z"
                      fill="url(#paint0_linear_104_69)"
                    />{" "}
                  </g>{" "}
                  <defs>
                    {" "}
                    <linearGradient
                      id="paint0_linear_104_69"
                      x1="14"
                      y1="26"
                      x2="179"
                      y2="179.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      {" "}
                      <stop stop-color="#ec4899" />{" "}
                      <stop offset="1" stop-color="#facc15" />{" "}
                    </linearGradient>{" "}
                    <clipPath id="clip0_104_69">
                      {" "}
                      <rect width="200" height="200" fill="white" />{" "}
                    </clipPath>{" "}
                  </defs>{" "}
                </svg>
              </p>
              <span className="text-green-400">Choices,</span>
            </h1>

            <h1>
              Lasting <span className="text-yellow-400">Impact,</span>
            </h1>

            <h1 className="text-pink-400 flex items-center justify-center gap-3">
              Track, Reduce <span className="text-white">and</span>
            </h1>

            <h1 className="flex items-center gap-2">
              Make a{" "}
              <p className="border-2 px-7 rounded-2xl py-1 bg-yellow-50">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <g clip-path="url(#clip0_103_9)">
                    {" "}
                    <path
                      d="M89.9318 6.12863C94.1569 -2.04288 105.843 -2.04288 110.068 6.12863L136.973 58.1644C138.051 60.2496 139.75 61.9486 141.836 63.0268L193.871 89.9318C202.043 94.1569 202.043 105.843 193.871 110.068L141.836 136.973C139.75 138.051 138.051 139.75 136.973 141.836L110.068 193.871C105.843 202.043 94.1569 202.043 89.9318 193.871L63.0268 141.836C61.9486 139.75 60.2496 138.051 58.1644 136.973L6.12863 110.068C-2.04288 105.843 -2.04288 94.1569 6.12863 89.9318L58.1644 63.0268C60.2496 61.9486 61.9486 60.2496 63.0268 58.1644L89.9318 6.12863Z"
                      fill="url(#paint0_linear_103_9)"
                    />{" "}
                  </g>{" "}
                  <defs>
                    {" "}
                    <linearGradient
                      id="paint0_linear_103_9"
                      x1="100"
                      y1="0"
                      x2="100"
                      y2="200"
                      gradientUnits="userSpaceOnUse"
                    >
                      {" "}
                      <stop stop-color="#facc15" />{" "}
                      <stop offset="1" stop-color="#86efac" />{" "}
                    </linearGradient>{" "}
                    <clipPath id="clip0_103_9">
                      {" "}
                      <rect width="200" height="200" fill="white" />{" "}
                    </clipPath>{" "}
                  </defs>{" "}
                </svg>
              </p>{" "}
              <span className="text-blue-400">difference</span>.
            </h1>
          </div>

          <div className="font-medium absolute bottom-10 flex overflow-hidden gap-4 items-center border-2 shadow rounded-2xl bg-neutral-100 text-neutral-700 font-mono">
            <p className="px-6 py-2">Start tracking now</p>
            <Link
              href="/signup"
              className="border-l px-4 py-2 bg-green-400 text-green-900 uppercase font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className='absolute right-10 bottom-10 rounded-full border-2 bg-white text-black p-2 animate-bounce'>
          <ArrowDown02Icon />
        </div>
      </section>

      <section className='h-screen flex flex-col items-center justify-center'>
        <div className='h-[30rem] w-[50rem] bg-neutral-200'></div>
        <div className='flex my-10 items-center'>
          <h1 className='text-4xl font-semibold font-playfair font-medium px-12'>Why CarbonQuest?</h1>
          <div className='text-neutral-600 px-12 max-w-[45rem] border-l py-4'>
            <h2 className='font-semibold'><span className='font-medium'>Track and Analyze Your Carbon Emissions: </span> Get detailed insights into your carbon footprint by logging daily activities such as</h2>
            <ul className='list-disc ml-4 mt-3 text-neutral-500'>
              <li>Transportation</li>
              <li>Energy use</li>
              <li>Food Consumption, and more.</li>
            </ul>
          </div>
        </div>
      </section>

      <FAQs />
    </>
  );
}
