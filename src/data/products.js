import testP100 from "@/images/oils/test-p-100.png";
import testE250 from "@/images/oils/test-e-250.png";
import deca250 from "@/images/oils/deca-250.png";
import npp100 from "@/images/oils/npp-100.png";
import testC250 from "@/images/oils/test-c-250.png";
import primo100 from "@/images/oils/primo-100.png";
import trenA100 from "@/images/oils/tren-a-100.png";
import trenE200 from "@/images/oils/tren-e-200.png";
import winstrol100 from "@/images/oils/winstrol-100.png";
import equipoise250 from "@/images/oils/equipoise-250.png";
import masteron100 from "@/images/oils/masteron-100.png";

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
            "A fast-acting testosterone ester with a short half-life, making it ideal for protocols that need quicker onset and clearance. Formulated at 100mg/ml in a sterile, multi-dose vial and verified via high-performance liquid chromatography before release.",
        subtitle:
            "A short propionate ester chosen for its fast onset and rapid clearance.",
        overview:
            "Testosterone Propionate carries the shortest common ester chain among injectable testosterone research preparations, which shortens both the time to peak serum concentration and the time to full clearance. This makes it a frequent reference compound in pharmacokinetic research where investigators want tighter, more frequent control over circulating hormone levels rather than the smoother, longer-acting profile of enanthate or cypionate esters.",
        halfLife: "~2–3 days",
        administration: "Injectable",
        formula: "C22H32O3",
        benefits: [
            "Rapid onset — reaches peak serum concentration faster than longer-chain esters",
            "Short clearance window — useful where researchers need to adjust dosing schedules quickly",
            "Well-characterized pharmacokinetics — one of the most extensively studied testosterone esters",
            "Minimal ester-chain mass — a higher proportion of each dose is bioavailable testosterone",
        ],
        mechanism:
            "Like all testosterone esters, propionate is hydrolyzed by plasma and tissue esterases once injected, releasing free testosterone that binds the androgen receptor. The propionate ester's short carbon chain is cleaved quickly, producing a sharper peak in serum testosterone and a faster return to baseline compared with longer-chain esters such as enanthate or cypionate — the reason it's a common choice in short-interval dosing studies.",
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
        subtitle:
            "A long-estered testosterone compound built for smooth, sustained serum levels.",
        overview:
            "Testosterone Enanthate is among the most widely referenced testosterone esters in the literature, valued for producing a slow release curve that keeps serum testosterone relatively stable between doses. Its seven-carbon ester chain slows hydrolysis considerably compared with propionate, extending the interval between injections without requiring frequent dosing adjustments.",
        halfLife: "~7–10 days",
        administration: "Injectable",
        formula: "C26H40O3",
        benefits: [
            "Stable release curve — smooths out the peaks and troughs seen with shorter esters",
            "Established reference compound — one of the most studied testosterone esters in the literature",
            "Extended dosing interval — fewer injections needed to maintain steady serum levels",
            "Predictable pharmacokinetics — widely used as a baseline in comparative ester studies",
        ],
        mechanism:
            "Enanthate's seven-carbon ester chain is cleaved gradually by esterases in muscle tissue and plasma, releasing free testosterone over roughly a week rather than in a sharp spike. This produces the smoother serum concentration curve enanthate is known for, and is the primary reason it's used as a reference compound when comparing the release kinetics of other esters.",
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
            "A long-acting nandrolone ester known for its slow, steady release profile. Supplied at 250mg/ml in a multi-dose vial, manufactured under United States Pharmacopeia and British Pharmacopoeia guidelines with full batch traceability.",
        subtitle:
            "A long-acting nandrolone ester with one of the slowest release profiles studied.",
        overview:
            "Nandrolone Decanoate pairs the nandrolone steroid backbone with a ten-carbon decanoate ester, producing one of the longest release curves among commonly studied injectable anabolic-androgenic steroid compounds. Nandrolone itself differs from testosterone by a single missing carbon at the 19 position, a structural change that alters its receptor binding and aromatization profile relative to testosterone.",
        halfLife: "~15 days",
        administration: "Injectable",
        formula: "C28H44O3",
        benefits: [
            "Very long release profile — among the slowest-clearing esters commonly studied",
            "Reduced aromatization relative to testosterone due to the 19-nor backbone",
            "Well-documented receptor binding affinity in the nandrolone literature",
            "Stable serum levels with infrequent dosing intervals",
        ],
        mechanism:
            "The decanoate ester's long carbon chain slows enzymatic hydrolysis substantially, spreading nandrolone release over roughly two to three weeks per injection. Nandrolone's 19-nor structure — the absence of a carbon at the 19 position relative to testosterone — changes how it's metabolized and reduces its conversion to estrogen via aromatase, a distinguishing feature researchers frequently cite when comparing it with testosterone esters.",
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
        subtitle:
            "A faster-clearing nandrolone ester for shorter-interval research protocols.",
        overview:
            "NPP pairs the same 19-nor nandrolone backbone as Deca with a shorter phenylpropionate ester, producing a markedly faster release curve. This makes it useful in research settings where investigators want the receptor and metabolic profile of nandrolone without the multi-week clearance tail of the decanoate ester.",
        halfLife: "~4–5 days",
        administration: "Injectable",
        formula: "C27H34O3",
        benefits: [
            "Faster clearance than decanoate — full clearance in days rather than weeks",
            "Same 19-nor nandrolone backbone and receptor profile as Deca",
            "Useful for shorter-interval pharmacokinetic comparisons",
            "Reduced aromatization relative to testosterone-based esters",
        ],
        mechanism:
            "Phenylpropionate is a shorter, more polar ester than decanoate, so plasma esterases hydrolyze it considerably faster, releasing free nandrolone over days rather than weeks. The underlying steroid — and therefore its androgen receptor binding and metabolic behavior — is identical to Nandrolone Decanoate; only the release kinetics differ.",
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
            "A long-estered testosterone compound similar in release profile to Enanthate, widely used as a stable base compound. Dosed at 250mg/ml and verified batch-by-batch via independent high-performance liquid chromatography analysis.",
        subtitle:
            "A long-estered testosterone compound closely related to enanthate.",
        overview:
            "Testosterone Cypionate is structurally and kinetically very close to enanthate, differing only in the ester's carbon arrangement. It's one of the two most-referenced long esters in testosterone pharmacokinetic literature, producing a similarly smooth, extended release curve.",
        halfLife: "~8 days",
        administration: "Injectable",
        formula: "C27H40O3",
        benefits: [
            "Extended release profile similar to enanthate",
            "Extensively documented in comparative ester pharmacokinetic studies",
            "Stable serum concentrations across the dosing interval",
            "Structurally close to enanthate, useful for direct ester comparison research",
        ],
        mechanism:
            "Cypionate's cyclopentylpropionate ester chain is similar in length and lipophilicity to enanthate's heptanoate chain, so the two esters produce closely comparable release curves once hydrolyzed by esterases. The small structural difference between the two esters is often used in research directly comparing ester-chain effects on release kinetics.",
    },
    {
        id: "primo-100",
        name: "Primo 100",
        compound: "Metenolone Enanthate",
        dose: "100 MG/ML",
        size: "10ml Multi-dose Vial",
        category: "Oils",
        image: primo100,
        description:
            "A mild, long-estered anabolic compound known for a slow, steady release with minimal aromatization. Dosed at 100mg/ml and independently tested via high-performance liquid chromatography for identity and purity.",
        subtitle:
            "A mild, dihydrotestosterone-derived compound studied for its low aromatization profile.",
        overview:
            "Metenolone (methenolone) is a dihydrotestosterone-derived anabolic steroid that cannot be aromatized to estrogen, distinguishing it structurally from testosterone-based esters. Its enanthate ester extends the release profile, producing a slow, steady curve consistent with once- to twice-weekly research dosing intervals.",
        halfLife: "~10–14 days",
        administration: "Injectable",
        formula: "C27H42O3",
        benefits: [
            "Cannot be aromatized to estrogen — a dihydrotestosterone-derived structure",
            "Considered among the milder anabolic:androgenic profiles in the literature",
            "Long enanthate ester for a steady, extended release curve",
            "Frequently referenced in low-androgenic-index research comparisons",
        ],
        mechanism:
            "Metenolone is a 1-methylated dihydrotestosterone derivative, a structural feature that blocks aromatase from acting on it, so it does not convert to estrogen the way testosterone-based compounds can. The enanthate ester attached to it is hydrolyzed slowly, giving a release curve comparable in length to testosterone enanthate.",
    },
    {
        id: "tren-a-100",
        name: "Tren-A 100",
        compound: "Trenbolone Acetate",
        dose: "100 MG/ML",
        size: "10ml Multi-dose Vial",
        category: "Oils",
        image: trenA100,
        description:
            "A fast-acting, short-estered compound valued for its potency and rapid clearance. Formulated at 100mg/ml in a sterile multi-dose vial, batch-verified for identity and purity.",
        subtitle:
            "A fast-acting trenbolone ester with a short, sharp release curve.",
        overview:
            "Trenbolone Acetate pairs the trenbolone steroid — itself a potent 19-nor compound structurally related to nandrolone — with the shortest common ester, producing rapid onset and clearance. It's one of the most extensively studied 19-nor compounds in anabolic steroid research literature.",
        halfLife: "~1–3 days",
        administration: "Injectable",
        formula: "C20H24O3",
        benefits: [
            "Rapid onset and clearance due to the short acetate ester",
            "High receptor binding affinity relative to testosterone in the literature",
            "Cannot aromatize to estrogen",
            "Extensively referenced in comparative 19-nor compound research",
        ],
        mechanism:
            "Trenbolone's structure includes additional double bonds relative to nandrolone that substantially increase its androgen receptor binding affinity in in-vitro studies. The acetate ester attached to it is hydrolyzed quickly, giving trenbolone acetate one of the shortest release curves among 19-nor esters studied.",
    },
    {
        id: "tren-e-200",
        name: "Tren-E 200",
        compound: "Trenbolone Enanthate",
        dose: "200 MG/ML",
        size: "10ml Multi-dose Vial",
        category: "Oils",
        image: trenE200,
        description:
            "A long-estered version offering a slower, more stable release than the acetate form. Dosed at 200mg/ml, manufactured under United States Pharmacopeia and British Pharmacopoeia guidelines with full batch traceability.",
        subtitle: "A long-estered trenbolone compound for extended-interval research.",
        overview:
            "Trenbolone Enanthate carries the same potent 19-nor trenbolone backbone as the acetate version, but its longer enanthate ester extends the release curve considerably, reducing the injection frequency needed to maintain stable serum levels in research protocols.",
        halfLife: "~7–10 days",
        administration: "Injectable",
        formula: "C25H34O3",
        benefits: [
            "Same high-affinity trenbolone backbone as the acetate ester",
            "Extended release curve reduces required dosing frequency",
            "Cannot aromatize to estrogen",
            "Useful for longer-interval pharmacokinetic study designs",
        ],
        mechanism:
            "The enanthate ester slows hydrolysis considerably relative to acetate, spreading trenbolone release over roughly a week to ten days instead of one to three days. The trenbolone molecule itself, and therefore its receptor-binding behavior, is unchanged between the two ester forms — only the release kinetics differ.",
    },
    {
        id: "winstrol-100",
        name: "Winstrol 100",
        compound: "Stanozolol",
        dose: "100 MG/ML",
        size: "10ml Multi-dose Vial",
        category: "Oils",
        image: winstrol100,
        description:
            "An injectable anabolic compound known for producing lean, dry gains without significant water retention. Dosed at 100mg/ml and independently lab-verified before release.",
        subtitle:
            "An unesterified dihydrotestosterone-derived compound with a distinctive heterocyclic structure.",
        overview:
            "Stanozolol is structurally distinct from most injectable anabolic-androgenic steroids in this line: rather than an esterified steroid, it carries a fused pyrazole ring in place of the standard A-ring ketone, and is suspended in oil rather than released via ester hydrolysis. This gives it a comparatively short window of activity relative to esterified compounds.",
        halfLife: "~24 hours",
        administration: "Injectable",
        formula: "C21H32N2O",
        benefits: [
            "Distinctive pyrazole-ring structure not shared by ester-based compounds in this line",
            "Not aromatizable to estrogen",
            "Short, fast-clearing activity window",
            "Frequently referenced in dihydrotestosterone-derivative comparison research",
        ],
        mechanism:
            "Unlike the esterified compounds in this line, stanozolol has no ester chain to hydrolyze — the fused pyrazole ring at the A-ring replaces the ketone found in testosterone-derived steroids, and is itself the primary structural feature governing its receptor behavior and metabolism. Because there's no ester to slow release, its activity window is comparatively short and closely tied to injection frequency.",
    },
    {
        id: "equipoise-250",
        name: "Equipoise 250",
        compound: "Boldenone Undecylenate",
        dose: "250 MG/ML",
        size: "10ml Multi-dose Vial",
        category: "Oils",
        image: equipoise250,
        description:
            "A long-estered anabolic compound known for a slow, gradual release and steady lean tissue support. Dosed at 250mg/ml and independently verified via high-performance liquid chromatography batch by batch.",
        subtitle: "A long-estered boldenone compound with an extended release curve.",
        overview:
            "Boldenone is structurally a dehydrogenated analogue of testosterone (a 1,2-double bond variant), attached here to a long undecylenate ester that produces one of the longest release curves in this catalogue. It's frequently referenced in comparative aromatization studies given its lower conversion rate to estrogen relative to testosterone.",
        halfLife: "~14 days",
        administration: "Injectable",
        formula: "C30H44O3",
        benefits: [
            "Very long release curve from the undecylenate ester",
            "Lower aromatization rate than testosterone in comparative studies",
            "Structurally close to testosterone, useful for direct comparison research",
            "Stable serum levels across extended dosing intervals",
        ],
        mechanism:
            "Boldenone differs from testosterone by a single double bond at the 1,2 position of the A-ring, which measurably reduces — without eliminating — its rate of aromatization to estrogen relative to unmodified testosterone. The undecylenate ester attached to it is among the longest-chain esters used in this catalogue, hydrolyzing slowly enough to sustain release over multiple weeks.",
    },
    {
        id: "masteron-100",
        name: "Masteron 100",
        compound: "Drostanolone Propionate",
        dose: "100 MG/ML",
        size: "10ml Multi-dose Vial",
        category: "Oils",
        image: masteron100,
        description:
            "A fast-acting dihydrotestosterone-derived compound valued for its hardening effect with minimal water retention. Formulated at 100mg/ml in a sterile multi-dose vial, batch-verified for purity.",
        subtitle:
            "A dihydrotestosterone-derived compound studied for its hardening effect and short ester.",
        overview:
            "Drostanolone is a dihydrotestosterone-derived compound that cannot be aromatized to estrogen, structurally distinguished by a 2-methyl group that also confers resistance to metabolic breakdown. Paired here with the short propionate ester, it produces a fast onset and clearance profile consistent with frequent-interval research dosing.",
        halfLife: "~2–3 days",
        administration: "Injectable",
        formula: "C23H36O3",
        benefits: [
            "Cannot be aromatized to estrogen — a dihydrotestosterone-derived structure",
            "2-methylation confers resistance to metabolic breakdown in the literature",
            "Short propionate ester for fast onset and clearance",
            "Frequently referenced in anti-estrogenic anabolic-androgenic steroid comparison research",
        ],
        mechanism:
            "Drostanolone's 2-methyl group is the key structural difference from unmodified dihydrotestosterone, and is what gives it measurable metabolic stability relative to non-methylated dihydrotestosterone derivatives. Combined with the short propionate ester, serum drostanolone rises and clears quickly relative to longer-estered compounds in this catalogue.",
    },
];

export const categories = ["All", "Oils"];