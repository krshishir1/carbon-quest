import Link from "next/link";

export default function Header() {
    return (
        <header className='px-[13rem] py-3 border-b sticky top-0 bg-white'>
            <div className='flex items-center justify-between'>
                <Link href='' className='font-playfair font-medium text-xl'>CarbonQuest</Link>
                <div className='flex items-center gap-4'>
                    <Link href=''>Login</Link>
                    <Link href='' className='bg-grad px-5 py-2 rounded-3xl font-medium text-white'>Sign Up</Link>
                </div>
            </div>
        </header>
    )
}