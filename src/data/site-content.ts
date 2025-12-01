export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavSection = {
  label: string;
  tagline?: string;
  columns: Array<{
    title: string;
    links: NavLink[];
  }>;
};

export const navSections: NavSection[] = [
  {
    label: "Postpaid",
    tagline: "Explore all-in plans",
    columns: [
      {
        title: "Explore All-in plans",
        links: [
          { label: "Ultra", href: "/postpaid/one-ultra" },
          { label: "Pro", href: "/postpaid/one-pro" },
        ],
      },
      {
        title: "Postpaid plans",
        links: [
          { label: "Postpaid 5G", href: "/postpaid" },
          { label: "Postpaid 5G SE", href: "/postpaid/se" },
          { label: "Postpaid 5G Family", href: "/postpaid/family" },
          { label: "Postpaid 5G DataSIM", href: "/postpaid/datasim" },
          { label: "GadgetSIM", href: "/postpaid/gadgetsim" },
          { label: "WatchSIM", href: "/postpaid/watchsim" },
        ],
      },
      {
        title: "Extras",
        links: [
          { label: "Freedom Add-Ons", href: "/postpaid/freedom-add-ons" },
          { label: "Mega Add-Ons", href: "/postpaid/mega-add-ons" },
          { label: "StreamMORE", href: "/streammore?tab=postpaid#streammore" },
        ],
      },
      {
        title: "Quick options",
        links: [
          {
            label: "FAQ",
            href: "https://help.celcomdigi.com/en/support/solutions/folders/70000484661",
            description: "Get answers about postpaid plans",
          },
          {
            label: "Terms & conditions",
            href: "https://www.celcomdigi.com/terms-conditions/postpaid",
          },
        ],
      },
    ],
  },
  {
    label: "Prepaid",
    tagline: "Explore prepaid plans",
    columns: [
      {
        title: "Explore prepaid plans",
        links: [
          { label: "Prepaid 5G NX", href: "/prepaid/nx" },
          { label: "Prepaid 5G UV", href: "/prepaid/uv" },
          { label: "Prepaid 5G DataSIM", href: "/prepaid/datasim" },
          { label: "SpeedSTREAM", href: "/prepaid/speedstream" },
        ],
      },
      {
        title: "Add-ons",
        links: [
          { label: "StreamMORE", href: "/streammore?tab=prepaid#streammore" },
          { label: "One-Time Pass", href: "/prepaid/one-time-pass" },
        ],
      },
      {
        title: "Quick options",
        links: [
          {
            label: "FAQ",
            href: "https://help.celcomdigi.com/en/support/solutions/folders/70000484683",
            description: "All about prepaid packs",
          },
          {
            label: "Terms & conditions",
            href: "https://www.celcomdigi.com/terms-conditions/prepaid",
          },
        ],
      },
    ],
  },
  {
    label: "Fibre",
    tagline: "Home connectivity",
    columns: [
      {
        title: "Explore home connectivity",
        links: [
          { label: "Home Fibre", href: "/fibre/home-fibre" },
          { label: "Fibre-To-The-Room (FTTR)", href: "/fibre/fttr" },
          { label: "Home WiFi", href: "/fibre/home-wifi" },
        ],
      },
      {
        title: "Quick options",
        links: [
          { label: "Check coverage", href: "/fibre/check-coverage" },
          { label: "Find my plan", href: "/fibre/recommend-me" },
          { label: "Tips & guides", href: "/fibre/tips-guides" },
        ],
      },
    ],
  },
  {
    label: "Safety",
    tagline: "Stay protected",
    columns: [
      {
        title: "Explore safety products",
        links: [
          { label: "MobileSHIELD", href: "/safety/mobileshield" },
          { label: "WebSHIELD", href: "/safety/webshield" },
          { label: "PrivateSIM", href: "/safety/privatesim" },
          { label: "PhoneCARE", href: "/devices/phone-care" },
        ],
      },
      {
        title: "Resources",
        links: [
          {
            label: "S.A.F.E. Internet",
            href: "https://www.corporate.celcomdigi.com/sustainability/safe-internet",
          },
          {
            label: "Scam Report 2024",
            href: "https://cdn.prod.website-files.com/639b20bcbc27667faa23c543/6694bffb9e02d8f651047b97_CelcomDigi%20National%20Scam%20Awareness_Survery_2024_Report_2024.pdf",
          },
          {
            label: "How to spot scams",
            href: "https://help.celcomdigi.com/en/support/solutions/articles/70000654926-check-for-recent-scam-issues",
          },
        ],
      },
      {
        title: "Quick options",
        links: [
          {
            label: "Report a scam",
            href: "https://cd.link/nga-reportscam-whatsapp",
          },
          { label: "Call NSRC", href: "tel:997" },
        ],
      },
    ],
  },
  {
    label: "Devices",
    tagline: "Latest 5G devices",
    columns: [
      {
        title: "Explore devices",
        links: [
          { label: "Easy360", href: "/devices/easy360" },
          { label: "Pakej MegaJimat", href: "/devices/pakej-megajimat" },
          { label: "Apple", href: "/devices/apple" },
          { label: "Google", href: "/devices/google" },
          { label: "Samsung", href: "/devices/samsung" },
          { label: "Android", href: "/devices/android" },
        ],
      },
      {
        title: "Device protection",
        links: [{ label: "PhoneCARE", href: "/devices/phone-care" }],
      },
      {
        title: "Quick options",
        links: [
          { label: "Trade-In", href: "/devices/trade-in" },
          {
            label: "FAQ",
            href: "https://help.celcomdigi.com/en/support/solutions/folders/70000484609",
          },
          {
            label: "Terms & conditions",
            href: "https://www.celcomdigi.com/terms-conditions/devices",
          },
        ],
      },
    ],
  },
  {
    label: "Lifestyle",
    tagline: "Entertainment & services",
    columns: [
      {
        title: "Explore entertainment",
        links: [
          { label: "Disney+", href: "/lifestyle/disney" },
          { label: "iQIYI", href: "/lifestyle/iqiyi" },
          { label: "Viu", href: "/lifestyle/viu" },
          { label: "Vision+", href: "/lifestyle/visionplus" },
        ],
      },
      {
        title: "Services",
        links: [
          {
            label: "Pay via CelcomDigi",
            href: "/lifestyle/pay-via-celcomdigi",
          },
        ],
      },
    ],
  },
];

