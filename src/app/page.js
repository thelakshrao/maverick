import MavericStats from "@/components/Mavericstats";
import Home from "../components/Home";
import OurStandards from "@/components/Ourstandards";
import PurityShowcase from "@/components/Purityshowcase";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <Home />
      <MavericStats />
      <OurStandards />
      <PurityShowcase />
    </div>
  );
}