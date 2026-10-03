"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { m, LazyMotion, domAnimation } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleLogo from "@/components/ParticleLogo";
import logoIcon from "@/images/logo1.png";
import oilsFeatured from "@/images/category/oils-featured.png";
import oralsFeatured from "@/images/category/orals-featured.png";
import { products, categories } from "@/data/products";

const EASE = [0.16, 1, 0.3, 1];
const PAGE_SIZE = 10;

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const rise = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function excerpt(text, max = 92) {
    if (text.length <= max) return text;
    return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function shuffle(arr) {
    const out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
}

const CATEGORY_TILES = [
    { category: "Oils", image: oilsFeatured },
    { category: "Orals", image: oralsFeatured },
];

const CATEGORY_COPY = {
    Oils: {
        eyebrow: "Injectable Oils",
        title: "Pharmaceutical-grade oil compounds",
        intro:
            "Every batch is verified via high-performance liquid chromatography for identity, purity, and concentration before release. United States Pharmacopeia and British Pharmacopoeia grade raw materials, multi-dose sterile vials, tamper-evident seals.",
    },
    Orals: {
        eyebrow: "Oral Compounds",
        title: "Pharmaceutical-grade oral tablets",
        intro:
            "Every batch is verified via high-performance liquid chromatography for identity, purity, and concentration before release. Precision-dosed tablets, tamper-evident packaging, full batch traceability.",
    },
};

const DEFAULT_COPY = {
    eyebrow: "Our Products",
    title: "Every form, one standard.",
    intro:
        "Precision-dosed products formulated for real protocols and verified in every batch. Every compound is manufactured under strict quality controls, tested by high-performance liquid chromatography for identity, purity, and concentration, and released only after it meets our specification. Sterile multi-dose vials and precision-dosed tablets are sealed with tamper-evident packaging, and every batch is fully traceable from raw material to finished product. Whether you are looking for injectable oils or oral tablets, each product page lists the compound, strength, and presentation so you know exactly what you are getting. Choose a category to explore the range, or search by name or compound to find something specific.",
};

function Pagination({ page, totalPages, onChange }) {
    if (totalPages <= 1) return null;

    return (
        <div className="mt-10 flex items-center justify-center gap-2">
            <button
                type="button"
                onClick={() => onChange(Math.max(1, page - 1))}
                disabled={page === 1}
                aria-label="Previous page"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e4e7f3] bg-white text-[#0b1a4a] transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:not-disabled:bg-[#eef1fb]"
            >
                ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                    key={n}
                    type="button"
                    onClick={() => onChange(n)}
                    aria-current={n === page ? "page" : undefined}
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${n === page
                        ? "bg-[#3459c9] text-white"
                        : "border border-[#e4e7f3] bg-white text-[#0b1a4a] hover:bg-[#eef1fb]"
                        }`}
                >
                    {n}
                </button>
            ))}
            <button
                type="button"
                onClick={() => onChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e4e7f3] bg-white text-[#0b1a4a] transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:not-disabled:bg-[#eef1fb]"
            >
                ›
            </button>
        </div>
    );
}

function ProductCard({ product }) {
    return (
        <m.div variants={rise}>
            <Link
                href={`/products/${product.id}`}
                className="group flex h-full flex-col rounded-3xl border border-[#e4e7f3] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,64,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(16,24,64,0.10)]"
            >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white">
                    <Image
                        src={product.image}
                        alt={`${product.name} — ${product.compound}`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                </div>
                <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#3459c9]">
                        {product.category}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-[#0b1a4a]">
                        {product.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5b6488]">
                        {excerpt(product.description)}
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
        </m.div>
    );
}

function ProductsContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category");

    const activeCategory =
        categoryParam && categories.includes(categoryParam) && categoryParam !== "All"
            ? categoryParam
            : null;

    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);

    const randomizedAll = useMemo(() => shuffle(products), []);

    const isSearching = query.trim().length > 0;

    const searchResults = useMemo(() => {
        if (!isSearching) return [];
        const q = query.trim().toLowerCase();
        return products.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.compound.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
        );
    }, [query, isSearching]);

    const baseList = isSearching
        ? searchResults
        : activeCategory
            ? products.filter((p) => p.category === activeCategory)
            : randomizedAll;

    const totalPages = Math.max(1, Math.ceil(baseList.length / PAGE_SIZE));
    const pageItems = baseList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    useEffect(() => {
        setPage(1);
    }, [query, activeCategory]);

    const copy = activeCategory ? CATEGORY_COPY[activeCategory] ?? DEFAULT_COPY : DEFAULT_COPY;

    let sectionLabel = "All Products";
    let sectionTitle = "The full range.";
    if (isSearching) {
        sectionLabel = "Search Results";
        sectionTitle = `Results for "${query.trim()}"`;
    } else if (activeCategory) {
        sectionLabel = activeCategory.toUpperCase();
        sectionTitle = `${activeCategory} — the full range.`;
    }

    return (
        <LazyMotion features={domAnimation} strict>
            <main data-navbar="light" className="min-h-screen bg-[#f6f7fb]">
                <Navbar />

                <section className="mx-auto max-w-7xl px-6 pt-28 pb-24 sm:px-10 md:pt-36">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
                        <m.div
                            key={copy.title}
                            initial="hidden"
                            animate="visible"
                            variants={container}
                            className="max-w-2xl"
                        >
                            <m.p
                                variants={rise}
                                className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3459c9]"
                            >
                                {copy.eyebrow}
                            </m.p>
                            <m.h1
                                variants={rise}
                                className="mt-4 text-4xl font-bold text-[#0b1a4a] sm:text-5xl"
                            >
                                {copy.title}
                            </m.h1>
                            <m.p
                                variants={rise}
                                className="mt-4 text-base leading-relaxed text-[#4a5578]"
                            >
                                {copy.intro}
                            </m.p>
                        </m.div>

                        <ParticleLogo
                            theme="light"
                            desktopLogo={logoIcon}
                            desktopCount={7000}
                            mobileCount={4000}
                            className="relative h-56 w-full md:h-[340px] md:w-[400px] md:shrink-0"
                        />
                    </div>

                    {!activeCategory && (
                        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
                            {CATEGORY_TILES.map(({ category, image }) => {
                                const count = products.filter((p) => p.category === category).length;
                                return (
                                    <Link
                                        key={category}
                                        href={`/products?category=${encodeURIComponent(category)}`}
                                        className="group relative isolate rounded-3xl border border-[#e4e7f3] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,64,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(16,24,64,0.10)]"
                                    >
                                        <div className="relative mx-auto h-60 w-full max-w-[260px]">
                                            <div
                                                aria-hidden
                                                className="absolute inset-x-4 bottom-0 -z-10 h-40 rounded-full bg-gradient-to-t from-[#3459c9]/50 via-[#5b7be0]/30 to-transparent blur-2xl"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 h-44 rounded-2xl border border-[#dfe3f5] bg-gradient-to-b from-[#f3f4fb] to-[#e6ebfb]" />
                                            <Image
                                                src={image}
                                                alt={category}
                                                fill
                                                sizes="260px"
                                                className="object-contain object-center p-2 drop-shadow-[0_18px_24px_rgba(52,89,201,0.25)] transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                                            />
                                        </div>
                                        <div className="mt-5 flex items-end justify-between px-1">
                                            <div>
                                                <p className="text-xl font-bold text-[#0b1a4a]">
                                                    {category}
                                                </p>
                                                <p className="mt-1 text-sm text-[#7079a0]">
                                                    {count} products
                                                </p>
                                            </div>
                                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3459c9]">
                                                Browse
                                                <span
                                                    aria-hidden
                                                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                                                >
                                                    →
                                                </span>
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}

                    <div className={`${activeCategory ? "mt-14" : "mt-20"} flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between`}>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-[#3459c9]">
                                {sectionLabel}
                            </p>
                            <h2 className="mt-2 text-3xl font-bold text-[#0b1a4a]">
                                {sectionTitle}
                            </h2>
                        </div>

                        <div className="relative w-full sm:w-80">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search products..."
                                className="h-12 w-full rounded-full border border-[#e4e7f3] bg-white pl-11 pr-4 text-sm text-[#0b1a4a] shadow-[0_1px_2px_rgba(16,24,64,0.04)] outline-none transition-colors focus:border-[#3459c9]"
                            />
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7079a0]"
                            >
                                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                                <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>

                    {activeCategory && !isSearching && (
                        <div className="mt-5">
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 rounded-full border border-[#d7dcef] bg-white px-4 py-2 text-sm font-semibold text-[#0b1a4a] transition-colors hover:bg-[#eef1fb]"
                            >
                                {activeCategory}
                                <span aria-hidden>✕</span>
                            </Link>
                        </div>
                    )}

                    {pageItems.length > 0 ? (
                        <>
                            <m.div
                                key={`grid-${isSearching ? query : activeCategory ?? "all"}-${page}`}
                                initial="hidden"
                                animate="visible"
                                variants={container}
                                className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                            >
                                {pageItems.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </m.div>

                            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
                        </>
                    ) : (
                        <div className="mt-8 rounded-3xl border border-[#e4e7f3] bg-white p-12 text-center">
                            <p className="text-lg font-semibold text-[#0b1a4a]">
                                Sorry, we couldn't find anything for "{query.trim()}".
                            </p>
                            <p className="mt-2 text-sm text-[#7079a0]">
                                Try a different name, compound, or category.
                            </p>
                        </div>
                    )}
                </section>

                <Footer />
            </main>
        </LazyMotion>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<main className="min-h-screen bg-[#f6f7fb]" />}>
            <ProductsContent />
        </Suspense>
    );
}