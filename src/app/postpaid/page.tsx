import { SubNav } from "@/components/SubNav";
import { ArrowRight, Check, Users, Percent, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const postpaidLinks = [
  { label: "Postpaid 5G", href: "/postpaid" },
  { label: "Postpaid 5G SE", href: "/postpaid/se" },
  { label: "Postpaid 5G Family", href: "/postpaid/family" },
  { label: "Postpaid 5G DataSIM", href: "/postpaid/datasim" },
  { label: "GadgetSIM", href: "/postpaid/gadgetsim" },
  { label: "WatchSIM", href: "/postpaid/watchsim" },
];

const features = [
  {
    icon: Check,
    title: "2X Internet quota",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Users,
    title: "Family plans for all",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    icon: Percent,
    title: "50% savings",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Smartphone,
    title: "Flexible device plans",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

export default function PostpaidPage() {
  return (
    <main className="min-h-screen bg-white">
      <SubNav links={postpaidLinks} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-sm font-bold uppercase tracking-widest text-[#0095DA]">
                  Postpaid 5G
                </span>
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  Solid plans <br />
                  <span className="text-[#0095DA]">to love</span>
                </h1>
                <p className="max-w-lg text-xl text-gray-500">
                  The best deals are with us. Switch to CelcomDigi today.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/switch-to-celcomdigi"
                  className="inline-flex items-center justify-center rounded-full bg-[#0095DA] px-8 py-3 text-base font-bold text-white transition hover:bg-[#007bb5]"
                >
                  Switch to CelcomDigi
                </Link>
                <Link
                  href="#plans"
                  className="inline-flex items-center justify-center rounded-full border-2 border-gray-200 bg-white px-8 py-3 text-base font-bold text-gray-900 transition hover:border-gray-300 hover:bg-gray-50"
                >
                  View Plans
                </Link>
              </div>
            </div>
            <div className="relative lg:h-[600px]">
              {/* Placeholder for Hero Image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-yellow-100 rounded-3xl flex items-center justify-center">
                <span className="text-9xl font-bold text-white opacity-50">
                  5G
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            CelcomDigi Postpaid 5G
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Stay connected with Postpaid plans that deliver seamless 5G
            connectivity, tailored to your digital lifestyle.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition hover:shadow-md"
              >
                <div
                  className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg} ${feature.color}`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0095DA]">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section Placeholder */}
      <section id="plans" className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Choose your plan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">Postpaid 5G {i}00</h3>
                <p className="text-gray-500 mb-6">Unlimited 5G/4G Internet</p>
                <button className="w-full py-3 rounded-full border-2 border-[#0095DA] text-[#0095DA] font-bold hover:bg-[#0095DA] hover:text-white transition">
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
