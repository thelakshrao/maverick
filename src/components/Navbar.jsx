"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../images/logo.png";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Product", href: "/product" },
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
const THROTTLE_MS = 100; // ~10 checks/sec — cheap enough to run forever

function isTransparent(el) {
    const cs = getComputedStyle(el);
    const bg = cs.backgroundColor;
    const hasBgColor =
        bg && bg !== "transparent" && !/rgba?\(0,\s*0,\s*0,\s*0\)/.test(bg);
    const hasBgImage = cs.backgroundImage && cs.backgroundImage !== "none";
    return !hasBgColor && !hasBgImage;
}

const HIDE_THRESHOLD_PX = 80; // don't start hiding until scrolled past this
const HIDE_DELTA_PX = 4; // ignore tiny/jittery scroll deltas

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [dark, setDark] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const navRef = useRef(null);
    const openRef = useRef(open);
    const lastScrollY = useRef(0);
    const pathname = usePathname();

    useEffect(() => {
        openRef.current = open;
        // Never stay hidden while the mobile menu is open.
        if (open) setHidden(false);
    }, [open]);

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

            if (!openRef.current) {
                if (currentY <= HIDE_THRESHOLD_PX) {
                    setHidden(false);
                } else if (currentY > lastScrollY.current + HIDE_DELTA_PX) {
                    setHidden(true); // scrolling down — hide
                } else if (currentY < lastScrollY.current - HIDE_DELTA_PX) {
                    setHidden(false); // scrolling up — reveal
                }
            }

            lastScrollY.current = currentY;
        };

        const update = () => {
            checkBackground();
            checkScroll();
        };

        // Instead of guessing when layout has "settled" (after images load,
        // after animations finish, after resize), we just keep checking on
        // a cheap loop for as long as the navbar is mounted. This makes the
        // navbar self-correct immediately after ANY layout shift — image
        // load, font load, animation, resize — without ever needing the
        // user to scroll to "wake it up".
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

        // Still listen for scroll directly (not throttled) so fast scrolls
        // feel instant rather than snapping on the next 100ms tick.
        window.addEventListener("scroll", update, { passive: true });

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("scroll", update);
        };
    }, []);

    // Once the navbar has its own translucent background (after scrolling),
    // force the dark/light text scheme to match that background rather than
    // whatever section happens to be behind it — otherwise a white logo
    // could land on a near-white bar and disappear.
    const effectiveDark = dark && !scrolled;

    // Clicking a link to the page you're already on doesn't trigger a Next.js
    // navigation (no route change means no scroll restoration), so it just
    // sits wherever you were scrolled to. This intercepts that one case and
    // scrolls to top manually; any other link still navigates normally.
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
                        <li key={item.label}>
                            <Link
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
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
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}