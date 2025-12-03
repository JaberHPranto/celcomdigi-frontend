import { SubNav } from "@/components/SubNav";
import { SectionHero } from "@/components/SectionHero";

const oneLinks = [
  { label: "One Ultra", href: "/postpaid/one-ultra" },
  { label: "One Pro", href: "/postpaid/one-pro" },
];

export default function OneUltraPage() {
  return (
    <main className="min-h-screen bg-white">
      <SubNav links={oneLinks} />
      <SectionHero
        title="CelcomDigi One Ultra"
        description="The ultimate all-in-one plan with Fibre, 5G, and Devices."
      />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-4">One Ultra Benefits</h2>
        <p className="text-gray-600 mb-8">
          Experience the power of convergence.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border p-6 rounded-xl bg-white shadow-sm">
            <h3 className="font-bold text-xl mb-2">Ultra Speed</h3>
            <p className="text-gray-500 mb-4">300Mbps Fibre + 5G</p>
            <button className="w-full py-2 rounded-full border border-[#0095DA] text-[#0095DA] font-semibold hover:bg-[#0095DA] hover:text-white transition">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