export const quickActions = [
  {
    label: "CelcomDigi app",
    href: "/app",
    badge: "NEW",
    description: "Manage your plan in one super app",
  },
  {
    label: "Pay bill",
    href: "https://get.celcomdigi.com/bill-payment",
    description: "Settle your postpaid bill in seconds",
  },
  {
    label: "Reload Prepaid",
    href: "https://get.celcomdigi.com/reload",
    description: "Top up instantly and stay connected",
  },
  {
    label: "Get eSIM",
    href: "/esim",
    description: "CelcomDigi Fibre | Easy sign up",
  },
  {
    label: "Switch to CelcomDigi",
    href: "/switch-to-celcomdigi",
    description: "Keep your number and move in minutes",
  },
];

export type HeroSlide = {
  title: string;
  description: string;
  cta: { label: string; href: string };
  imageAlt: string;
  image?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    title: "OPPO Find X9 Pro pre-order perks",
    description:
      "Secure the flagship OPPO Find X9 Pro with bonuses worth up to RM2,638 when you pre-order now.",
    cta: { label: "Explore offer", href: "/promotions/oppo-find-x9-pro" },
    imageAlt: "OPPO Find X9 Pro promotion visual",
    image: "/placeholder/hero-slide.svg",
  },
  {
    title: "Showtime with CelcomDigi",
    description:
      "Catch blockbuster entertainment, sports and more with Showtime — available in the CelcomDigi app.",
    cta: { label: "See what's on", href: "/showtime" },
    imageAlt: "CelcomDigi Showtime entertainment montage",
    image: "/placeholder/hero-slide.svg",
  },
  {
    title: "CelcomDigi app, reimagined",
    description:
      "Experience the all-new CelcomDigi super app with bill payment, reload, rewards and personalised care.",
    cta: { label: "Download now", href: "/app" },
    imageAlt: "CelcomDigi app interface preview",
    image: "/placeholder/hero-slide.svg",
  },
  {
    title: "Mega Add-Ons for unstoppable streaming",
    description:
      "Stack your plan with Mega Add-Ons for more 5G data, entertainment passes and roaming freedom.",
    cta: { label: "Discover add-ons", href: "/postpaid/mega-add-ons" },
    imageAlt: "Mega add-ons illustration",
    image: "/placeholder/hero-slide.svg",
  },
  {
    title: "NX Prepaid — unlimited 5G from RM25",
    description:
      "Stay unstoppable with high-speed 5G, non-stop social apps and unlimited calls on NX Prepaid.",
    cta: { label: "Find your pass", href: "/prepaid/nx" },
    imageAlt: "NX prepaid young lifestyle",
    image: "/placeholder/hero-slide.svg",
  },
  {
    title: "Home Fibre with WiFi 6 router",
    description:
      "Elevate your home with CelcomDigi Fibre bundles, free WiFi 6 router and professional installation.",
    cta: { label: "Check availability", href: "/fibre/home-fibre" },
    imageAlt: "Family enjoying high-speed fibre internet",
    image: "/placeholder/hero-slide.svg",
  },
];

