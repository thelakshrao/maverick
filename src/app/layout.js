import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
    title: {
        default: "Maveric Lab — Advanced Peptide Therapy",
        template: "%s | Maveric Lab",
    },
    description:
        "Maveric Lab supplies pharmaceutical-grade research peptides and injectable compounds. Every batch is HPLC-tested, batch-verified, and traceable from source to seal.",
    keywords: ["peptides", "research peptides", "injectable compounds", "HPLC tested", "batch verified"],
    openGraph: {
        type: "website",
        url: "https://www.mavericklaboratorys.com/",
        title: "Maveric Lab — Advanced Peptide Therapy",
        description:
            "Pharmaceutical-grade research peptides. Every batch is HPLC-tested, batch-verified, and traceable from source to seal.",
        siteName: "Maveric Lab",
    },
    twitter: {
        card: "summary_large_image",
        title: "Maveric Lab — Advanced Peptide Therapy",
        description:
            "Pharmaceutical-grade research peptides. Every batch is HPLC-tested, batch-verified, and traceable from source to seal.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body data-navbar="light" className="min-h-full flex flex-col">
                {children}
            </body>
        </html>
    );
}