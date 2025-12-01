import { SubNav } from "@/components/SubNav";
import { SectionHero } from "@/components/SectionHero";

const prepaidLinks = [
    { label: "Prepaid 5G NX", href: "/prepaid/nx" },
    { label: "Prepaid 5G UV", href: "/prepaid/uv" },
    { label: "Prepaid 5G DataSIM", href: "/prepaid/datasim" },
    { label: "SpeedSTREAM", href: "/prepaid/speedstream" },
];

export default function PrepaidNXPage() {
    return (
        <main className="min-h-screen bg-white">
            <SubNav links={prepaidLinks} />
            <SectionHero
                title="Prepaid 5G NX"
                description="Next generation prepaid for the youth."
            />
            <div className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold mb-4">NX Passes</h2>
                <p className="text-gray-600 mb-8">Unlimited 5G and social.</p>
                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="border p-6 rounded-xl bg-white shadow-sm">
                            <h3 className="font-bold text-xl mb-2">NX Plan {i}</h3>
                            <p className="text-gray-500 mb-4">Unlimited 5G</p>
                            <button className="w-full py-2 rounded-full border border-[#0095DA] text-[#0095DA] font-semibold hover:bg-[#0095DA] hover:text-white transition">Buy Now</button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
