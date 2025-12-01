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

export default function WatchSIMPage() {
    return (
        <main className="min-h-screen bg-white">
            <SubNav links={postpaidLinks} />
            <SectionHero
                title="WatchSIM"
                description="Stay connected even without your phone."
            />
            <div className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold mb-4">Smartwatch Connectivity</h2>
                <p className="text-gray-600 mb-8">Pair your smartwatch with your postpaid plan.</p>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="border p-6 rounded-xl bg-white shadow-sm">
                        <h3 className="font-bold text-xl mb-2">WatchSIM</h3>
                        <p className="text-gray-500 mb-4">Share your number</p>
                        <button className="w-full py-2 rounded-full border border-[#0095DA] text-[#0095DA] font-semibold hover:bg-[#0095DA] hover:text-white transition">Subscribe</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
