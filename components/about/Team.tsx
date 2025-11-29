import { Button } from "@/components/ui/button";
import { GlobeIcon, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import { Highlighter } from "../ui/highlighter";

const teamMembers = [
  {
    name: "Naresh Rajbanshi",
    title: "MERN Developer",
    bio: "Frontend Developer at Kumari.ai",
    imageUrl: "/naresh.jpeg",
    linkedin: "https://www.linkedin.com/in/f0rsaken/",
    portfolio: "https://nareshrajbanshi.com.np",
  },
  {
    name: "Pushkar Khawas",
    title: "Frontend Developer",
    bio: "",
    imageUrl: "/pushkar.jpeg",
    linkedin: "https://www.linkedin.com/in/pushkar-khawas-22256830a/",
    portfolio: "",
  },
  {
    name: "Rakesh Ray",
    title: "Python Developer",
    bio: "",
    imageUrl: "/rakesh.jpeg",
    linkedin: "https://www.linkedin.com/in/rakesh-ray-001364341/",
    portfolio: "",
  },
  {
    name: "Nishant Bishwakarma",
    title: "Frontend Developer",
    bio: "",
    imageUrl: "/nishant.jpeg",
    linkedin: "https://www.linkedin.com/in/nishant-bishwakarma-4631222b9/",
    portfolio: "",
  },
];

const TeamPage = () => {
  return (
    <div className="flex flex-col justify-center py-8 sm:py-4 px-2 lg:px-8 max-w-(--breakpoint-xl) mx-auto gap-16">
      <div className="text-center max-w-5xl mx-auto">
        <Highlighter action="underline" color="#E7405C" multiline={true}>
          <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tighter text-primary">
            Meet Our Team
          </h2>
        </Highlighter>
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
          <div key={member.name} className="group relative">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={member.imageUrl}
                alt={member.name}
                className="w-full aspect-square object-cover bg-secondary transition-transform duration-300 group-hover:scale-105"
                width={600}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {member.title}
                </p>
              </div>
            </div>

            <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>

            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {member.bio}
            </p>
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
              {member.portfolio && (
                <Button
                  className="bg-accent hover:bg-accent text-muted-foreground shadow-none"
                  size="icon"
                  asChild
                >
                  <a href={member.portfolio} target="_blank">
                    <GlobeIcon className="stroke-muted-foreground" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
