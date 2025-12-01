import { SubNav } from "@/components/SubNav";
import { SectionHero } from "@/components/SectionHero";

const oneLinks = [
    { label: "One Ultra", href: "/postpaid/one-ultra" },
    { label: "One Pro", href: "/postpaid/one-pro" },
];

export default function OneProPage() {
    return (
        <main className="min-h-screen bg-white">
            <SubNav links={oneLinks} />
            <SectionHero
                title="CelcomDigi One Pro"
                description="Professional grade connectivity for power users."
            />
            <div className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold mb-4">One Pro Features</h2>
                <p className="text-gray-600 mb-8">Maximize your productivity.</p>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="border p-6 rounded-xl bg-white shadow-sm">
                        <h3 className="font-bold text-xl mb-2">Pro Performance</h3>
                        <p className="text-gray-500 mb-4">Priority Network Access</p>
                        <button className="w-full py-2 rounded-full border border-[#0095DA] text-[#0095DA] font-semibold hover:bg-[#0095DA] hover:text-white transition">Get Pro</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
