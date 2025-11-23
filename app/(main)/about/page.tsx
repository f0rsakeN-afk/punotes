import FAQ from "@/components/about/AboutQuestions";
import TeamPage from "@/components/about/Team";
import TechStack from "@/components/about/TechStack";

export default function About() {
  return (
    <div className="">
      <TeamPage />
      <FAQ />
      <TechStack />
    </div>
  );
}
