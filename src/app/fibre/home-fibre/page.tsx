import { SubNav } from "@/components/SubNav";
import { SectionHero } from "@/components/SectionHero";

const fibreLinks = [
    { label: "Home Fibre", href: "/fibre/home-fibre" },
    { label: "Fibre-To-The-Room (FTTR)", href: "/fibre/fttr" },
    { label: "Home WiFi", href: "/fibre/home-wifi" },
];

export default function HomeFibrePage() {
    return (
        <main className="min-h-screen bg-white">
            <SubNav links={fibreLinks} />
            <SectionHero
                title="Home Fibre"
                description="Experience the speed of fibre in your home."
            />
            <div className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold mb-4">Fibre Plans</h2>
                <p className="text-gray-600 mb-8">Choose the speed that fits your family.</p>
                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="border p-6 rounded-xl bg-white shadow-sm">
                            <h3 className="font-bold text-xl mb-2">300Mbps Plan</h3>
                            <p className="text-gray-500 mb-4">Perfect for streaming</p>
                            <button className="w-full py-2 rounded-full border border-[#0095DA] text-[#0095DA] font-semibold hover:bg-[#0095DA] hover:text-white transition">Check Coverage</button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
