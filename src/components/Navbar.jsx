"use client";

import { useEffect, useRef, useState } from "react";
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

const SAMPLE_Y = 40;

// A "transparent" element doesn't actually paint anything at this pixel —
// so we should see through it to whatever is really behind it, instead of
// trusting its data-navbar tag (fixes floating/overlapping sections that
// have no background of their own, e.g. negative-margin card grids).
function isTransparent(el) {
    const cs = getComputedStyle(el);
    const bg = cs.backgroundColor;
    const hasBgColor =
        bg && bg !== "transparent" && !/rgba?\(0,\s*0,\s*0,\s*0\)/.test(bg);
    const hasBgImage = cs.backgroundImage && cs.backgroundImage !== "none";
    return !hasBgColor && !hasBgImage;
}

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [dark, setDark] = useState(true);
    const navRef = useRef(null);

    useEffect(() => {
        const checkBackground = () => {
            const navEl = navRef.current;
            let stack = [];

            if (navEl) {
                const prev = navEl.style.pointerEvents;
                navEl.style.pointerEvents = "none";
                stack = document.elementsFromPoint(window.innerWidth / 2, SAMPLE_Y);
                navEl.style.pointerEvents = prev;
            } else {
                stack = document.elementsFromPoint(window.innerWidth / 2, SAMPLE_Y);
            }

            let theme = null;

            for (const el of stack) {
                if (isTransparent(el)) continue; // see through it to what's behind
                const themed = el.closest("[data-navbar]");
                if (themed) theme = themed.getAttribute("data-navbar");
                break; // first opaque thing we hit — stop here either way
            }

            // Last-resort fallback: body's tag, even if technically "transparent"
            if (!theme) {
                theme = document.body.getAttribute("data-navbar");
            }

            if (theme) setDark(theme !== "light");
        };

        checkBackground();
        window.addEventListener("scroll", checkBackground, { passive: true });
        window.addEventListener("resize", checkBackground);
        window.addEventListener("load", checkBackground);

        const raf1 = requestAnimationFrame(checkBackground);
        const timeout1 = setTimeout(checkBackground, 300);
        const timeout2 = setTimeout(checkBackground, 1000);

        return () => {
            window.removeEventListener("scroll", checkBackground);
            window.removeEventListener("resize", checkBackground);
            window.removeEventListener("load", checkBackground);
            cancelAnimationFrame(raf1);
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };
    }, []);

    return (
        <nav ref={navRef} className="fixed inset-x-0 top-0 z-30 w-full font-sans">
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