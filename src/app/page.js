import MavericStats from "@/components/Mavericstats";
import Home from "../components/Home";
import OurStandards from "@/components/Ourstandards";
import PurityShowcase from "@/components/Purityshowcase";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <main className="w-full min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Home />
      <MavericStats />
      <OurStandards />
      <PurityShowcase />
    </main>
  );
}