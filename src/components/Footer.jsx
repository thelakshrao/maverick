import Image from "next/image";
import Link from "next/link";

import logo from "@/images/logo.png";
import styleproduct1 from "@/images/styleproduct1.png";
import { categories } from "@/data/products";

const LINK_COLUMNS = [
    {
        heading: "Links",
        links: [
            { label: "About", href: "/about" },
            { label: "Quality", href: "/quality" },
            { label: "Verify Code", href: "/verify-code" },
            { label: "Calculator", href: "/calculator" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        heading: "Legal",
        links: [
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
        ],
    },
];

// Products column is built from real category data, not hardcoded —
// add "Peptides" (or anything else) to `categories` in data/products.js
// and it shows up here automatically, with no dead links.
const productLinks = [
    { label: "All products", href: "/product" },
    ...categories
        .filter((c) => c !== "All")
        .map((c) => ({
            label: c,
            href: `/product?category=${encodeURIComponent(c)}`,
        })),
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            data-navbar="dark"
            className="relative overflow-hidden bg-gradient-to-br from-[#050b2e] via-[#12306e] to-[#1b3f8c]"
        >
            <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden>
                <Image
                    src={styleproduct1}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-[80%_center]"
                />
            </div>

            <div
                className="pointer-events-none absolute -left-24 top-0 h-[360px] w-[360px] rounded-full bg-[#5b8def]/20 blur-3xl"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-[#3f7ee8]/20 blur-3xl"
                aria-hidden
            />

            <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-10 md:pt-20">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2.5">
                            <Image
                                src={logo}
                                alt="Maveric Lab"
                                className="h-20 w-auto"
                                priority
                            />
                            <span className="text-lg font-bold tracking-tight text-white">
                                MAVERIC
                            </span>
                        </Link>
                        <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
                            Formulated to the standard athletes and coaches train by —
                            verified batch by batch, so what&apos;s on the label is
                            exactly what&apos;s in the vial.
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#8fb8ff]">
                            Products
                        </p>
                        <ul className="mt-5 space-y-3.5">
                            {productLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/65 transition-colors duration-150 hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {LINK_COLUMNS.map((column) => (
                        <div key={column.heading}>
                            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#8fb8ff]">
                                {column.heading}
                            </p>
                            <ul className="mt-5 space-y-3.5">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-white/65 transition-colors duration-150 hover:text-white"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-14 border-t border-white/10 pt-6">
                    <div className="flex flex-col gap-3 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
                        <p>&copy; {year} Maveric Lab. All rights reserved.</p>
                        <p>
                            Based in Malta. For investigational use. Not all products
                            are available in all regions.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}