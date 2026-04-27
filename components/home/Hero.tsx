import Link from 'next/link';
import MockBrowser from './MockBrowser';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, ChevronRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center dot-grid pt-24 pb-16 px-6 overflow-hidden">
      {/* ambient orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-400/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-violet-600/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-violet-600/6 rounded-full blur-[100px] pointer-events-none" />

      {/* pill badge */}
      <div className="reveal reveal-delay-1 mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/20 bg-amber-400/5 text-amber-300 text-sm shimmer">
        <Sparkles className="w-3.5 h-3.5" />
        <span>AI-powered bookmark management</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </div>

      {/* headline */}
      <h1 className="reveal reveal-delay-2 font-display text-center text-5xl md:text-7xl lg:text-8xl text-violet-50 leading-[1.05] max-w-4xl mb-6 glow-text">
        Your links,
        <span className="block italic text-amber-400">
          beautifully organized.
        </span>
      </h1>

      {/* subheadline */}
      <p className="reveal reveal-delay-3 text-center text-lg md:text-xl text-[#9E9AB0] max-w-2xl mb-10 leading-relaxed">
        Linkmark is the bookmark manager that actually helps you find what you
        saved. AI summaries, smart tags, and full-text search — all in one
        elegant workspace.
      </p>

      {/* CTAs */}
      <div className="reveal reveal-delay-4 flex flex-col sm:flex-row gap-3 mb-16">
        <Link
          href="/register"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-violet-400 hover:bg-violet-300 text-black font-semibold rounded-xl transition-all glow-violet text-sm"
        >
          Start for free
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="#features"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0F0E1C] border border-[#2A2840] hover:border-[#3A3860] text-[#C8C4D9] rounded-xl transition-all text-sm"
        >
          See how it works
        </Link>
      </div>

      {/* social proof bar */}
      <div className="reveal reveal-delay-4 flex items-center gap-6 text-xs text-[#6B6880] mb-14 flex-wrap justify-center">
        {[
          { icon: Check, text: 'No credit card required' },
          { icon: Check, text: 'Free plan forever' },
          { icon: Check, text: 'Import from Raindrop, Pocket' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-1.5">
            <Icon className="w-3.5 h-3.5 text-amber-400" />
            <span>{text}</span>
          </div>
        ))}
      </div>

      {/* app screenshot */}
      <div className="animate-float w-full max-w-5xl">
        <MockBrowser />
      </div>

      {/* stats row */}
      <div className="mt-16 grid grid-cols-3 gap-8 md:gap-16 text-center">
        {[
          { n: 12000, s: '+', label: 'Active users' },
          { n: 4, s: 'M+', label: 'Bookmarks saved' },
          { n: 99, s: '%', label: 'Uptime SLA' },
        ].map(({ n, s, label }) => (
          <div key={label}>
            <p className="font-display text-3xl md:text-4xl text-amber-400 mb-1">
              <Counter to={n} suffix={s} />
            </p>
            <p className="text-xs text-[#6B6880]">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─── animated counter ─── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        let start = 0;
        const step = to / 60;
        const id = setInterval(() => {
          start += step;
          if (start >= to) {
            setVal(to);
            clearInterval(id);
          } else setVal(Math.floor(start));
        }, 16);
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

export default Hero;
