import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Story } from "@/components/story";
import { Mission } from "@/components/mission";
import { HowItWorks } from "@/components/how-it-works";
import { Team } from "@/components/team";
import { Impact } from "@/components/impact";
import { Contact } from "@/components/contact";
import { Technologies } from "@/components/technologies";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <section id="histoire" className="scroll-mt-20">
        <Story />
      </section>
      <section id="mission" className="scroll-mt-20">
        <Mission />
      </section>
      <section id="comment" className="scroll-mt-20">
        <HowItWorks />
      </section>
      <section id="equipe" className="scroll-mt-20">
        <Team />
      </section>
      <section id="impact" className="scroll-mt-20">
        <Impact />
      </section>
      <section id="contact" className="scroll-mt-20">
        <Contact />
      </section>
      <Technologies />
      <Footer />
    </main>
  );
}
