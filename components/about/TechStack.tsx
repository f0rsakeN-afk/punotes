import { Highlighter } from "../ui/highlighter";

export default function TechStack() {
  const sections = [
    {
      title: "Frontend",
      items: [
        "Next.js 16",
        "React 19",
        "Tailwind CSS 4",
        "Framer Motion (motion)",
        "Radix UI",
        "Lucide & Tabler Icons",
        "next-themes",
        "react-hook-form",
        "Zod validation",
      ],
    },
    {
      title: "Backend",
      items: [
        "Next.js Route Handlers",
        "Prisma ORM",
        "Prisma Accelerate",
        "PostgreSQL (Database)",
      ],
    },
    {
      title: "Authentication",
      items: ["Stack Auth (@stackframe/stack)"],
    },
    {
      title: "Other Tools",
      items: [
        "dotenv",
        "clsx + class-variance-authority",
        "rough-notation",
        "TypeScript",
        "ESLint & Prettier",
        "Tailwind Merge",
      ],
    },
  ];

  return (
    <section className="w-full max-w-(--breakpoint-xl) mx-auto py-12 space-y-10">
      <Highlighter action="box" color="#E7405C">
        <h2 className="text-3xl font-semibold tracking-tight text-primary">
          Tech Stack
        </h2>
      </Highlighter>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="space-y-3">
            <Highlighter action="highlight" color="#E7405C">
              <h3 className="text-xl font-medium text-white">{section.title}</h3>
            </Highlighter>

            <ul className="space-y-1 text-neutral-600 dark:text-neutral-300">
              {section.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mt-4" />
          </div>
        ))}
      </div>
    </section>
  );
}
