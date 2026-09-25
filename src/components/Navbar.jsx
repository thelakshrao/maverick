"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../images/logo.png";
import { categories } from "@/data/products";

const navItems = [
    { label: "Home", href: "/" },
    {
        label: "Products",
        href: "/products",
        dropdown: [
            { label: "All Products", href: "/products" },
            ...categories
                .filter((c) => c !== "All")
                .map((c) => ({
                    label: c,
                    href: `/products?category=${encodeURIComponent(c)}`,
                })),
        ],
    },
    { label: "Quality", href: "/quality" },
    { label: "About", href: "/about" },
    { label: "Verify Code", href: "/verify-code" },
    { label: "Calculator", href: "/calculator" },
    { label: "Contact us", href: "/contact" },
];

const LOGO_HEIGHT = 86;
const LOGO_ASPECT = logo.width / logo.height;
const LOGO_WIDTH = LOGO_HEIGHT * LOGO_ASPECT;

const SAMPLE_Y = 40;
const THROTTLE_MS = 100;

function isTransparent(el) {
    const cs = getComputedStyle(el);
    const bg = cs.backgroundColor;
    const hasBgColor =
        bg && bg !== "transparent" && !/rgba?\(0,\s*0,\s*0,\s*0\)/.test(bg);
    const hasBgImage = cs.backgroundImage && cs.backgroundImage !== "none";
    return !hasBgColor && !hasBgImage;
}

