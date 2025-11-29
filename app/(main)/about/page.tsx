import FAQ from "@/components/about/AboutQuestions";
import DeploymentConfig from "@/components/about/DeploymentConfig";
import TeamPage from "@/components/about/Team";
import TechStack from "@/components/about/TechStack";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about the PuNotes team, our mission, and the technology stack powering our platform.",
  openGraph: {
    title: "About Us | PuNotes",
    description:
      "Meet the team behind PuNotes and discover how we're revolutionizing engineering education in Nepal.",
  },
};

export default function About() {
  return (
    <div className="">
      <TeamPage />
      <DeploymentConfig />
      <FAQ />
      <TechStack />
    </div>
  );
}
