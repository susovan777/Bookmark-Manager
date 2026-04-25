// Path: components\home\Features.tsx

import { Badge } from '../ui/badge';
import { Globe, Search, Share2, Sparkles, Tags, Zap } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: 'One-click capture',
    desc: 'Save any page in under a second. Browser extension, mobile share sheet, or paste a URL — Linkmark works wherever you do.',
    accent: 'from-amber-400/20 to-amber-400/0',
    iconColor: 'text-amber-400',
    tag: 'Speed',
  },
  {
    icon: Search,
    title: 'Full-text search',
    desc: 'Search across titles, URLs, notes, and even the content of saved pages. Find anything instantly with semantic AI search.',
    accent: 'from-violet-400/20 to-violet-400/0',
    iconColor: 'text-violet-400',
    tag: 'Discovery',
  },
  {
    icon: Tags,
    title: 'Smart tagging & collections',
    desc: 'Auto-suggest tags powered by AI. Organize bookmarks into nested collections. Your library, your structure.',
    accent: 'from-cyan-400/20 to-cyan-400/0',
    iconColor: 'text-cyan-400',
    tag: 'Organization',
  },
  {
    icon: Share2,
    title: 'Share & collaborate',
    desc: 'Share curated collections with a link. Collaborate with teammates on shared spaces. Perfect for research teams.',
    accent: 'from-rose-400/20 to-rose-400/0',
    iconColor: 'text-rose-400',
    tag: 'Collaboration',
  },
  {
    icon: Globe,
    title: 'Works everywhere',
    desc: 'Chrome extension, Firefox add-on, iOS & Android app, and a clean web dashboard. Your bookmarks follow you.',
    accent: 'from-emerald-400/20 to-emerald-400/0',
    iconColor: 'text-emerald-400',
    tag: 'Cross-platform',
  },
  {
    icon: Sparkles,
    title: 'AI-powered summaries',
    desc: 'Linkmark automatically summarises saved pages so you remember why you saved them — even months later.',
    accent: 'from-amber-400/20 to-amber-400/0',
    iconColor: 'text-amber-400',
    tag: 'AI',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* section header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-amber-400/10 text-amber-400 border-amber-400/20 hover:bg-amber-400/10">
            Features
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl text-amber-50 mb-4">
            Everything your links deserve
          </h2>
          <p className="text-[#9E9AB0] max-w-xl mx-auto">
            Built for researchers, designers, developers, and anyone who saves
            more than they can find.
          </p>
        </div>

        {/* feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="card-hover relative overflow-hidden bg-[#0C0B18] border border-[#1A1930] rounded-2xl p-6 group"
            >
              {/* gradient accent bg */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative z-10">
                <div
                  className={`inline-flex p-2.5 rounded-xl bg-[#111020] border border-[#1E1D32] mb-4 ${f.iconColor}`}
                >
                  <f.icon className="w-5 h-5" />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="font-semibold text-[#E8E4D9]">{f.title}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1A1930] text-[#6B6880]">
                    {f.tag}
                  </span>
                </div>
                <p className="text-sm text-[#7B7890] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
