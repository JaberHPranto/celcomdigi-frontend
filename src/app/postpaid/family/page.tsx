import { SubNav } from "@/components/SubNav";
import { SectionHero } from "@/components/SectionHero";

const postpaidLinks = [
    { label: "Postpaid 5G", href: "/postpaid" },
    { label: "Postpaid 5G SE", href: "/postpaid/se" },
    { label: "Postpaid 5G Family", href: "/postpaid/family" },
    { label: "Postpaid 5G DataSIM", href: "/postpaid/datasim" },
    { label: "GadgetSIM", href: "/postpaid/gadgetsim" },
    { label: "WatchSIM", href: "/postpaid/watchsim" },
];

export default function PostpaidFamilyPage() {
    return (
        <main className="min-h-screen bg-white">
            <SubNav links={postpaidLinks} />
            <SectionHero
                title="Postpaid 5G Family"
                description="Share the joy with family lines for everyone."
            />
            <div className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold mb-4">Family Lines</h2>
                <p className="text-gray-600 mb-8">Add family lines to your principal plan and save more.</p>
                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="border p-6 rounded-xl bg-white shadow-sm">
                            <h3 className="font-bold text-xl mb-2">Family {i}</h3>
                            <p className="text-gray-500 mb-4">Unlimited Calls & SMS</p>
                            <button className="w-full py-2 rounded-full border border-[#0095DA] text-[#0095DA] font-semibold hover:bg-[#0095DA] hover:text-white transition">Add Line</button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
