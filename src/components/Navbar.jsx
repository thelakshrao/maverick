"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../images/logo.png";

const navItems = [
    { label: "Product", href: "/product" },
    { label: "Verify Code", href: "/verify-code" },
    { label: "Calculator", href: "/calculator" },
    { label: "Contact us", href: "/contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="absolute inset-x-0 top-0 z-30 w-full font-sans">
            <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-10">
                {/* logo — left */}
                <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
                    <Image
                        src={logo}
                        alt="Logo"
                        className="h-9 w-auto object-contain"
                        priority
                    />
                </Link>

                {/* nav items — desktop floating pill, unchanged */}
                <ul className="hidden md:flex items-center gap-8 rounded-full border border-black/10 bg-white/70 px-8 py-3 shadow-sm backdrop-blur-md">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <Link
                                href={item.href}
                                className="relative text-sm font-medium text-black/80 transition-colors duration-150 hover:text-black after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-200 hover:after:w-full"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* hamburger — mobile only */}
                <button
                    type="button"
                    aria-label="Toggle menu"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                    className="md:hidden flex h-10 w-10 items-center justify-center rounded-full  cursor-pointer"
                >
                    <div className="flex flex-col items-center justify-center gap-[5px]">
                        <span
                            className={`block h-[2px] w-5 bg-white transition-all duration-200 ${open ? "translate-y-[7px] rotate-45" : ""
                                }`}
                        />
                        <span
                            className={`block h-[2px] w-5 bg-white transition-all duration-200 ${open ? "opacity-0" : "opacity-100"
                                }`}
                        />
                        <span
                            className={`block h-[2px] w-5 bg-white transition-all duration-200 ${open ? "-translate-y-[7px] -rotate-45" : ""
                                }`}
                        />
                    </div>
                </button>
            </div>

            {/* mobile dropdown menu */}
            <div
                className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <ul className="mx-5 mb-4 flex flex-col gap-1 rounded-2xl border border-black/10 bg-white/90 p-4 shadow-lg backdrop-blur-md">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <Link
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="block rounded-xl px-3 py-3 text-sm font-medium text-black/80 transition-colors duration-150 hover:bg-black/5 hover:text-black"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}