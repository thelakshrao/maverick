"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

const EASE = [0.16, 1, 0.3, 1];

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const rise = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const oilsOnly = products.filter((p) => p.category === "Oils");

// Truncate a description to a two-line-ish excerpt, same treatment
// Quanta uses on its listing cards.
function excerpt(text, max = 92) {
    if (text.length <= max) return text;
    return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

export default function ProductsPage() {
    return (
        <main data-navbar="light" className="min-h-screen bg-[#f6f7fb]">
            <Navbar />

            <section className="mx-auto max-w-7xl px-6 pt-28 pb-24 sm:px-10 md:pt-36">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={container}
                    className="max-w-2xl"
                >
                    <motion.p
                        variants={rise}
                        className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3459c9]"
                    >
                        Injectable Oils
                    </motion.p>
                    <motion.h1
                        variants={rise}
                        className="mt-4 text-4xl font-bold text-[#0b1a4a] sm:text-5xl"
                    >
                        Pharmaceutical-grade oil compounds
                    </motion.h1>
                    <motion.p
                        variants={rise}
                        className="mt-4 text-base leading-relaxed text-[#4a5578]"
                    >
                        Every batch is HPLC-tested for identity, purity, and concentration
                        before release. USP/BP grade raw materials, multi-dose sterile
                        vials, tamper-evident seals. Choose a product to see full specs.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={container}
                    className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {oilsOnly.map((oil) => (
                        <motion.div key={oil.id} variants={rise}>
                            <Link
                                href={`/products/${oil.id}`}
                                className="group flex h-full flex-col rounded-3xl border border-[#e4e7f3] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,64,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(16,24,64,0.10)]"
                            >
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white">
                                    <Image
                                        src={oil.image}
                                        alt={`${oil.name} — ${oil.compound}`}
                                        fill
                                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                        className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                                    />
                                </div>

                                <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-[#3459c9]">
                                        Oils
                                    </p>
                                    <h3 className="mt-1 text-lg font-bold text-[#0b1a4a]">
                                        {oil.name}
                                    </h3>
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5b6488]">
                                        {excerpt(oil.description)}
                                    </p>
                                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#3459c9]">
                                        View
                                        <span
                                            aria-hidden
                                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                                        >
                                            →
                                        </span>
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}