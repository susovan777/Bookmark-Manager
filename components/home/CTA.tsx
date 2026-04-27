import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center relative">
        <div className="absolute inset-0 blur-3xl bg-violet-400/6 -z-10 scale-150" />
        <h2 className="font-display text-5xl md:text-6xl text-violet-50 mb-5 leading-tight">
          Stop losing links.
          <span className="block italic text-amber-400">
            Start using Linkmark.
          </span>
        </h2>
        <p className="text-[#9E9AB0] mb-10 text-lg">
          Join thousands of people who finally have control over their saved
          content.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 hover:bg-violet-300 text-black font-semibold rounded-xl transition-all glow-violet text-base"
        >
          Create your free account
          <ArrowRight className="w-5 h-5" />
        </Link>
        <p className="mt-4 text-xs text-[#5A5870]">
          No credit card • Free forever plan • 2 min setup
        </p>
      </div>
    </section>
  );
};

export default CTA;
