"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

const EASE = [0.16, 1, 0.3, 1];

const rise = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function ProductDetailPage() {
    const { id } = useParams();
    const product = products.find((p) => p.id === id);

    // Next.js can't call the real notFound() helper from inside a client
    // component render, so fall back to a friendly inline empty state if
    // the slug doesn't match anything in data/products.js.
    if (!product) {
        return (
            <main data-navbar="light" className="min-h-screen bg-[#f6f7fb]">
                <Navbar />
                <div className="mx-auto max-w-3xl px-6 pt-40 pb-24 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#3459c9]">
                        Not found
                    </p>
                    <h1 className="mt-3 text-3xl font-bold text-[#0b1a4a]">
                        We couldn't find that product
                    </h1>
                    <p className="mt-3 text-[#5b6488]">
                        It may have been renamed or removed.
                    </p>
                    <Link
                        href="/products"
                        className="mt-8 inline-flex items-center gap-1.5 rounded-xl bg-[#12306e] px-5 py-3 text-sm font-semibold text-white"
                    >
                        ← Back to all products
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    const related = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    return (
        <main data-navbar="light" className="min-h-screen bg-[#f6f7fb]">
            <Navbar />

            <section className="mx-auto max-w-6xl px-6 pt-28 pb-24 sm:px-10 md:pt-36">
                {/* Breadcrumb */}
                <motion.nav
                    initial="hidden"
                    animate="visible"
                    variants={rise}
                    className="flex items-center gap-2 text-sm text-[#7079a0]"
                    aria-label="Breadcrumb"
                >
                    <Link href="/products" className="hover:text-[#3459c9]">
                        Products
                    </Link>
                    <span aria-hidden>/</span>
                    <Link href="/products" className="hover:text-[#3459c9]">
                        Oils
                    </Link>
                    <span aria-hidden>/</span>
                    <span className="text-[#0b1a4a]">{product.name}</span>
                </motion.nav>

                {/* Main content */}
                <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={rise}
                        className="relative aspect-square w-full overflow-hidden rounded-3xl border border-[#e4e7f3] bg-white"
                    >
                        <Image
                            src={product.image}
                            alt={`${product.name} — ${product.compound}`}
                            fill
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="object-contain p-8"
                            priority
                        />
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={rise}
                        className="flex flex-col"
                    >
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#3459c9]">
                            {product.category}
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-[#0b1a4a] sm:text-4xl">
                            {product.name}
                        </h1>
                        <p className="mt-2 text-lg text-[#5b6488]">{product.compound}</p>

                        <p className="mt-6 text-base leading-relaxed text-[#4a5578]">
                            {product.description}
                        </p>

                        {/* Specs */}
                        <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-[#e4e7f3] pt-6 sm:grid-cols-3">
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-[#7079a0]">
                                    Concentration
                                </dt>
                                <dd className="mt-1 text-sm font-semibold text-[#0b1a4a]">
                                    {product.dose}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-[#7079a0]">
                                    Format
                                </dt>
                                <dd className="mt-1 text-sm font-semibold text-[#0b1a4a]">
                                    {product.size}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-[#7079a0]">
                                    Testing
                                </dt>
                                <dd className="mt-1 text-sm font-semibold text-[#0b1a4a]">
                                    HPLC-verified
                                </dd>
                            </div>
                        </dl>

                        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={`/contact?product=${encodeURIComponent(product.name)}`}
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#12306e] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0b1a4a]"
                            >
                                Enquire about {product.name}
                                <span aria-hidden>→</span>
                            </Link>
                            <Link
                                href="/products"
                                className="inline-flex h-12 items-center justify-center rounded-xl border border-[#d7dcef] px-6 text-sm font-semibold text-[#0b1a4a] transition-colors hover:bg-white"
                            >
                                ← Back to all oils
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Related products */}
                {related.length > 0 && (
                    <div className="mt-24">
                        <h2 className="text-xl font-bold text-[#0b1a4a]">
                            You may also like
                        </h2>
                        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((oil) => (
                                <Link
                                    key={oil.id}
                                    href={`/products/${oil.id}`}
                                    className="group flex flex-col rounded-3xl border border-[#e4e7f3] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,64,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(16,24,64,0.10)]"
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
                                    <div className="px-2 pb-2 pt-5">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-[#3459c9]">
                                            Oils
                                        </p>
                                        <h3 className="mt-1 text-lg font-bold text-[#0b1a4a]">
                                            {oil.name}
                                        </h3>
                                        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#3459c9]">
                                            View
                                            <span aria-hidden>→</span>
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <Footer />
        </main>
    );
}