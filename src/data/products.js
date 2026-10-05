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

import anavar10 from "@/images/orals/anavar-10.png";
import arimidex1 from "@/images/orals/arimidex-1.png";
import clen40 from "@/images/orals/clen-40.png";
import anadrol50 from "@/images/orals/anadrol-50.png";
import enclomiphene50 from "@/images/orals/enclomiphene-50.png";
import stana10 from "@/images/orals/stana-10.png";
import udiliv300 from "@/images/orals/udiliv-300.png";
import danabol10 from "@/images/orals/danabol-10.png";
import t340 from "@/images/orals/t3-40.png";

import igf1lr31 from "@/images/peptides/igf1-lr3-1.png";
import hgh100 from "@/images/peptides/hgh-100.png";
import frag17619120 from "@/images/peptides/frag-176-191-20.png";


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
    {
        id: "anavar-10",
        name: "Anavar 10",
        compound: "Oxandrolone",
        dose: "10 MG/TAB",
        size: "100 Tablets",
        category: "Orals",
        image: anavar10,
        description:
            "A mild, dihydrotestosterone-derived oral compound studied for lean tissue retention and strength with a comparatively low impact on natural hormone suppression. Dosed at 10mg per tablet, independently verified via high-performance liquid chromatography.",
        subtitle:
            "A mild oral compound valued for a favorable strength-to-side-effect profile.",
        overview:
            "Oxandrolone is a dihydrotestosterone-derived oral compound that does not aromatize to estrogen and carries one of the mildest anabolic:androgenic profiles among 17-alpha-alkylated orals studied in the literature. It is frequently referenced in research on lean tissue retention and strength where a lower-impact oral option is the variable of interest.",
        halfLife: "~9–10 hours",
        administration: "Oral",
        formula: "C19H30O3",
        benefits: [
            "Mild profile — one of the better-tolerated 17-alpha-alkylated orals in comparative literature",
            "Cannot be aromatized to estrogen",
            "Frequently referenced in strength and lean-tissue retention research",
            "Comparatively low impact on the hypothalamic-pituitary-gonadal axis relative to other oral compounds",
        ],
        mechanism:
            "Oxandrolone carries a 17-alpha-alkyl group that allows it to survive first-pass liver metabolism when taken orally, but it is otherwise a dihydrotestosterone derivative and cannot be converted to estrogen by aromatase. Its binding affinity for the androgen receptor is comparatively mild relative to other 17-alpha-alkylated compounds, which is the structural basis for its reputation as a lower-impact oral option in the research literature.",
    },
    {
        id: "arimidex-1",
        name: "Arimidex 1",
        compound: "Anastrozole",
        dose: "1 MG/TAB",
        size: "30 Tablets",
        category: "Orals",
        image: arimidex1,
        description:
            "A selective aromatase inhibitor studied for its ability to suppress estrogen conversion in research protocols involving aromatizable compounds. Dosed at 1mg per tablet, batch-verified for identity and purity.",
        subtitle:
            "A selective aromatase inhibitor used to study estrogen suppression.",
        overview:
            "Anastrozole is not an anabolic-androgenic steroid but an ancillary compound: a selective, non-steroidal aromatase inhibitor studied for its ability to block the conversion of testosterone and other aromatizable compounds into estrogen. It's a frequent reference compound in research examining estrogen-related side effects of aromatizable esters.",
        halfLife: "~2 days",
        administration: "Oral",
        formula: "C17H19N5",
        benefits: [
            "Selective inhibition of the aromatase enzyme rather than estrogen receptor blockade",
            "Frequently used as a reference ancillary compound in aromatization research",
            "Non-steroidal structure, structurally distinct from the anabolic compounds it's often studied alongside",
            "Well-characterized dose-response relationship in the pharmacological literature",
        ],
        mechanism:
            "Anastrozole works by reversibly binding the aromatase enzyme, the enzyme responsible for converting androgens into estrogens in peripheral tissue. By occupying this enzyme, it reduces circulating estrogen levels produced from aromatizable compounds, rather than acting on the androgen receptor directly — a distinct mechanism from the anabolic compounds it's frequently studied alongside.",
    },
    {
        id: "clen-40",
        name: "Clen 40",
        compound: "Clenbuterol",
        dose: "40 MCG/TAB",
        size: "100 Tablets",
        category: "Orals",
        image: clen40,
        description:
            "A beta-2 adrenergic agonist studied for its thermogenic and bronchodilating properties. Dosed at 40mcg per tablet, independently tested via high-performance liquid chromatography for identity and purity.",
        subtitle:
            "A beta-2 agonist studied for thermogenic and bronchodilating effects.",
        overview:
            "Clenbuterol is not a steroid but a beta-2 adrenergic agonist, originally developed as a bronchodilator and frequently referenced in research on thermogenesis and fat metabolism due to its stimulatory effect on beta-2 receptors. It has a notably long active window relative to its dosing interval, a property widely documented in the pharmacological literature.",
        halfLife: "~36 hours",
        administration: "Oral",
        formula: "C12H18Cl2N2O",
        benefits: [
            "Potent beta-2 adrenergic receptor agonist activity",
            "Long active window relative to dosing interval, well documented in the literature",
            "Originally characterized as a bronchodilator, with secondary thermogenic properties frequently studied",
            "Structurally distinct from anabolic-androgenic steroids — no interaction with the androgen receptor",
        ],
        mechanism:
            "Clenbuterol selectively stimulates beta-2 adrenergic receptors, which are found in smooth muscle tissue including the airways and in adipose tissue. Activation of these receptors relaxes bronchial smooth muscle, the basis for its original use as a bronchodilator, and increases the rate of lipolysis in fat cells, which is why it's frequently referenced in thermogenesis research.",
    },
    {
        id: "anadrol-50",
        name: "Anadrol 50",
        compound: "Oxymetholone",
        dose: "50 MG/TAB",
        size: "50 Tablets",
        category: "Orals",
        image: anadrol50,
        description:
            "A potent oral anabolic compound studied for rapid gains in mass and strength over short research windows. Dosed at 50mg per tablet, batch-verified for purity before release.",
        subtitle:
            "A potent oral compound studied for rapid mass and strength changes.",
        overview:
            "Oxymetholone is one of the most potent oral anabolic-androgenic steroids referenced in the literature, valued in research for producing rapid changes in mass and strength over comparatively short windows. Despite a dihydrotestosterone-related backbone, it does carry some estrogenic activity through a pathway distinct from classical aromatization, a point frequently discussed in comparative oral-compound research.",
        halfLife: "~8–9 hours",
        administration: "Oral",
        formula: "C21H32O3",
        benefits: [
            "Among the most potent oral anabolic-androgenic steroids studied in the literature",
            "Rapid onset of measurable effects relative to other oral compounds",
            "Frequently used as a high-potency reference compound in oral-dosing studies",
            "Distinct estrogenic pathway from classical aromatization, a point of interest in comparative research",
        ],
        mechanism:
            "Oxymetholone is a 17-alpha-alkylated dihydrotestosterone derivative, which allows oral bioavailability but also means it is processed by the liver on every pass, a metabolic burden well documented in the literature. Its estrogenic activity is not primarily driven by aromatase conversion but is thought to involve the compound or its metabolites interacting with the estrogen receptor directly, a mechanism that distinguishes it from aromatizable testosterone-based compounds.",
    },
    {
        id: "enclomiphene-50",
        name: "Enclomiphene 50",
        compound: "Enclomiphene Citrate",
        dose: "50 MG/TAB",
        size: "30 Tablets",
        category: "Orals",
        image: enclomiphene50,
        description:
            "A selective estrogen receptor modulator studied for its effect on the hypothalamic-pituitary-gonadal axis. Dosed at 50mg per tablet, independently verified for identity and purity.",
        subtitle:
            "A selective estrogen receptor modulator studied for hormonal axis research.",
        overview:
            "Enclomiphene Citrate is the trans-isomer of clomiphene citrate, a selective estrogen receptor modulator studied for its ability to block estrogen receptors in the hypothalamus, which in research models increases the signaling that drives the body's own hormone production. It is frequently referenced in post-cycle and hormonal-recovery research distinct from anabolic-androgenic steroid compounds.",
        halfLife: "~10 hours",
        administration: "Oral",
        formula: "C26H28ClNO",
        benefits: [
            "Selective estrogen receptor modulator activity, distinct from aromatase inhibition",
            "Frequently studied for its effect on endogenous hormone signaling",
            "The active trans-isomer of clomiphene citrate, isolated for a more targeted research profile",
            "Non-steroidal structure, structurally distinct from the anabolic-androgenic steroids it's often studied alongside",
        ],
        mechanism:
            "Enclomiphene works by blocking estrogen receptors in the hypothalamus. Because the hypothalamus uses circulating estrogen as a feedback signal to regulate downstream hormone production, blocking that receptor leads the body to interpret estrogen levels as lower than they are, increasing the signaling cascade that drives endogenous hormone production — the basis for its frequent use in hormonal-recovery research.",
    },
    {
        id: "stana-10",
        name: "Stana 10",
        compound: "Stanozolol",
        dose: "10 MG/TAB",
        size: "100 Tablets",
        category: "Orals",
        image: stana10,
        description:
            "An oral, 17-alpha-alkylated form of stanozolol studied for lean, dry changes in physique without significant water retention. Dosed at 10mg per tablet, independently lab-verified before release.",
        subtitle:
            "An oral form of stanozolol studied for lean, dry physique changes.",
        overview:
            "This oral tablet carries the same stanozolol molecule found in injectable preparations, but formulated with a 17-alpha-alkyl group so it survives oral administration and first-pass liver metabolism. Like its injectable counterpart, it carries the distinctive fused pyrazole ring in place of the standard steroid A-ring ketone and cannot be aromatized to estrogen.",
        halfLife: "~9 hours",
        administration: "Oral",
        formula: "C21H32N2O",
        benefits: [
            "Same fused pyrazole-ring structure as the injectable form, now orally bioavailable",
            "Not aromatizable to estrogen",
            "Frequently referenced in lean-tissue, low-water-retention research comparisons",
            "Short, fast-clearing activity window consistent with oral dosing studies",
        ],
        mechanism:
            "The 17-alpha-alkyl group added to this oral version allows the stanozolol molecule to resist being broken down on its first pass through the liver, which is what makes oral administration viable. The underlying pyrazole-ring structure — the same feature found in the injectable form — remains the primary driver of its receptor behavior and its inability to aromatize to estrogen.",
    },
    {
        id: "udiliv-300",
        name: "Udiliv 300",
        compound: "Ursodeoxycholic Acid",
        dose: "300 MG/TAB",
        size: "30 Tablets",
        category: "Orals",
        image: udiliv300,
        description:
            "A naturally occurring bile acid studied as a supportive compound for liver function during research protocols involving hepatically metabolized compounds. Dosed at 300mg per tablet, independently verified for purity.",
        subtitle:
            "A bile acid studied for its supportive role in liver-function research.",
        overview:
            "Ursodeoxycholic Acid is a naturally occurring bile acid, structurally unrelated to anabolic-androgenic steroids, studied for its role in altering bile composition and supporting hepatocyte function. It's frequently included in research protocols alongside orally active, liver-metabolized compounds as a supportive reference agent rather than a primary compound of interest.",
        halfLife: "~4–6 days",
        administration: "Oral",
        formula: "C24H40O4",
        benefits: [
            "A naturally occurring bile acid, structurally distinct from anabolic-androgenic steroids",
            "Studied for its role in supporting hepatocyte function during research protocols",
            "Frequently used as a supportive reference agent alongside hepatically metabolized compounds",
            "Well-characterized pharmacokinetic profile in the hepatology literature",
        ],
        mechanism:
            "Ursodeoxycholic acid works by changing the composition of bile to be less damaging to liver cell membranes and by reducing the proportion of more cytotoxic bile acids in circulation. This supportive, non-hormonal mechanism is why it's frequently referenced as an adjunct compound in research protocols involving substances that place a metabolic burden on the liver, rather than as a primary research compound itself.",
    },
    {
        id: "danabol-10",
        name: "Danabol 10",
        compound: "Metandienone",
        dose: "10 MG/TAB",
        size: "100 Tablets",
        category: "Orals",
        image: danabol10,
        description:
            "A fast-acting oral anabolic compound and one of the most widely referenced oral anabolic-androgenic steroids in the literature. Dosed at 10mg per tablet, batch-verified for identity and purity.",
        subtitle:
            "A fast-acting, extensively studied oral anabolic compound.",
        overview:
            "Metandienone, commonly known by the brand name Dianabol, is one of the earliest and most extensively documented oral anabolic-androgenic steroids in the research literature. It is a testosterone derivative with an added double bond that both slows its metabolism and allows for some aromatization to estrogen, a combination that produces its characteristically fast onset of measurable effects.",
        halfLife: "~4.5–6 hours",
        administration: "Oral",
        formula: "C20H28O2",
        benefits: [
            "One of the most extensively documented oral anabolic-androgenic steroids in the literature",
            "Fast onset of measurable effects relative to longer-estered injectable compounds",
            "Frequently used as a historical reference compound in oral-steroid research",
            "Well-characterized aromatization and metabolic pathway",
        ],
        mechanism:
            "Metandienone's added carbon-1,2 double bond slows its breakdown relative to unmodified testosterone while still permitting some conversion to estrogen via aromatase, unlike many other 17-alpha-alkylated orals. Combined with its 17-alpha-alkylation for oral bioavailability, this structural profile is what produces the fast, pronounced onset of effects it is most referenced for in the literature.",
    },
    {
        id: "t3-40",
        name: "T3 40",
        compound: "Triiodothyronine",
        dose: "40 MCG/TAB",
        size: "100 Tablets",
        category: "Orals",
        image: t340,
        description:
            "A synthetic form of the thyroid hormone triiodothyronine, studied for its role in regulating metabolic rate during research protocols. Dosed at 40mcg per tablet, independently verified for purity.",
        subtitle:
            "A synthetic thyroid hormone studied for its role in metabolic rate.",
        overview:
            "Triiodothyronine, commonly abbreviated T3, is the synthetic form of one of the body's two primary thyroid hormones and is structurally unrelated to anabolic-androgenic steroids. It is frequently referenced in metabolic-rate research due to its direct, fast-acting influence on cellular metabolism, in contrast to the body's naturally slower-converting precursor hormone, thyroxine.",
        halfLife: "~1 day",
        administration: "Oral",
        formula: "C15H12I3NO4",
        benefits: [
            "Direct, fast-acting thyroid hormone activity, unlike the slower-converting precursor hormone",
            "Frequently referenced in metabolic-rate and energy-expenditure research",
            "Structurally unrelated to anabolic-androgenic steroids",
            "Well-characterized receptor-binding behavior in the endocrinology literature",
        ],
        mechanism:
            "Triiodothyronine binds directly to thyroid hormone receptors inside the cell nucleus, where it influences the transcription of genes that regulate metabolic rate. Because it is the already-active form of thyroid hormone — rather than thyroxine, which the body must first convert into triiodothyronine — its effects on metabolism are faster and more direct, which is the basis for its frequent use in metabolic-rate research.",
    },

    {
        id: "igf1-lr3-1",
        name: "IGF-1 LR3 1MG",
        compound: "Insulin-like Growth Factor-1 Long R3",
        dose: "100 MCG/VIAL",
        size: "10 Vials (1 MG total)",
        category: "Peptides",
        image: igf1lr31,
        description:
            "A long-acting analogue of insulin-like growth factor-1 studied for its extended activity and reduced binding to IGF-binding proteins. Supplied as 10 nitrogen-filled vials of 100mcg each, batch-verified for identity and purity.",
        subtitle:
            "A modified IGF-1 analogue engineered for a longer active window.",
        overview:
            "IGF-1 LR3 is an 83-amino-acid analogue of human insulin-like growth factor-1, modified with an arginine substitution at position 3 and a 13-amino-acid N-terminal extension. These changes sharply reduce its affinity for IGF-binding proteins, which in research models leaves more of the peptide free to engage the IGF-1 receptor and extends its activity compared with native IGF-1.",
        halfLife: "~20–30 hours",
        administration: "Injectable (lyophilized, reconstituted)",
        formula: "C400H625N111O115S9",
        benefits: [
            "Extended activity window — substantially longer than native IGF-1 in the literature",
            "Reduced IGF-binding-protein affinity — more free peptide available to the receptor",
            "Well-characterized IGF-1 receptor signalling in cell-culture and preclinical models",
            "Frequently used as a reference analogue in growth-factor signalling research",
        ],
        mechanism:
            "IGF-1 LR3 binds the IGF-1 receptor and activates downstream PI3K/Akt and MAPK signalling pathways involved in cell growth, proliferation, and protein synthesis. Its N-terminal extension and arginine substitution at position 3 weaken its binding to IGF-binding proteins, which normally sequester native IGF-1 — this is the structural basis for its longer-lasting activity in research models.",
    },
    {
        id: "hgh-100",
        name: "HGH 100 IU",
        compound: "Somatropin",
        dose: "10 IU/VIAL",
        size: "10 Vials (100 IU total)",
        category: "Peptides",
        image: hgh100,
        description:
            "A recombinant human growth hormone studied across metabolic and growth-signalling research. Supplied as 10 nitrogen-filled vials of 10IU each, batch-verified for identity and purity.",
        subtitle:
            "A recombinant 191-amino-acid growth hormone, the reference standard in GH research.",
        overview:
            "Somatropin is the recombinant form of human growth hormone, a 191-amino-acid, single-chain protein identical in sequence to the pituitary-derived hormone. It is one of the most extensively characterized peptide hormones in the endocrinology literature and serves as the primary reference compound in growth hormone signalling research.",
        halfLife: "~3–4 hours (subcutaneous)",
        administration: "Injectable (lyophilized, reconstituted)",
        formula: "C990H1528N262O300S7",
        benefits: [
            "Identical amino-acid sequence to endogenous human growth hormone",
            "Extensively documented pharmacokinetics and receptor biology",
            "Stimulates hepatic IGF-1 production, a key readout in GH-axis research",
            "Standard reference compound for growth-hormone signalling studies",
        ],
        mechanism:
            "Somatropin binds the growth hormone receptor, triggering JAK2/STAT5 signalling in target tissues. A major downstream effect is the stimulation of IGF-1 synthesis in the liver, which mediates many of the growth-promoting effects attributed to GH, while GH itself also acts directly on adipose tissue and metabolism.",
    },
    {
        id: "frag-176-191-20",
        name: "HGH Fragment 176-191",
        compound: "HGH Fragment 176-191",
        dose: "2 MG/VIAL",
        size: "10 Vials (20 MG total)",
        category: "Peptides",
        image: frag17619120,
        description:
            "A modified C-terminal fragment of human growth hormone studied for its role in lipid metabolism. Supplied as 10 nitrogen-filled vials of 2mg each, batch-verified for identity and purity.",
        subtitle:
            "A 16-amino-acid GH fragment studied for lipid-metabolism research.",
        overview:
            "HGH Fragment 176-191 corresponds to the C-terminal region of the growth hormone molecule (amino acids 176 to 191). It has been studied as an isolated fragment because, in research models, it appears to retain GH's effects on lipid metabolism without the hormone's growth-promoting or insulin-antagonizing activity.",
        halfLife: "Short-acting (under ~1 hour)",
        administration: "Injectable (lyophilized, reconstituted)",
        formula: "C78H125N23O23S2",
        benefits: [
            "Isolated fragment of the GH molecule — does not carry the full hormone's activity profile",
            "Studied for effects on lipolysis and fat metabolism in preclinical models",
            "Reported not to alter IGF-1 levels or glucose handling in the literature",
            "Small, well-defined peptide suited to structure-activity research",
        ],
        mechanism:
            "In preclinical studies the fragment is reported to stimulate lipolysis and inhibit lipogenesis in adipose tissue, mimicking the metabolic action of native GH on fat cells without binding the GH receptor in the same way as the full-length hormone. Its short sequence makes it a useful tool for isolating the lipid-metabolism domain of growth hormone.",
    },
];

export const categories = ["All", "Oils", "Orals", "Peptides"];