export const spotlightBanner = {
  title: "It's coming — bigger than you expect",
  cta: { label: "Coming soon", href: "/promotions/honor-magic8-pro" },
};

export const oneUltraHighlight = {
  title:
    "Unlock the best pre-order deals and device financing with CelcomDigi One Ultra",
  description:
    "Bundle 300Mbps fibre, 5G devices and limitless perks in one powerful plan.",
  primaryCta: { label: "Learn more", href: "/postpaid/one-ultra" },
  secondaryCta: { label: "Get in-store", href: "/store-locator" },
  imageAlt: "CelcomDigi ONE Ultra with fibre and devices",
  image: "/placeholder/one-ultra.jpg",
};

export type SpotlightCard = {
  title: string;
  href: string;
  eyebrow?: string;
};

export const spotlightCards: SpotlightCard[] = [
  {
    title: "Experience unlimited & high-speed 5G Internet — from RM25/month",
    href: "/prepaid/nx",
  },
  {
    title: "FREE 5G phones + 300GB 5G/4G Internet at RM80/mth",
    href: "https://www.celcomdigi.com/devices/pakej-megajimat",
  },
  {
    title: "Easiest instalments on latest 5G phones from RM1/mth",
    href: "/devices/easy360",
  },
  {
    title:
      "A new way to Spark — eSIM-powered, no stores, your plan, your control",
    href: "https://spark.celcomdigi.com/",
  },
];

export type ProductCard = {
  name: string;
  priceLabel: string;
  termLabels?: string[];
  monthlyOffers: string[];
  badge?: string;
  href: string;
};

export const easy360Products: ProductCard[] = [
  {
    name: "iPhone 17 Pro",
    priceLabel: "RRP: RM5,499",
    termLabels: ["24 mths", "36 mths"],
    monthlyOffers: ["From RM186", "From RM116"],
    href: "#",
  },
  {
    name: "iPhone Air",
    priceLabel: "RRP: RM4,999",
    termLabels: ["24 mths", "36 mths"],
    monthlyOffers: ["From RM167", "From RM104"],
    href: "#",
  },
  {
    name: "Samsung Galaxy Z Fold7",
    priceLabel: "RRP: RM7,799",
    termLabels: ["24 mths", "36 mths"],
    monthlyOffers: ["From RM227", "From RM155"],
    href: "#",
  },
  {
    name: "Samsung Galaxy Z Flip7",
    priceLabel: "RRP: RM4,999",
    termLabels: ["24 mths", "36 mths"],
    monthlyOffers: ["From RM126", "From RM88"],
    href: "#",
  },
];

export const megaJimatProducts: ProductCard[] = [
  {
    name: "Vivo Y29t 5G",
    badge: "FREE",
    priceLabel: "RRP: RM1,099",
    monthlyOffers: [],
    href: "#",
  },
  {
    name: "HONOR 400 Smart 5G",
    badge: "FREE",
    priceLabel: "RRP: RM1,099",
    monthlyOffers: [],
    href: "#",
  },
  {
    name: "Samsung Galaxy A06",
    badge: "FREE",
    priceLabel: "RRP: RM699",
    monthlyOffers: [],
    href: "#",
  },
  {
    name: "Oppo A5 5G",
    badge: "FREE",
    priceLabel: "RRP: RM1,099",
    monthlyOffers: [],
    href: "#",
  },
];

