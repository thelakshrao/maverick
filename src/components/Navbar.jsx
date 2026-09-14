"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import logo from "../images/logo.png";

const navItems = [
    { label: "Product", href: "/product" },
    { label: "Verify Code", href: "/verify-code" },
    { label: "Calculator", href: "/calculator" },
    { label: "Contact us", href: "/contact" },
];

const LOGO_HEIGHT = 36;
const LOGO_ASPECT = logo.width / logo.height;
const LOGO_WIDTH = LOGO_HEIGHT * LOGO_ASPECT;

// How far down from the top of the viewport we "sample" to decide what's
// behind the navbar — roughly the vertical middle of the navbar itself.
const SAMPLE_Y = 40;

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [dark, setDark] = useState(true); // true = on a dark bg, show white logo

    useEffect(() => {
        const checkBackground = () => {
            // Temporarily ignore pointer events on the nav so elementFromPoint
            // can see through it to the section actually behind it.
            const el = document.elementFromPoint(window.innerWidth / 2, SAMPLE_Y);
            if (!el) return;
            const themed = el.closest("[data-navbar]");
            const theme = themed?.getAttribute("data-navbar");
            setDark(theme !== "light");
        };

        checkBackground();
        window.addEventListener("scroll", checkBackground, { passive: true });
        window.addEventListener("resize", checkBackground);
        return () => {
            window.removeEventListener("scroll", checkBackground);
            window.removeEventListener("resize", checkBackground);
        };
    }, []);

    return (
        <nav className="fixed inset-x-0 top-0 z-30 w-full font-sans">
            <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-10">
                <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
                    <span
                        role="img"
                        aria-label="Logo"
                        className="transition-colors duration-300"
                        style={{
                            display: "inline-block",
                            width: LOGO_WIDTH,
                            height: LOGO_HEIGHT,
                            backgroundColor: dark ? "#ffffff" : "#12306e",
                            WebkitMaskImage: `url(${logo.src})`,
                            maskImage: `url(${logo.src})`,
                            WebkitMaskSize: "contain",
                            maskSize: "contain",
                            WebkitMaskRepeat: "no-repeat",
                            maskRepeat: "no-repeat",
                            WebkitMaskPosition: "center",
                            maskPosition: "center",
                        }}
                    />
                </Link>

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

                <button
                    type="button"
                    aria-label="Toggle menu"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                    className="md:hidden flex h-10 w-10 items-center justify-center rounded-full cursor-pointer"
                >
                    <div className="flex flex-col items-center justify-center gap-[5px]">
                        <span
                            className={`block h-[2px] w-5 transition-all duration-200 ${dark ? "bg-white" : "bg-[#12306e]"
                                } ${open ? "translate-y-[7px] rotate-45" : ""}`}
                        />
                        <span
                            className={`block h-[2px] w-5 transition-all duration-200 ${dark ? "bg-white" : "bg-[#12306e]"
                                } ${open ? "opacity-0" : "opacity-100"}`}
                        />
                        <span
                            className={`block h-[2px] w-5 transition-all duration-200 ${dark ? "bg-white" : "bg-[#12306e]"
                                } ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
                        />
                    </div>
                </button>
            </div>

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