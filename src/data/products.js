import testP100 from "@/images/oils/test-p-100.png";
import testE250 from "@/images/oils/test-e-250.png";
import deca250 from "@/images/oils/deca-250.png";
import npp100 from "@/images/oils/npp-100.png";
import testC250 from "@/images/oils/test-c-250.png";

export const products = [
    {
        id: "test-p-100",
        name: "Test-P 100",
        compound: "Testosterone Propionate",
        dose: "100 MG/ML",
        size: "10ml Multi-dose Vial",
        category: "Oils",
        image: testP100,
        description:
            "A fast-acting testosterone ester with a short half-life, making it ideal for protocols that need quicker onset and clearance. Formulated at 100mg/ml in a sterile, multi-dose vial and HPLC-verified before release.",
    },
    {
        id: "test-e-250",
        name: "Test-E 250",
        compound: "Testosterone Enanthate",
        dose: "250 MG/ML",
        size: "10ml Multi-dose Vial",
        category: "Oils",
        image: testE250,
        description:
            "A long-estered testosterone compound designed for stable, sustained release. One of the most established base compounds, dosed at 250mg/ml and independently lab-tested for identity and purity.",
    },
    {
        id: "deca-250",
        name: "Deca 250",
        compound: "Nandrolone Decanoate",
        dose: "250 MG/ML",
        size: "10ml Multi-dose Vial",
        category: "Oils",
        image: deca250,
        description:
            "A long-acting nandrolone ester known for its slow, steady release profile. Supplied at 250mg/ml in a multi-dose vial, manufactured under USP/BP guidelines with full batch traceability.",
    },
    {
        id: "npp-100",
        name: "NPP 100",
        compound: "Nandrolone Phenylpropionate",
        dose: "100 MG/ML",
        size: "10ml Multi-dose Vial",
        category: "Oils",
        image: npp100,
        description:
            "A shorter-estered nandrolone compound offering faster onset than its longer-acting counterparts. Dosed at 100mg/ml, ideal for protocols requiring more frequent, controlled dosing.",
    },
    {
        id: "test-c-250",
        name: "Test-C 250",
        compound: "Testosterone Cypionate",
        dose: "250 MG/ML",
        size: "10ml Multi-dose Vial",
        category: "Oils",
        image: testC250,
        description:
            "A long-estered testosterone compound similar in release profile to Enanthate, widely used as a stable base compound. Dosed at 250mg/ml and verified batch-by-batch via independent HPLC analysis.",
    },
];

export const categories = ["All", "Oils"];