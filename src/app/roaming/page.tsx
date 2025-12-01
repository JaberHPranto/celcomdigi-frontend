import { roamingContent } from "@/data/site-content";
import { Check, Globe, Zap, Smartphone, Phone } from "lucide-react";
import Link from "next/link";

export default function RoamingPage() {
    const { hero, whyWin, howToBuy, faq } = roamingContent;

    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-blue-900 py-20 text-white">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{hero.title}</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">{hero.description}</p>
                </div>
            </section>

            {/* Why Win */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Why roaming passes win, every time</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {whyWin.map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm text-center">
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#0095DA]">
                                    {index === 0 ? <Zap /> : index === 1 ? <Globe /> : <Check />}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How to Buy */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">How to buy a roaming pass</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Smartphone className="w-8 h-8 text-[#0095DA]" />
                                <h3 className="text-2xl font-bold">Via CelcomDigi App</h3>
                            </div>
                            <ol className="space-y-4 relative border-l border-gray-200 ml-3">
                                {howToBuy.app.map((step, index) => (
                                    <li key={index} className="ml-6">
                                        <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-4 ring-white text-xs font-bold text-[#0095DA]">
                                            {index + 1}
                                        </span>
                                        <p className="text-gray-700">{step}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Phone className="w-8 h-8 text-[#0095DA]" />
                                <h3 className="text-2xl font-bold">Via USSD (Overseas only)</h3>
                            </div>
                            <ol className="space-y-4 relative border-l border-gray-200 ml-3">
                                {howToBuy.ussd.map((step, index) => (
                                    <li key={index} className="ml-6">
                                        <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-4 ring-white text-xs font-bold text-[#0095DA]">
                                            {index + 1}
                                        </span>
                                        <p className="text-gray-700">{step}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {faq.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="font-bold text-lg mb-2">{item.question}</h3>
                                <p className="text-gray-600">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
