import { SubNav } from "@/components/SubNav";
import { SectionHero } from "@/components/SectionHero";

const prepaidLinks = [
    { label: "Prepaid 5G NX", href: "/prepaid/nx" },
    { label: "Prepaid 5G UV", href: "/prepaid/uv" },
    { label: "Prepaid 5G DataSIM", href: "/prepaid/datasim" },
    { label: "SpeedSTREAM", href: "/prepaid/speedstream" },
];

export default function PrepaidPage() {
    return (
        <main className="min-h-screen bg-white">
            <SubNav links={prepaidLinks} />
            <SectionHero
                title="Prepaid 5G"
                description="Get the best value prepaid plans with high-speed internet."
            />
            <div className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold mb-4">Prepaid Packs</h2>
                <p className="text-gray-600">Choose a prepaid pack that gives you more for less.</p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="border p-6 rounded-xl bg-white shadow-sm">
                            <h3 className="font-bold text-xl mb-2">Prepaid Pack {i}</h3>
                            <p className="text-gray-500">Coming soon...</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
