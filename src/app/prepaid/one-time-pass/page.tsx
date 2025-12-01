import { SubNav } from "@/components/SubNav";
import { SectionHero } from "@/components/SectionHero";

// One-Time Pass is an add-on, might not be in the main prepaid nav but good to have consistency
const prepaidLinks = [
    { label: "Prepaid 5G NX", href: "/prepaid/nx" },
    { label: "Prepaid 5G UV", href: "/prepaid/uv" },
    { label: "Prepaid 5G DataSIM", href: "/prepaid/datasim" },
    { label: "SpeedSTREAM", href: "/prepaid/speedstream" },
];

export default function OneTimePassPage() {
    return (
        <main className="min-h-screen bg-white">
            <SubNav links={prepaidLinks} />
            <SectionHero
                title="One-Time Pass"
                description="Boost your quota when you need it."
            />
            <div className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold mb-4">Add-On Passes</h2>
                <p className="text-gray-600 mb-8">Hourly, daily, and weekly passes.</p>
                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="border p-6 rounded-xl bg-white shadow-sm">
                            <h3 className="font-bold text-xl mb-2">Quota Topup {i}</h3>
                            <p className="text-gray-500 mb-4">Extra GBs</p>
                            <button className="w-full py-2 rounded-full border border-[#0095DA] text-[#0095DA] font-semibold hover:bg-[#0095DA] hover:text-white transition">Buy</button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
