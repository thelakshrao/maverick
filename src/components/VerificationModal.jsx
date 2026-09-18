"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styleimagedoc from "@/images/styleimagedoc.webp";
import logo from "@/images/logo.png";

const RESULT_DETAILS = {
    genuine: {
        title: "Authentic Product",
        subtitle: "Verified code matches official batch records.",
        color: "text-[#12306e]",
        bg: "bg-emerald-50 border-emerald-200/80",
        badge: "Verified ✓",
        badgeBg: "bg-emerald-100 text-emerald-800",
        alert: "This product is 100% genuine and safe for use.",
    },
    used: {
        title: "Code Already Verified",
        subtitle: "This code was previously checked.",
        color: "text-[#12306e]",
        bg: "bg-amber-50 border-amber-200/80",
        badge: "Already Used ⚠",
        badgeBg: "bg-amber-100 text-amber-800",
        alert: "If you didn't verify this product yourself, please contact us immediately — the seal may have been tampered with.",
    },
    invalid: {
        title: "Invalid Code",
        subtitle: "We couldn't verify this code.",
        color: "text-red-600",
        bg: "bg-red-50 border-red-200/80",
        badge: "Not Found ✕",
        badgeBg: "bg-red-100 text-red-800",
        alert: "Please double-check the code, or contact our support team before using this product.",
    },
    error: {
        title: "System Error",
        subtitle: "Something went wrong during verification.",
        color: "text-red-600",
        bg: "bg-red-50 border-red-200/80",
        badge: "Error ✕",
        badgeBg: "bg-red-100 text-red-800",
        alert: "System connection issue. Please try verifying again in a moment.",
    },
};

export default function VerificationModal({ isOpen, onClose, result, codes }) {
    if (!isOpen || !result) return null;

    const config = RESULT_DETAILS[result] || RESULT_DETAILS.error;
    const formattedDate = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-[#050b2e]/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 15 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-y-auto rounded-[28px] bg-[#f4f7fc] p-3 shadow-2xl md:flex-row md:overflow-hidden"
                >
                    <button
                        onClick={onClose}
                        className="absolute right-6 top-6 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#12306e] shadow-md transition-transform hover:bg-white active:scale-95"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>

                    <div className="relative flex w-full flex-col justify-between p-3 md:w-2/5 md:p-6">
                        <div className="relative flex h-[260px] w-full flex-col justify-between overflow-hidden rounded-[22px] border border-white/60 bg-white p-5 shadow-md md:h-full md:min-h-[460px] md:p-6">
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={styleimagedoc}
                                    alt="Athletic testing laboratory"
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 40vw"
                                    className="object-cover object-[center_top] md:object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#050b2e]/75 via-transparent to-[#050b2e]/85" />
                            </div>

                            <div className="relative z-10 self-start rounded-xl border border-white/20 bg-gradient-to-r from-[#050b2e]/90 via-[#12306e]/90 to-[#274690]/90 px-3.5 py-2 shadow-lg backdrop-blur-md">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={logo}
                                        alt="MAVERICK Logo"
                                        width={24}
                                        height={24}
                                        className="object-contain brightness-0 invert"
                                    />
                                    <span className="text-xs font-black tracking-widest text-white">
                                        MAVERICK
                                    </span>
                                </div>
                            </div>

                            <div className="relative z-10 mt-auto">
                                <p className="text-[9px] font-semibold uppercase tracking-widest text-white/80 drop-shadow md:text-[10px]">
                                    TRUSTED BY PROFESSIONALS
                                </p>
                                <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-100/80 bg-white/95 p-2.5 shadow-md backdrop-blur-md md:mt-3 md:p-3">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#12306e]/10 text-xs text-[#12306e] md:h-7 md:w-7">
                                        🛡
                                    </span>
                                    <div>
                                        <p className="text-xs font-bold text-[#12306e]">
                                            Batch Verified
                                        </p>
                                        <p className="text-[9px] text-slate-500 md:text-[10px]">
                                            Scan · Verify · Track
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full flex-col justify-between p-6 sm:p-8 md:w-3/5">
                        <div>
                            <div className="pr-10">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#12306e]/50">
                                    VERIFICATION REPORT
                                </p>
                                <h3 className={`mt-1 text-2xl font-bold tracking-tight ${config.color}`}>
                                    {config.title}
                                </h3>
                                <p className="mt-1 text-xs text-slate-500">
                                    {config.subtitle}
                                </p>
                            </div>

                            <div className="mt-6 space-y-3 rounded-2xl border border-slate-200/60 bg-white p-4 text-xs shadow-sm">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                                    <span className="text-slate-400">Verification Code</span>
                                    <span className="font-mono font-semibold tracking-wide text-[#12306e]">
                                        {codes.code1}{codes.code2 ? ` / ${codes.code2}` : ""}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                                    <span className="text-slate-400">Scan Status</span>
                                    <span className={`rounded-full px-3 py-0.5 text-[11px] font-semibold ${config.badgeBg}`}>
                                        {config.badge}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-400">Verified On</span>
                                    <span className="font-medium text-slate-700">{formattedDate}</span>
                                </div>
                            </div>

                            <div className={`mt-4 rounded-2xl border p-4 text-xs leading-relaxed shadow-sm ${config.bg} ${config.color}`}>
                                {config.alert}
                            </div>
                        </div>

                        <div className="mt-8 border-t border-slate-200/60 pt-4">
                            <button
                                onClick={onClose}
                                className="flex h-12 w-full items-center justify-center rounded-full bg-[#12306e] text-sm font-semibold text-white shadow-md transition-transform duration-150 ease-out hover:bg-[#0a2050] active:scale-[0.98]"
                            >
                                Close
                            </button>
                            <p className="mt-3 text-center text-[10px] font-medium text-slate-400">
                                © 2026 MAVERICK LABS. ALL RIGHTS RESERVED.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}