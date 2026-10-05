"use client";

import Link from "next/link";
import Image from "next/image";
import { m, LazyMotion, domAnimation } from "framer-motion";
import oilsFeatured from "@/images/category/oils-featured.png";
import oralsFeatured from "@/images/category/orals-featured.png";
import peptidesFeatured from "@/images/peptides/hgh-100.png";
import { products } from "@/data/products";

const EASE = [0.16, 1, 0.3, 1];

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const rise = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const CATEGORY_TILES = [
    {
        category: "Orals",
        image: oralsFeatured,
        description: "Precision-dosed tablets, formulated for every protocol.",
    },
    {
        category: "Oils",
        image: oilsFeatured,
        description: "Sterile multi-dose vials with verified concentration.",
    },
    {
        category: "Peptides",
        image: peptidesFeatured,
        description: "Lyophilized vials, batch-verified for identity and purity.",
    },
];

export default function Product() {
    return (
        <LazyMotion features={domAnimation}>
            <section
                id="products"
                className="relative bg-[#eef1f6] py-24 sm:py-28"
            >
                <div className="mx-auto max-w-6xl px-6 sm:px-10">
                    <m.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={container}
                        className="max-w-2xl"
                    >
                        <m.p
                            variants={rise}
                            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3459c9]"
                        >
                            Our Products
                        </m.p>
                        <m.h2
                            variants={rise}
                            className="mt-4 text-4xl font-bold tracking-tight text-[#0b1a4a] sm:text-5xl"
                        >
                            Every form,{" "}
                            <span className="bg-gradient-to-r from-[#3459c9] to-[#7aa2ff] bg-clip-text text-transparent">
                                one
                            </span>{" "}
                            standard.
                        </m.h2>
                    </m.div>

                    <m.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={container}
                        className="mt-24 grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {CATEGORY_TILES.map(({ category, image, description }) => {
                            const count = products.filter((p) => p.category === category).length;
                            return (
                                <m.div key={category} variants={rise}>
                                    <Link
                                        href={`/products?category=${encodeURIComponent(category)}`}
                                        className="group relative isolate block rounded-3xl border border-[#e4e7f3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,64,0.04)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(16,24,64,0.10)]"
                                    >
                                        <div className="relative mx-auto -mt-20 h-72 w-full max-w-[300px] sm:h-80">
                                            <div
                                                aria-hidden
                                                className="absolute inset-x-6 bottom-0 -z-10 h-48 rounded-full bg-gradient-to-t from-[#3459c9]/50 via-[#5b7be0]/30 to-transparent blur-2xl"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 h-52 rounded-2xl border border-[#dfe3f5] bg-gradient-to-b from-[#f3f4fb] to-[#e6ebfb] sm:h-56" />
                                            <Image
                                                src={image}
                                                alt={category}
                                                fill
                                                sizes="300px"
                                                className="object-contain object-center p-2 drop-shadow-[0_20px_26px_rgba(52,89,201,0.25)] transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                                            />
                                        </div>

                                        <div className="mt-6 px-1">
                                            <div className="flex items-baseline justify-between gap-4">
                                                <h3 className="text-2xl font-bold text-[#0b1a4a]">
                                                    {category}
                                                </h3>
                                                <span className="text-sm text-[#7079a0]">
                                                    {count} products
                                                </span>
                                            </div>
                                            <p className="mt-2 text-base leading-relaxed text-[#4a5578]">
                                                {description}
                                            </p>
                                            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#3459c9]">
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
                                </m.div>
                            );
                        })}
                    </m.div>
                </div>
            </section>
        </LazyMotion>
    );
}