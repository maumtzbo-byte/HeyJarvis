import { Hero } from "./components/sections/hero";
import { Problem } from "./components/sections/problem";
import { HowItWorks } from "./components/sections/how-it-works";
import { Features } from "./components/sections/features";
import { BuildingInPublic } from "./components/sections/building-in-public";
import { Roadmap } from "./components/sections/roadmap";
import { Personas } from "./components/sections/personas";
import { Privacy } from "./components/sections/privacy";
import { Faq } from "./components/sections/faq";
import { FinalCta } from "./components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <BuildingInPublic />
      <Roadmap />
      <Personas />
      <Privacy />
      <Faq />
      <FinalCta />
    </>
  );
}
