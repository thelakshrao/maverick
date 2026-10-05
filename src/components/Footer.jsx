import Image from "next/image";
import Link from "next/link";

import logo from "@/images/logo.png";
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
    { label: "All products", href: "/products" },
    ...categories
        .filter((c) => c !== "All")
        .map((c) => ({
            label: c,
            href: `/products?category=${encodeURIComponent(c)}`,
        })),
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            data-navbar="dark"
            className="relative overflow-hidden bg-gradient-to-br from-[#050b2e] via-[#12306e] to-[#1b3f8c]"
        >
            {/* CSS radial gradients replace the blur-3xl divs and styleproduct1 decorative image
                — eliminates two large paint layers and an unnecessary image request */}
            <div
                className="pointer-events-none absolute inset-0"
                aria-hidden
                style={{
                    background:
                        "radial-gradient(ellipse 50% 60% at -5% 0%, rgba(91,141,239,0.22) 0%, transparent 80%), radial-gradient(ellipse 40% 50% at 105% 100%, rgba(63,126,232,0.18) 0%, transparent 70%)",
                }}
            />

            <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-10 md:pt-20">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2.5">
                            <Image
                                src={logo}
                                alt="Maverick Lab"
                                className="h-20 w-auto"
                                priority
                            />
                            <span className="text-lg font-bold tracking-tight text-white">
                                Maverick
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
                        <p>&copy; {year} Maverick Lab. All rights reserved.</p>
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