"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Syringe, RotateCcw } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import labimage1 from "@/images/labimage1.webp";
import styleproduct1 from "@/images/styleproduct1.png";
import styleproduct2 from "@/images/styleproduct2.png";

const OFFSET = 64;

const edgeOffset = {
    left: { x: -OFFSET, y: 0 },
    right: { x: OFFSET, y: 0 },
    top: { x: 0, y: -OFFSET },
    bottom: { x: 0, y: OFFSET },
};

function reveal(edge = "bottom", delay = 0, duration = 0.7) {
    const { x, y } = edgeOffset[edge];
    return {
        initial: { opacity: 0, x, y },
        whileInView: { opacity: 1, x: 0, y: 0 },
        viewport: { once: true, amount: 0.1, margin: "0px 0px -100px 0px" },
        transition: { duration, ease: [0.16, 1, 0.3, 1], delay },
    };
}

const VIAL_PRESETS = [2, 5, 10, 15];
const WATER_PRESETS = [1, 2, 3, 5];
const DOSE_PRESETS = {
    mcg: [50, 100, 150, 250, 500],
    mg: [1, 2, 4, 5, 10],
};
const SYRINGE_TYPES = [
    { id: "u100", label: "U-100 Syringe (1 mL)", units: 100 },
    { id: "u40", label: "U-40 Syringe (1 mL)", units: 40 },
];

const COPY = {
    eyebrow: "Research Tool",
    title: "Peptide Reconstitution Calculator",
    badge: "Optimize Your Journey",
    intro: {
        title1: "Why Accurate Peptide Dosing Matters",
        body1:
            "Accurate dosing matters because even small calculation errors can lead to large differences in the final amount measured. The Maveric Lab Dosage Calculator helps support safer, more reliable preparation by giving you a quick reference for your dosing needs — useful for anyone who wants a consistent process and fewer manual mistakes. A well-structured calculation tool also builds confidence when handling sensitive materials that require exact measurement. It is not a replacement for professional advice, but it can be a helpful support resource. Used carefully, it promotes better planning, clearer dosing decisions, and more efficient peptide handling overall.",
        title2: "Simple, User-Friendly Support for Daily Use",
        body2:
            "The Maveric Lab Dosage Calculator is built for practical use and clear understanding. It focuses on simplicity so you can get answers without complex steps or confusing formulas — useful for routine calculations, quick checks, and basic planning before preparation. The clean approach fits anyone who wants a dependable tool for everyday workflows, and helps improve consistency by turning repeated calculations into an easy process. For anyone seeking a straightforward way to estimate peptide dosage, this calculator offers a helpful balance of speed, clarity, and usability while keeping the focus on accurate measurement.",
    },
    form: {
        syringeQuestion: "1. What type of syringe are you using?",
        vialQuestion: "2. Select peptide vial quantity",
        waterQuestion: "3. How much bacteriostatic water are you adding?",
        doseQuestion: "4. Desired dose per injection",
        other: "Other",
        otherPlaceholder: "Enter amount",
        calculateButton: "Calculate Draw",
        resetButton: "Reset",
    },
    results: {
        awaitingTitle: "Awaiting Configuration",
        awaitingDesc:
            "Adjust your vial and dose values on the left, then click Calculate Draw to see the exact conversion.",
        concentration: "Concentration",
        perUnitContains: "Per unit contains",
        totalDoses: "Total doses",
        exceedsSyringe:
            "This draw volume exceeds your selected syringe's capacity. Consider adding more BAC water to lower the concentration.",
    },
    resultCard: {
        toHaveDose: "To have a dose of",
        pullSyringeTo: "pull the syringe to",
        units: "Units",
        syringeScale: "U-100 Insulin Syringe Scale",
        drawInstruction: (units) =>
            `Draw volume up to line marker of ${units} Units inside your U-100 syringe.`,
        doses: "Doses",
    },
    disclaimer:
        "For analytical research and educational laboratory procedures only. Not intended for direct consumer therapeutic use.",
};

