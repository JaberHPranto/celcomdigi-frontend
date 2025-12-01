import { SubNav } from "@/components/SubNav";
import { SectionHero } from "@/components/SectionHero";

const prepaidLinks = [
    { label: "Prepaid 5G NX", href: "/prepaid/nx" },
    { label: "Prepaid 5G UV", href: "/prepaid/uv" },
    { label: "Prepaid 5G DataSIM", href: "/prepaid/datasim" },
    { label: "SpeedSTREAM", href: "/prepaid/speedstream" },
];

export default function SpeedSTREAMPage() {
    return (
        <main className="min-h-screen bg-white">
            <SubNav links={prepaidLinks} />
            <SectionHero
                title="SpeedSTREAM"
                description="Uninterrupted high-speed streaming."
            />
            <div className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold mb-4">Streaming Passes</h2>
                <p className="text-gray-600 mb-8">For the binge watchers.</p>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="border p-6 rounded-xl bg-white shadow-sm">
                        <h3 className="font-bold text-xl mb-2">SpeedSTREAM 100</h3>
                        <p className="text-gray-500 mb-4">100GB Streaming</p>
                        <button className="w-full py-2 rounded-full border border-[#0095DA] text-[#0095DA] font-semibold hover:bg-[#0095DA] hover:text-white transition">Get Pass</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
