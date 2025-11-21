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
      <h2 className="text-3xl font-semibold tracking-tight">
        Tech Stack
      </h2>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="space-y-3">
            <h3 className="text-xl font-medium">{section.title}</h3>

            <ul className="space-y-1 text-neutral-600 dark:text-neutral-300">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm"
                >
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
