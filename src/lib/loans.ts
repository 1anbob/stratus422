export interface LoanProduct {
  slug: string;
  name: string;
  tagline: string;
  amount: string;
  rate: string;
  term: string;
  features: string[];
  icon: string;
}

export const loanProducts: LoanProduct[] = [
  {
    slug: "biashara",
    name: "Biashara Loan",
    tagline: "Working capital for your business",
    amount: "KES 20,000 – 500,000",
    rate: "1.5% p.m. on reducing balance",
    term: "3 – 24 months",
    features: [
      "Disbursed within 48 hours",
      "No collateral for loans under KES 100,000",
      "Free business training included",
      "Flexible weekly or monthly repayments via M-Pesa",
    ],
    icon: "store",
  },
  {
    slug: "elimu",
    name: "Elimu School Fees Loan",
    tagline: "Keep your children in school",
    amount: "KES 10,000 – 300,000",
    rate: "1.2% p.m. on reducing balance",
    term: "3 – 12 months",
    features: [
      "Paid directly to the school",
      "Covers primary, secondary and college fees",
      "Grace period of one month",
      "Top-up available each term",
    ],
    icon: "graduation-cap",
  },
  {
    slug: "kilimo",
    name: "Kilimo Agri Loan",
    tagline: "Finance your farm, seeds to harvest",
    amount: "KES 15,000 – 1,000,000",
    rate: "1.3% p.m. on reducing balance",
    term: "6 – 36 months",
    features: [
      "Repayment aligned to harvest seasons",
      "Covers inputs, equipment and livestock",
      "Crop insurance option available",
      "Group lending for farmer cooperatives",
    ],
    icon: "sprout",
  },
  {
    slug: "boda",
    name: "Boda Boda Asset Loan",
    tagline: "Own your motorbike, own your income",
    amount: "Up to KES 250,000",
    rate: "1.6% p.m. on reducing balance",
    term: "12 – 24 months",
    features: [
      "Ride while you pay — logbook held as security",
      "Comprehensive insurance included",
      "10% deposit only",
      "Approved within 3 working days",
    ],
    icon: "bike",
  },
  {
    slug: "dharura",
    name: "Dharura Emergency Loan",
    tagline: "Fast cash when life happens",
    amount: "KES 5,000 – 100,000",
    rate: "2% p.m. flat",
    term: "1 – 6 months",
    features: [
      "Approved and disbursed same day",
      "Straight to your M-Pesa wallet",
      "Minimal documentation",
      "Available to members after 3 months of saving",
    ],
    icon: "zap",
  },
  {
    slug: "nyumba",
    name: "Nyumba Home Improvement Loan",
    tagline: "Build and improve your home",
    amount: "KES 50,000 – 2,000,000",
    rate: "1.1% p.m. on reducing balance",
    term: "12 – 60 months",
    features: [
      "For construction, renovation and land purchase",
      "Staged disbursement for building projects",
      "Free site visit and valuation",
      "Joint applications with spouse accepted",
    ],
    icon: "home",
  },
];

export const formatKES = (n: number) =>
  "KES " + n.toLocaleString("en-KE", { maximumFractionDigits: 0 });
