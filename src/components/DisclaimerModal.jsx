"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import productImage from "@/images/styleproduct1.png";

const DISCLAIMER_KEY = "maverick_disclaimer_accepted";

export default function DisclaimerModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasAccepted = sessionStorage.getItem(DISCLAIMER_KEY);
        if (!hasAccepted) {
            setIsOpen(true);
        }
    }, []);

    const handleAccept = () => {
        sessionStorage.setItem(DISCLAIMER_KEY, "true");
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleAccept}
                    className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
                >
                    <div className="pointer-events-none absolute inset-0 z-0">
                        <Image
                            src={productImage}
                            alt=""
                            fill
                            className="object-cover opacity-50"
                            priority
                        />
                        <div className="absolute inset-0 bg-white/50" />
                    </div>

                    <div className="relative z-10 max-h-[85vh] overflow-y-auto p-6 md:p-8">
                        <div className="space-y-4 text-xs leading-relaxed text-slate-700 md:text-sm">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 md:text-sm">
                                    PLEASE NOTE:
                                </h3>
                                <p className="mt-1 text-slate-600">
                                    This website has solely purpose for education, research and
                                    development. It has nothing relevant with any commercial
                                    purpose. Please note that Maveric Pharmaceutical does not
                                    deliver to countries that qualify these products of medicine as
                                    specially controlled or scheduled substances, including but
                                    not limited to the United States, Australia, Canada and Europe.
                                    We do not sell any products on the internet. We do not sell to
                                    the public. We are not related to any website that sells the
                                    same or similar products directly or indirectly. The information
                                    on this website is not a prescription for the use of these
                                    products and it is intended to provide information only. All
                                    products conform to USP or BP Guidelines.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 md:text-sm">
                                    PLEASE NOTE:
                                </h3>
                                <p className="mt-1 text-slate-600">
                                    Kindly note that we are not an online store. There is no
                                    shopping cart on our website. We do not provide services or
                                    ship our products to Europe, the US, Australia or any
                                    prohibited countries.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 md:text-sm">
                                    WARNING:
                                </h3>
                                <p className="mt-1 font-medium text-slate-800">
                                    We have one and only legit website. Other than this are all fake
                                    and harmful websites. Be cautious that our former and current
                                    package do not have any &quot;Original 100%&quot; on their packages. Any
                                    Original 100% printed on the packages are all counterfeit. Any
                                    doubts, kindly take photos of them and send us to support. We
                                    are ready to assist you.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-slate-200 pt-4">
                            <button
                                onClick={handleAccept}
                                className="rounded-xl bg-blue-950 px-7 py-3 text-xs font-bold text-white shadow-md transition-transform hover:bg-blue-900 active:scale-95"
                            >
                                I accept
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}