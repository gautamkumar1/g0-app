import SyntheticHero from "@/components/ui/synthetic-hero";

export default function HeroSection() {
  return (
    <div className="w-screen h-screen flex flex-col relative">
      <SyntheticHero
        title="ship native mobile apps at the speed of thought"
        description="g0 turns your idea into a real mobile app using natural language.
Describe what you want, and get a production-ready app in minutes."
        badgeText="Expo"
        badgeLabel="Platform"
        ctaButtons={[
          { text: "Build Your App", href: "#explore", primary: true },
          { text: "View Demo", href: "#learn-more" }
        ]}
        microDetails={[
          "No credit card required",
          "Use your own api keys",
          "Open source",
        ]}
      />
    </div>
  );
}