function MiniSyringeIcon() {
    return (
        <svg
            width="36"
            height="12"
            viewBox="0 0 44 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <line
                x1="1"
                y1="7"
                x2="8"
                y2="7"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <rect x="8" y="2" width="3" height="10" fill="#12306e" rx="0.5" />
            <rect
                x="11"
                y="3"
                width="22"
                height="8"
                rx="0.5"
                stroke="#12306e"
                strokeWidth="1"
                fill="#FFFFFF"
            />
            <rect x="11" y="3" width="10" height="8" fill="#BFD4FF" opacity="0.9" />
            <rect x="33" y="2" width="3" height="10" fill="#12306e" rx="0.5" />
            <line x1="36" y1="7" x2="42" y2="7" stroke="#3f7ee8" strokeWidth="1.5" />
            <line
                x1="42"
                y1="3"
                x2="42"
                y2="11"
                stroke="#3f7ee8"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function AnimatedSyringe({ units = 0, totalUnits = 100 }) {
    const percentage = Math.min(Math.max((units / totalUnits) * 100, 0), 100);

    return (
        <div className="w-full my-3 py-4 px-3 bg-[#f3f6fc] border border-[#12306e]/10 rounded-2xl flex flex-col items-center">
            <div className="relative w-full max-w-[320px] h-20 flex items-center justify-center">
                <div className="flex items-center z-10 -mr-px">
                    <div className="w-5 h-[1.5px] bg-slate-400" />
                    <div className="w-2.5 h-10 bg-[#12306e] rounded-l-xs z-10" />
                </div>

                <div className="relative w-60 h-10 border-2 border-[#12306e] bg-white rounded-xs z-20">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-[#cfe0ff] border-r-2 border-[#3f7ee8] relative"
                    >
                        {units > 0 && (
                            <div className="absolute -top-7 right-0 transform translate-x-1/2 flex flex-col items-center pointer-events-none z-40">
                                <span className="text-[10px] font-black text-[#274690] bg-white px-1.5 py-0.5 rounded border border-[#3f7ee8]/40 shadow-2xs whitespace-nowrap leading-none">
                                    {units.toFixed(1)} u
                                </span>
                                <div className="w-px h-1.5 bg-[#3f7ee8]" />
                            </div>
                        )}
                    </motion.div>

                    <div className="absolute inset-0 flex pointer-events-none z-30">
                        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((mark) => (
                            <div
                                key={mark}
                                className="absolute top-0 bottom-0 flex flex-col justify-end items-center"
                                style={{ left: `${mark}%` }}
                            >
                                <div
                                    className={`w-px bg-[#12306e]/50 ${mark % 20 === 0 ? "h-3.5" : "h-2"
                                        }`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center z-10 -ml-px">
                    <div className="w-2.5 h-10 bg-[#12306e] rounded-r-xs z-10" />
                    <div className="w-3.5 h-0.5 bg-[#3f7ee8]" />
                    <div className="w-[2.5px] h-7 bg-[#3f7ee8] rounded-xs" />
                </div>
            </div>

            <div className="relative w-60 h-4 text-[9px] font-bold text-[#12306e]/50 -mt-2">
                {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((num) => (
                    <span
                        key={num}
                        className="absolute transform -translate-x-1/2"
                        style={{ left: `${num}%` }}
                    >
                        {num}
                    </span>
                ))}
            </div>

            <p className="text-[10px] font-bold text-[#12306e]/60 mt-2 text-center">
                {COPY.resultCard.syringeScale}
            </p>
            {units > 0 && (
                <p className="text-[9px] text-[#12306e]/40 text-center mt-0.5">
                    {COPY.resultCard.drawInstruction(units.toFixed(1))}
                </p>
            )}
        </div>
    );
}

function OptionRow({
    options,
    selected,
    onSelect,
    otherValue,
    onOtherChange,
    otherLabel,
    suffix,
}) {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
            {options.map((opt) => (
                <button
                    key={opt}
                    type="button"
                    onClick={() => onSelect(String(opt))}
                    className={`py-1.5 px-1.5 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center leading-none ${selected === String(opt) && selected !== "other"
                            ? "bg-[#12306e]/8 border-[#12306e] text-[#12306e] shadow-2xs"
                            : "bg-white border-[#12306e]/15 text-slate-700 hover:border-[#12306e]/40"
                        }`}
                >
                    <span>{opt}</span>
                    {suffix && (
                        <span className="text-[9px] font-medium text-[#12306e]/40 mt-0.5">
                            {suffix}
                        </span>
                    )}
                </button>
            ))}
            <button
                type="button"
                onClick={() => onSelect("other")}
                className={`py-1.5 px-1.5 rounded-xl border text-xs font-bold transition flex items-center justify-center ${selected === "other"
                        ? "bg-[#12306e]/8 border-[#12306e] text-[#12306e] shadow-2xs"
                        : "bg-white border-[#12306e]/15 text-slate-700 hover:border-[#12306e]/40"
                    }`}
            >
                {otherLabel}
            </button>
            {selected === "other" && (
                <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    value={otherValue}
                    onChange={(e) => onOtherChange(e.target.value)}
                    placeholder={COPY.form.otherPlaceholder}
                    autoFocus
                    className="col-span-3 sm:col-span-5 mt-1 w-full px-3 py-1.5 rounded-xl border border-[#12306e]/15 bg-white text-slate-900 text-xs font-medium outline-none focus:border-[#12306e] transition"
                />
            )}
        </div>
    );
}

export default function CalculatorPage() {
    const [syringeType, setSyringeType] = useState("u100");
    const [vialChoice, setVialChoice] = useState("10");
    const [vialOther, setVialOther] = useState("");
    const [waterChoice, setWaterChoice] = useState("1");
    const [waterOther, setWaterOther] = useState("");
    const [doseUnit, setDoseUnit] = useState("mg");
    const [doseChoice, setDoseChoice] = useState("1");
    const [doseOther, setDoseOther] = useState("");
    const [result, setResult] = useState(null);

    const resolvedVial = vialChoice === "other" ? vialOther : vialChoice;
    const resolvedWater = waterChoice === "other" ? waterOther : waterChoice;
    const resolvedDose = doseChoice === "other" ? doseOther : doseChoice;

    const handleUnitChange = (unit) => {
        setDoseUnit(unit);
        setDoseChoice(String(DOSE_PRESETS[unit][0]));
        setDoseOther("");
    };

    const calculate = () => {
        const vial = parseFloat(resolvedVial);
        const water = parseFloat(resolvedWater);
        const doseVal = parseFloat(resolvedDose);
        const syringeUnits =
            SYRINGE_TYPES.find((s) => s.id === syringeType)?.units || 100;

        if (!vial || !water || !doseVal) {
            setResult(null);
            return;
        }

        const concentrationMgPerMl = vial / water;
        const doseMg = doseUnit === "mcg" ? doseVal / 1000 : doseVal;
        const drawVolumeMl = doseMg / concentrationMgPerMl;
        const drawUnits = drawVolumeMl * syringeUnits;
        const dosesPerVial = vial / doseMg;
        const perUnitMcg = (concentrationMgPerMl * 1000) / syringeUnits;
        const exceeds = drawUnits > syringeUnits;

        setResult({
            concentrationMgPerMl,
            drawVolumeMl,
            drawUnits,
            dosesPerVial,
            perUnitMcg,
            exceeds,
        });
    };

    const reset = () => {
        setSyringeType("u100");
        setVialChoice("10");
        setVialOther("");
        setWaterChoice("1");
        setWaterOther("");
        setDoseUnit("mg");
        setDoseChoice("1");
        setDoseOther("");
        setResult(null);
    };

    return (
        <>
            <Navbar />
            <main className="w-full bg-[#eef1f6] overflow-x-clip">
                <section
                    data-navbar="dark"
                    className="relative overflow-hidden bg-gradient-to-br from-[#050b2e] via-[#12306e] to-[#3f7ee8] pb-28"
                >
                    <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
                        <Image
                            src={labimage1}
                            alt=""
                            fill
                            sizes="100vw"
                            priority
                            className="object-cover object-[70%_center]"
                        />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050b2e]/30 via-transparent to-[#eef1f6]" aria-hidden />

                    <div
                        className="pointer-events-none absolute -left-24 top-1/3 h-[420px] w-[420px] rounded-full bg-[#5b8def]/40 blur-3xl"
                        aria-hidden
                    />
                    <div
                        className="pointer-events-none absolute right-0 bottom-0 h-[320px] w-[320px] rounded-full bg-[#8fb8ff]/30 blur-3xl"
                        aria-hidden
                    />

                    <div className="relative z-10 mx-auto max-w-3xl px-6 pt-20 text-center md:pt-28">
                        <motion.p
                            {...reveal("top", 0.05)}
                            className="text-xs font-medium uppercase tracking-[0.3em] text-white/60"
                        >
                            {COPY.eyebrow}
                        </motion.p>

                        <motion.h1
                            {...reveal("bottom", 0.18)}
                            className="mt-6 text-[32px] font-bold leading-[1.15] text-white md:text-[48px] md:leading-[1.1]"
                        >
                            {COPY.title}
                        </motion.h1>

                        <motion.div {...reveal("bottom", 0.32)} className="mt-7 inline-block">
                            <span className="text-sm font-bold text-white bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm ring-1 ring-white/15 md:text-base">
                                {COPY.badge}
                            </span>
                        </motion.div>
                    </div>
                </section>

                <section
                    data-navbar="light"
                    className="relative z-10 mx-auto -mt-16 max-w-6xl px-4 md:-mt-24 md:px-6"
                >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <motion.div
                            {...reveal("left", 0.1)}
                            className="rounded-3xl border border-[#12306e]/10 bg-white p-6 shadow-[0_20px_45px_-25px_rgba(18,48,110,0.35)] md:p-8"
                        >
                            <h2 className="text-[15px] font-bold text-[#12306e] md:text-base">
                                {COPY.intro.title1}
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-[#12306e]/60">
                                {COPY.intro.body1}
                            </p>
                        </motion.div>

                        <motion.div
                            {...reveal("right", 0.18)}
                            className="rounded-3xl border border-[#12306e]/10 bg-white p-6 shadow-[0_20px_45px_-25px_rgba(18,48,110,0.35)] md:p-8"
                        >
                            <h2 className="text-[15px] font-bold text-[#12306e] md:text-base">
                                {COPY.intro.title2}
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-[#12306e]/60">
                                {COPY.intro.body2}
                            </p>
                        </motion.div>
                    </div>
                </section>
                <section className="relative mx-auto mt-16 max-w-6xl px-4 pb-20 md:mt-24 md:px-6 md:pb-28">
                    <div className="hidden lg:block absolute -left-16 top-1/2 -translate-y-1/2 -z-10 opacity-[0.12] pointer-events-none select-none">
                        <Image src={styleproduct1} alt="" width={380} height={380} className="object-contain" />
                    </div>
                    <div className="hidden lg:block absolute -right-12 -bottom-12 -z-10 opacity-[0.1] pointer-events-none select-none">
                        <Image src={styleproduct2} alt="" width={260} height={260} className="object-contain" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-5 items-start">
                        <motion.div
                            {...reveal("left", 0.08)}
                            className="rounded-3xl bg-white border border-[#12306e]/10 shadow-[0_20px_45px_-25px_rgba(18,48,110,0.35)] p-5 sm:p-6 space-y-4"
                        >
                            <div>
                                <p className="text-xs font-bold text-[#12306e] mb-1.5">
                                    {COPY.form.syringeQuestion}
                                </p>
                                <div className="space-y-1.5">
                                    {SYRINGE_TYPES.map((s) => (
                                        <button
                                            key={s.id}
                                            type="button"
                                            onClick={() => setSyringeType(s.id)}
                                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition ${syringeType === s.id
                                                    ? "bg-[#12306e]/8 border-[#12306e]"
                                                    : "bg-white border-[#12306e]/15 hover:border-[#12306e]/40"
                                                }`}
                                        >
                                            <span
                                                className={`text-xs font-bold ${syringeType === s.id ? "text-[#12306e]" : "text-slate-800"
                                                    }`}
                                            >
                                                {s.label}
                                            </span>
                                            <MiniSyringeIcon />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-bold text-[#12306e] mb-1.5">
                                    {COPY.form.vialQuestion}
                                </p>
                                <OptionRow
                                    options={VIAL_PRESETS}
                                    selected={vialChoice}
                                    onSelect={setVialChoice}
                                    otherValue={vialOther}
                                    onOtherChange={setVialOther}
                                    otherLabel={COPY.form.other}
                                    suffix="mg"
                                />
                            </div>

                            <div>
                                <p className="text-xs font-bold text-[#12306e] mb-1.5">
                                    {COPY.form.waterQuestion}
                                </p>
                                <OptionRow
                                    options={WATER_PRESETS}
                                    selected={waterChoice}
                                    onSelect={setWaterChoice}
                                    otherValue={waterOther}
                                    onOtherChange={setWaterOther}
                                    otherLabel={COPY.form.other}
                                    suffix="mL"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <p className="text-xs font-bold text-[#12306e]">
                                        {COPY.form.doseQuestion}
                                    </p>
                                    <div className="flex rounded-full border border-[#12306e]/15 overflow-hidden shrink-0">
                                        {["mcg", "mg"].map((u) => (
                                            <button
                                                key={u}
                                                type="button"
                                                onClick={() => handleUnitChange(u)}
                                                className={`px-2.5 py-0.5 text-[10px] font-bold transition ${doseUnit === u
                                                        ? "bg-[#12306e] text-white"
                                                        : "bg-white text-[#12306e]/50 hover:bg-[#12306e]/5"
                                                    }`}
                                            >
                                                {u}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <OptionRow
                                    options={DOSE_PRESETS[doseUnit]}
                                    selected={doseChoice}
                                    onSelect={setDoseChoice}
                                    otherValue={doseOther}
                                    onOtherChange={setDoseOther}
                                    otherLabel={COPY.form.other}
                                    suffix={doseUnit}
                                />
                            </div>

                            <div className="flex gap-2 pt-1">
                                <button
                                    type="button"
                                    onClick={calculate}
                                    className="flex-1 py-2.5 rounded-xl bg-[#12306e] text-white text-xs font-bold uppercase tracking-wide hover:bg-[#0a2054] transition"
                                >
                                    {COPY.form.calculateButton}
                                </button>
                                <button
                                    type="button"
                                    onClick={reset}
                                    aria-label={COPY.form.resetButton}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#12306e]/15 text-[#12306e]/50 hover:text-[#12306e] hover:border-[#12306e]/40 transition shrink-0"
                                >
                                    <RotateCcw size={14} />
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            {...reveal("right", 0.16)}
                            className="sticky top-20 rounded-3xl bg-white border-2 border-[#12306e] shadow-[0_20px_45px_-20px_rgba(18,48,110,0.4)] p-5 sm:p-6 flex flex-col justify-between"
                        >
                            {result ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex-1 flex flex-col justify-between"
                                >
                                    <div>
                                        <h3 className="text-xs sm:text-sm font-black text-[#12306e] text-center mb-1">
                                            {COPY.resultCard.toHaveDose}{" "}
                                            <span className="underline decoration-[#12306e]/30">
                                                {resolvedDose} {doseUnit}
                                            </span>{" "}
                                            {COPY.resultCard.pullSyringeTo}{" "}
                                            <span className="bg-[#12306e] text-white px-2 py-0.5 rounded-md inline-block text-xs">
                                                {result.drawUnits.toFixed(1)} {COPY.resultCard.units}
                                            </span>
                                        </h3>

                                        <AnimatedSyringe units={result.drawUnits} />
                                    </div>

                                    <div className="grid grid-cols-3 gap-1.5 mt-2">
                                        <div className="bg-[#f3f6fc] border border-[#12306e]/10 rounded-lg p-2 text-center">
                                            <p className="text-[8px] font-bold tracking-wider uppercase text-[#12306e]/40">
                                                {COPY.results.concentration}
                                            </p>
                                            <p className="text-xs font-black text-[#12306e] mt-0.5">
                                                {result.concentrationMgPerMl.toFixed(1)} MG/ML
                                            </p>
                                        </div>

                                        <div className="bg-[#f3f6fc] border border-[#12306e]/10 rounded-lg p-2 text-center">
                                            <p className="text-[8px] font-bold tracking-wider uppercase text-[#12306e]/40">
                                                {COPY.results.perUnitContains}
                                            </p>
                                            <p className="text-xs font-black text-[#12306e] mt-0.5">
                                                {result.perUnitMcg.toFixed(1)} MCG
                                            </p>
                                        </div>

                                        <div className="bg-[#f3f6fc] border border-[#12306e]/10 rounded-lg p-2 text-center">
                                            <p className="text-[8px] font-bold tracking-wider uppercase text-[#12306e]/40">
                                                {COPY.results.totalDoses}
                                            </p>
                                            <p className="text-xs font-black text-[#12306e] mt-0.5">
                                                {Math.floor(result.dosesPerVial)} {COPY.resultCard.doses}
                                            </p>
                                        </div>
                                    </div>

                                    {result.exceeds && (
                                        <p className="text-[10px] text-red-600 bg-amber-50 border border-amber-100 rounded-lg px-2.5 py-1.5 mt-2 leading-relaxed">
                                            {COPY.results.exceedsSyringe}
                                        </p>
                                    )}
                                </motion.div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center px-2 py-10">
                                    <div className="w-11 h-11 rounded-full bg-[#12306e]/8 flex items-center justify-center mb-3">
                                        <Syringe size={20} className="text-[#12306e]" />
                                    </div>
                                    <p className="text-xs sm:text-sm font-black text-[#12306e] tracking-wide mb-1">
                                        {COPY.results.awaitingTitle}
                                    </p>
                                    <p className="text-[11px] text-[#12306e]/50 leading-relaxed max-w-[24ch]">
                                        {COPY.results.awaitingDesc}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    <motion.p
                        {...reveal("bottom", 0.1)}
                        className="text-center text-[10px] text-[#12306e]/40 mt-8 max-w-2xl mx-auto px-4"
                    >
                        {COPY.disclaimer}
                    </motion.p>
                </section>
            </main>
            <Footer />
        </>
    );
}