export type PromotionCard = {
  category: string;
  segment?: string;
  title: string;
  href: string;
};

export const promotions: PromotionCard[] = [
  {
    category: "Postpaid",
    segment: "Devices",
    title:
      "Get ready for the Magic. HONOR Magic8 Pro with exclusive gifts worth up to RM2,638 coming your way.",
    href: "/promotions/honor-magic8-pro",
  },
  {
    category: "Postpaid",
    segment: "Devices",
    title:
      "Unfold the future: Samsung Galaxy Z Fold7 and Z Flip7 now on Easy360 with exclusive deals!",
    href: "/promotions/samsung-galaxy-z-7-series",
  },
  {
    category: "Others",
    segment: "Postpaid",
    title: "Get RM50 Grab voucher with a new Postpaid 5G line on eSIM",
    href: "/promotions/esim-merchant-offers",
  },
  {
    category: "Others",
    title:
      "Shariah-compliant instalment payments, now available with PayFlex on CelcomDigi app",
    href: "/promotions/payflex",
  },
  {
    category: "Others",
    title:
      "Your digital shield is here. Stay safe online with MobileSHIELD protection.",
    href: "/promotions/mobileshield",
  },
  {
    category: "Fibre",
    title:
      "Elevate your home Internet experience with Free WiFi 6 Router and installation",
    href: "/promotions/free-6-months-fibre-wifi-6-router",
  },
];

export const allPromotions = [
  {
    title: "iPhone 17 is here. Own it with Easy360",
    description: "RM0 upfront, 0% interest, and flexible monthly plans.",
    href: "/promotions/iphone-17",
    category: "Devices",
  },
  {
    title: "The Google Pixel 10 is here",
    description:
      "Own it now from RM83/month with exclusive freebies from CelcomDigi!",
    href: "/promotions/google-pixel-10",
    category: "Devices",
  },
  {
    title: "Samsung Galaxy Z Fold7 and Z Flip7",
    description: "Unfold the future now on Easy360 with exclusive deals!",
    href: "/promotions/samsung-galaxy-z-7-series",
    category: "Devices",
  },
  {
    title: "vivo X Fold5",
    description:
      "Unfold brilliance and enjoy exclusive freebies, only on Easy360",
    href: "/promotions/vivo-x-fold5-5g",
    category: "Devices",
  },
  {
    title: "HONOR Magic V5 5G",
    description: "Get it now with exclusive launch rewards on Easy360",
    href: "/promotions/honor-magic-v5",
    category: "Devices",
  },
  {
    title: "Disney+ with Mega Add-Ons",
    description: "Big savings with mega entertainment, all year on Disney+",
    href: "/promotions/streammore-contract-disney",
    category: "Entertainment",
  },
  {
    title: "Switch to CelcomDigi Prepaid 5G",
    description: "Exclusive cashback awaits you when you switch",
    href: "/promotions/prepaid",
    category: "Prepaid",
  },
  {
    title: "StreamMORE Vision+",
    description: "Start watching all your favourite Indonesian shows today",
    href: "/promotions/streammore-vision-plus",
    category: "Entertainment",
  },
  {
    title: "Viu with Mega Add-Ons",
    description: "Binge on Viu all year long at RM3.90/month — save 80% now!",
    href: "/promotions/streammore-contract-viu",
    category: "Entertainment",
  },
  {
    title: "iQIYI with StreamMORE",
    description: "Enjoy 1 month free and binge Setia Itu Mahal",
    href: "/promotions/url-streammore-iqiyi",
    category: "Entertainment",
  },
];

