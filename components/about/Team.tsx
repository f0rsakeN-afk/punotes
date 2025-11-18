import { Button } from "@/components/ui/button";
import { LinkedinIcon } from "lucide-react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Naresh Rajbanshi",
    title: "MERN Developer",
    bio: "Frontend Developer at Kumari.ai",
    imageUrl: "/naresh.jpg",
    linkedin: "https://www.linkedin.com/in/f0rsaken/",
  },
  {
    name: "Pushkar Khawas",
    title: "Frontend Developer",
    bio: "Lead engineering teams at Figma, Pitch, and Protocol Labs.",
    imageUrl: "/pushkar.jpeg",
    linkedin: "https://www.linkedin.com/in/pushkar-khawas-22256830a/",
  },
  {
    name: "Rakesh Ray",
    title: "Python Developer",
    bio: "Former PM for Linear, Lambda School, and On Deck.",
    imageUrl: "/rakesh.jpeg",
    linkedin: "https://www.linkedin.com/in/rakesh-ray-001364341/",
  },
  {
    name: "Nishant Bishwakarma",
    title: "Frontend Developer",
    bio: "Former frontend dev for Linear, Coinbase, and Postscript.",
    imageUrl: "/nishant.jpeg",
    linkedin: "https://www.linkedin.com/in/nishant-bishwakarma-4631222b9/",
  },
];

const TeamPage = () => {
  return (
    <div className="flex flex-col justify-center py-8 sm:py-4 px-2 lg:px-8 max-w-(--breakpoint-xl) mx-auto gap-16">
      <div className="text-center max-w-5xl mx-auto">
        <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tighter">
          Meet Our Team
        </h2>
        <p className="mt-6 text-base sm:text-lg text-muted-foreground ">
          We aim to make quality education accessible to all engineering
          students by providing a centralized platform for study materials,
          notes, and resources. Our goal is to support students in their
          academic journey and help them excel by offering the tools they need
          to understand key concepts and improve their performance.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
        {teamMembers.map((member) => (
          <div key={member.name}>
            <Image
              src={member.imageUrl}
              alt={member.name}
              className="w-full aspect-square rounded-lg object-cover bg-secondary"
              width={600}
              height={600}
            />
            <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
            <p className="text-muted-foreground text-sm">{member.title}</p>
            <p className="mt-3">{member.bio}</p>
            <div className="mt-4 flex items-center gap-2.5">
              <Button
                className="bg-accent hover:bg-accent text-muted-foreground shadow-none"
                size="icon"
                asChild
              >
                <a href={member.linkedin} target="_blank">
                  <LinkedinIcon className="stroke-muted-foreground" />
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
