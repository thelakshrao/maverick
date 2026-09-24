import MavericStats from "@/components/Mavericstats";
import Home from "../components/Home";
import OurStandards from "@/components/Ourstandards";
import PurityShowcase from "@/components/Purityshowcase";
import Navbar from "@/components/Navbar";
import MavericVerify from "@/components/Mavericverify";
import Footer from "@/components/Footer";
import DisclaimerModal from "@/components/DisclaimerModal";

export default function Page() {
  return (
    <main className="w-full min-h-dvh bg-[#eef1f6]">
      <DisclaimerModal />
      <Navbar />
      <Home />
      <MavericStats />
      <OurStandards />
      <PurityShowcase />
      <MavericVerify />
      <Footer />
    </main>
  );
}