export const roamingContent = {
  hero: {
    title: "Seamless Unlimited 5G Roaming Worldwide",
    description:
      "Enjoy unlimited international 5G roaming passes in 81 countries — now with FREE in-flight roaming.",
  },
  whyWin: [
    { title: "Less hassle", description: "One pass for multiple countries." },
    { title: "More coverage", description: "Up to 81 countries included." },
    { title: "Instant activation", description: "Activate once and go." },
  ],
  howToBuy: {
    app: [
      "On your CelcomDigi app's home screen, tap ‘Roaming’",
      "Select the country you’re travelling to",
      "Choose your preferred roaming pass",
      "Tap the calendar icon to set your activation date, then click ‘Next’",
      "Your pre-booking is now confirmed",
    ],
    ussd: [
      "Dial *800# and select Purchase Roaming Pass",
      "Pick a roaming pass tailored to your travel needs",
      "Click Subscribe",
    ],
  },
  faq: [
    {
      question: "How do I activate a roaming pass?",
      answer:
        "Get a Roaming Pass before you travel or once you arrive via the CelcomDigi app.",
    },
    {
      question: "What if I forget to buy a pass?",
      answer:
        "A Daily Roaming Pass will be automatically activated for you at RM39, with up to 2GB High-speed Internet.",
    },
  ],
};

export const otherServices = [
  { label: "GadgetSIM", href: "/postpaid/gadgetsim" },
  { label: "Postpaid Family", href: "/postpaid/family" },
  { label: "Roaming", href: "/roaming" },
  { label: "Fibre", href: "/fibre/home-fibre" },
];

export const helpResourcesTabs = [
  {
    id: "einvoice",
    label: "Get e-Invoice",
    title: "Get your e-Invoice",
    description: "Register with your TIN to get it.",
    link: {
      label: "Register here",
      href: "https://einvoice.celcomdigi.com/login",
    },
  },
  {
    id: "report-scam",
    label: "Report a scam",
    title: "Protect yourself",
    description: "Be sharp, stay safe from scams & frauds.",
    link: { label: "Make a report here", href: "https://cdlink.net/6DEE" },
  },
  {
    id: "ticket-status",
    label: "Check enquiry ticket status",
    title: "Need help?",
    description: "Get in touch with us.",
    link: {
      label: "Track your ticket here",
      href: "https://support.celcomdigi.com/en/track",
    },
  },
  {
    id: "network-integration",
    label: "Latest network integration status",
    title: "Our network",
    description: "See ongoing integration activity.",
    link: {
      label: "Learn more",
      href: "https://corporate.celcomdigi.com/network/network-integration",
    },
  },
];

export const footerColumns = [
  {
    title: "About CelcomDigi",
    links: [
      {
        label: "About Us",
        href: "https://corporate.celcomdigi.com/company/about-us",
      },
      {
        label: "Investor Relations",
        href: "https://celcomdigi.listedcompany.com/home.html",
      },
      {
        label: "Newsroom",
        href: "https://corporate.celcomdigi.com/newsroom",
      },
    ],
  },
  {
    title: "About CelcomDigi",
    links: [
      {
        label: "Network",
        href: "https://corporate.celcomdigi.com/network/our-network",
      },
      {
        label: "CelcomDigi Corporate",
        href: "https://corporate.celcomdigi.com/",
      },
      {
        label: "CelcomDigi Business",
        href: "https://business.celcomdigi.com/",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        label: "MCMC Notifications",
        href: "https://help.celcomdigi.com/support/solutions/folders/70000485592",
      },
      {
        label: "Terms & Conditions",
        href: "/terms-and-conditions",
      },
      {
        label: "Cookie Notice",
        href: "https://assets.website-files.com/639b20bcbc27667faa23c543/639b20bcbc2766103223c5aa_Cookie%20Notice%20(CelcomDigi).pdf",
      },
    ],
  },
];

export const footerPrivacyLinks = [
  { label: "CelcomDigi", href: "#" },
  {
    label: "Celcom",
    href: "https://cdn.prod.website-files.com/637c596725cb8b7f82fe360b/6711d56afec81dd3a8ebbbef_Celcom%20Privacy%20Notice%20181024.pdf",
  },
  {
    label: "Digi",
    href: "https://cdn.prod.website-files.com/637c596725cb8b7f82fe360b/6711d56a85f3e50b53009bec_Digi%20Privacy%20Notice%20181024.pdf",
  },
];

export const supportLinks = [
  { label: "Roaming", href: "/roaming" },
  { label: "Promotions", href: "/promotions" },
  { label: "Get help", href: "https://help.celcomdigi.com/" },
  { label: "Shop", href: "https://shop.celcomdigi.com/home" },
];

export const floatingBanner = {
  title: "Bonus gifts worth up to RM2,246 coming your way!",
  href: "https://www.celcomdigi.com/promotions/vivo-x300",
};
