import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export default function Features() {
  const features = [
    {
      title: "All Notes in One Place",
      description:
        "Access semester-wise notes collected and uploaded by the admin. Content updates take time since the platform is maintained by one person.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Simple & Clean Interface",
      description:
        "A fast, minimal, and distraction-free UI built with Next.js and shadcn.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Completely Free",
      description:
        "All resources are 100% free to access after logging in. No fees, no hidden charges.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Secure Login Required",
      description:
        "Login is required only to keep track of users and maintain authenticity. No personal data is shared or misused.",
      icon: <IconHelp />,
    },
    {
      title: "Always Available",
      description: "Hosted reliably for fast loading and near 100% uptime.",
      icon: <IconCloud />,
    },
    {
      title: "Organized by Faculty & Semester",
      description:
        "Notes, syllabus, reports, and papers are neatly categorized for easy browsing.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "Admin-Verified Content",
      description:
        "All uploads are reviewed and managed by a single admin to ensure accuracy and quality.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "More Coming Soon",
      description:
        "Past papers, model sets, reference books, and more will be added gradually.",
      icon: <IconHeart />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800",
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
