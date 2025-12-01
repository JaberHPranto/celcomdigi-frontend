import { SubNav } from "@/components/SubNav";
import { SectionHero } from "@/components/SectionHero";

const fibreLinks = [
    { label: "Home Fibre", href: "/fibre/home-fibre" },
    { label: "Fibre-To-The-Room (FTTR)", href: "/fibre/fttr" },
    { label: "Home WiFi", href: "/fibre/home-wifi" },
];

export default function FibrePage() {
    return (
        <main className="min-h-screen bg-white">
            <SubNav links={fibreLinks} />
            <SectionHero
                title="CelcomDigi Fibre"
                description="Ultra-fast home fibre internet for the whole family."
            />
            <div className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold mb-4">Fibre Plans</h2>
                <p className="text-gray-600">Connect your home with our reliable fibre broadband.</p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="border p-6 rounded-xl bg-white shadow-sm">
                            <h3 className="font-bold text-xl mb-2">Fibre Plan {i}</h3>
                            <p className="text-gray-500">Coming soon...</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
