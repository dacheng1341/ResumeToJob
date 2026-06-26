import { Hero } from "home/Hero";
import { Features } from "home/Features";
import { FAQ } from "home/FAQ";
import { CTA } from "home/CTA";
import { Metadata } from "next";

import { getMetadata } from "../metadata";

export const metadata: Metadata = getMetadata();
export const runtime = 'edge';

export default function Home() {
  return (
    <div className="relative min-h-screen">

      <main className="relative z-10">
        <Hero />
        <Features />
        <FAQ />
        <CTA />
      </main>
    </div>
  );
}
