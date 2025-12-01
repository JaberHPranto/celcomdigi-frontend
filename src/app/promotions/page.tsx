import { allPromotions } from "@/data/site-content";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PromotionsPage() {
    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <section className="bg-[#0095DA] py-16 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Promotions</h1>
                <p className="text-xl opacity-90">Get the best offers from CelcomDigi</p>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {allPromotions.map((promo, index) => (
                        <Link
                            key={index}
                            href={promo.href}
                            className="group flex flex-col rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
                        >
                            <div className="mb-4">
                                <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0095DA]">
                                    {promo.category}
                                </span>
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-[#0095DA]">
                                {promo.title}
                            </h3>
                            <p className="mb-6 flex-1 text-gray-600">
                                {promo.description}
                            </p>
                            <div className="flex items-center text-sm font-bold text-[#0095DA]">
                                Find out more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
