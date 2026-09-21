"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export default function ProductModal({ product, onClose }) {
    return (
        <AnimatePresence>
            {product && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#050b2e]/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/15 bg-gradient-to-br from-[#0b1a4a] via-[#12306e] to-[#1a3d80] shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                        >
                            ✕
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-2">
                            <div className="relative aspect-[4/3] w-full bg-white sm:aspect-auto sm:h-full sm:min-h-[280px]">
                                <Image
                                    src={product.image}
                                    alt={`${product.name} — ${product.compound}`}
                                    fill
                                    sizes="(min-width: 640px) 50vw, 100vw"
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex flex-col p-6 sm:p-7">
                                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8fb8ff]">
                                    {product.dose}
                                </p>
                                <h3 className="mt-1 text-2xl font-bold text-white">
                                    {product.name}
                                </h3>
                                <p className="mt-1 text-sm text-white/60">
                                    {product.compound}
                                </p>
                                <p className="mt-1 text-xs text-white/40">
                                    {product.size}
                                </p>

                                <p className="mt-5 text-sm leading-relaxed text-white/70">
                                    {product.description}
                                </p>

                                <motion.a
                                    href={`/contact?product=${encodeURIComponent(product.name)}`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-[#12306e] shadow-lg transition-transform duration-150 ease-out"
                                >
                                    Enquire
                                    <span aria-hidden>→</span>
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}