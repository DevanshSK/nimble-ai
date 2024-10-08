import Image from "next/image";
import Link from "next/link";
import React from "react";


const Navbar = () => {
    return (
        <div className="sticky top-0 bg-white flex gap-5 justify-between items-center px-7 py-1 font-bold border-b border-solid border-zinc-100 leading-[154.5%] max-md:flex-wrap max-md:px-5">
            <div className="flex gap-1.5 justify-center self-stretch my-auto text-2xl tracking-tighter text-neutral-700">
                <Image
                    src="/images/logo.png"
                    alt="Logo"
                    sizes="100vw"
                    style={{
                        width: "100px",
                        height: "auto",
                    }}
                    width={0}
                    height={0}
                />
            </div>
            <ul className="gap-5 justify-between self-stretch my-auto text-sm leading-5 text-neutral-700 max-md:flex-wrap max-md:max-w-full font-normal hidden md:flex">
                <li>Home</li>
                <li>Pricing</li>
                <li>News Room</li>
                <li>Features</li>
                <li>Contact us</li>
            </ul>
            <Link className="bg-orange px-4 py-2 rounded-sm text-white" href="/dashboard">Free Trial</Link>
        </div>
    )
}

export default Navbar;