const HIDE_THRESHOLD_PX = 80;
const HIDE_DELTA_PX = 4;

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [dark, setDark] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
    const navRef = useRef(null);
    const openRef = useRef(open);
    // Mirrors openDropdown so the scroll-driven auto-hide loop (which runs
    // outside React's render cycle, inside a rAF callback) can check "is a
    // desktop dropdown currently open" without going stale. Without this,
    // the navbar could slide itself off-screen out from under an open
    // dropdown on the very next scroll tick — including a tiny residual
    // momentum-scroll tick that fires after the user has already stopped
    // scrolling and started moving the mouse toward the panel.
    const openDropdownRef = useRef(null);
    const lastScrollY = useRef(0);
    const pathname = usePathname();

    useEffect(() => {
        openRef.current = open;
        if (open) setHidden(false);
    }, [open]);

    useEffect(() => {
        openDropdownRef.current = openDropdown;
        if (openDropdown) setHidden(false);
    }, [openDropdown]);

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
                if (isTransparent(el)) continue;
                const themed = el.closest("[data-navbar]");
                if (themed) theme = themed.getAttribute("data-navbar");
                break;
            }

            if (!theme) {
                theme = document.body.getAttribute("data-navbar");
            }

            if (theme) {
                setDark((prevDark) => {
                    const nextDark = theme !== "light";
                    return prevDark === nextDark ? prevDark : nextDark;
                });
            }
        };

        const checkScroll = () => {
            const currentY = window.scrollY;

            setScrolled(currentY > 20);

            // Never let the navbar hide itself while the mobile menu OR a
            // desktop dropdown is open — otherwise a scroll tick (including
            // trackpad momentum settling after the user has already lifted
            // their fingers) can slide the whole nav away mid-hover.
            if (!openRef.current && !openDropdownRef.current) {
                if (currentY <= HIDE_THRESHOLD_PX) {
                    setHidden(false);
                } else if (currentY > lastScrollY.current + HIDE_DELTA_PX) {
                    setHidden(true);
                } else if (currentY < lastScrollY.current - HIDE_DELTA_PX) {
                    setHidden(false);
                }
            }

            lastScrollY.current = currentY;
        };

        const update = () => {
            checkBackground();
            checkScroll();
        };

        let rafId;
        let lastRun = 0;

        const loop = (time) => {
            if (time - lastRun >= THROTTLE_MS) {
                update();
                lastRun = time;
            }
            rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);

        window.addEventListener("scroll", update, { passive: true });

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("scroll", update);
        };
    }, []);

    const effectiveDark = dark && !scrolled;

    function handleNavClick(e, href) {
        if (pathname === href) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    return (
        <nav
            ref={navRef}
            className={`fixed inset-x-0 top-0 z-30 w-full font-sans transition-[transform,background-color,backdrop-filter,box-shadow] duration-300 ease-out ${hidden ? "-translate-y-full" : "translate-y-0"
                } ${scrolled
                    ? "bg-white/70 backdrop-blur-md shadow-sm"
                    : "bg-transparent"
                }`}
        >
            <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-10">
                <Link
                    href="/"
                    className="flex items-center"
                    onClick={(e) => {
                        setOpen(false);
                        handleNavClick(e, "/");
                    }}
                >
                    <span
                        role="img"
                        aria-label="Logo"
                        className="transition-colors duration-300"
                        style={{
                            display: "inline-block",
                            width: LOGO_WIDTH,
                            height: LOGO_HEIGHT,
                            backgroundColor: effectiveDark ? "#ffffff" : "#12306e",
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
                        <li
                            key={item.label}
                            className="relative"
                            onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                            onMouseLeave={() => item.dropdown && setOpenDropdown(null)}
                        >
                            <Link
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className="relative flex items-center gap-1 text-sm font-medium text-black/80 transition-colors duration-150 hover:text-black after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-200 hover:after:w-full"
                            >
                                {item.label}
                                {item.dropdown && (
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className={`h-3 w-3 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`}
                                    >
                                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </Link>

                            {item.dropdown && (
                                // The outer element owns positioning AND a
                                // top padding (not a margin) that closes the
                                // gap to the trigger. Because it's padding,
                                // it's part of this element's own hit-testable
                                // box, so the mouse never crosses "dead"
                                // space between the link and the panel on
                                // its way down — eliminating the other way
                                // this dropdown could lose hover and close
                                // before the user reaches it.
                                <div
                                    className={`absolute left-1/2 top-full w-48 -translate-x-1/2 pt-3 transition-all duration-200 ease-out ${openDropdown === item.label
                                        ? "pointer-events-auto translate-y-0 opacity-100"
                                        : "pointer-events-none -translate-y-1 opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white/95 shadow-lg backdrop-blur-md">
                                        <ul className="py-2">
                                            {item.dropdown.map((sub) => (
                                                <li key={sub.label}>
                                                    <Link
                                                        href={sub.href}
                                                        onClick={() => setOpenDropdown(null)}
                                                        className="block px-4 py-2.5 text-sm text-black/70 transition-colors duration-150 hover:bg-black/5 hover:text-black"
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
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
                            className={`block h-[2px] w-5 transition-all duration-200 ${effectiveDark ? "bg-white" : "bg-[#12306e]"
                                } ${open ? "translate-y-[7px] rotate-45" : ""}`}
                        />
                        <span
                            className={`block h-[2px] w-5 transition-all duration-200 ${effectiveDark ? "bg-white" : "bg-[#12306e]"
                                } ${open ? "opacity-0" : "opacity-100"}`}
                        />
                        <span
                            className={`block h-[2px] w-5 transition-all duration-200 ${effectiveDark ? "bg-white" : "bg-[#12306e]"
                                } ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
                        />
                    </div>
                </button>
            </div>

            <div
                className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${open ? "max-h-[75vh] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <ul className="mx-5 mb-4 flex max-h-[70vh] flex-col gap-1 overflow-y-auto rounded-2xl border border-black/10 bg-white/90 p-4 shadow-lg backdrop-blur-md">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            {item.dropdown ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenMobileDropdown((v) =>
                                                v === item.label ? null : item.label
                                            )
                                        }
                                        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-black/80 transition-colors duration-150 hover:bg-black/5 hover:text-black"
                                    >
                                        {item.label}
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className={`h-3.5 w-3.5 transition-transform duration-200 ${openMobileDropdown === item.label ? "rotate-180" : ""
                                                }`}
                                        >
                                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <div
                                        className={`overflow-hidden pl-3 transition-[max-height,opacity] duration-200 ease-out ${openMobileDropdown === item.label
                                            ? "max-h-60 opacity-100"
                                            : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        {item.dropdown.map((sub) => (
                                            <Link
                                                key={sub.label}
                                                href={sub.href}
                                                onClick={() => {
                                                    setOpen(false);
                                                    setOpenMobileDropdown(null);
                                                }}
                                                className="block rounded-xl px-3 py-2.5 text-sm text-black/65 transition-colors duration-150 hover:bg-black/5 hover:text-black"
                                            >
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <Link
                                    href={item.href}
                                    onClick={(e) => {
                                        setOpen(false);
                                        handleNavClick(e, item.href);
                                    }}
                                    className="block rounded-xl px-3 py-3 text-sm font-medium text-black/80 transition-colors duration-150 hover:bg-black/5 hover:text-black"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}