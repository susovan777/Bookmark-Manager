import Link from 'next/link';
import { Badge } from '../ui/badge';
import { Check } from 'lucide-react';

const PLANS = [
  {
    name: "Free",
    price: "$0",
    desc: "For personal use",
    features: ["300 bookmarks", "5 collections", "Browser extension", "Basic search"],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$6",
    period: "/mo",
    desc: "For power users",
    features: ["Unlimited bookmarks", "Unlimited collections", "AI summaries & tagging", "Full-text search", "Sharing & collaboration", "Priority support"],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Team",
    price: "$12",
    period: "/user/mo",
    desc: "For teams",
    features: ["Everything in Pro", "Shared team spaces", "Admin dashboard", "SSO / SAML", "API access", "Dedicated support"],
    cta: "Contact sales",
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <Badge className="mb-4 bg-amber-400/10 text-amber-400 border-amber-400/20 hover:bg-amber-400/10">
            Pricing
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl text-amber-50 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-[#9E9AB0]">
            Start free. Upgrade when you need more.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`card-hover relative rounded-2xl p-6 border ${
                plan.highlight
                  ? 'bg-linear-to-b from-[#14111F] to-[#0C0B18] border-amber-400/30 glow-amber'
                  : 'bg-[#0C0B18] border-[#1A1930]'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-black text-xs font-semibold rounded-full">
                  Most popular
                </div>
              )}
              <div className="mb-5">
                <p className="text-sm font-medium text-[#9E9AB0] mb-1">
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-display text-4xl text-amber-50">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-[#6B6880]">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#6B6880]">{plan.desc}</p>
              </div>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-sm text-[#B0ADCA]"
                  >
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={`block text-center text-sm font-medium py-2.5 rounded-xl transition-all ${
                  plan.highlight
                    ? 'bg-amber-400 hover:bg-amber-300 text-black glow-amber-sm'
                    : 'bg-[#111020] hover:bg-[#1A1930] border border-[#1E1D32] text-[#C8C4D9]'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
