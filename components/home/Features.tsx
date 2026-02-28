import {
  BookOpen,
  Download,
  Lock,
  FolderOpen,
  Zap,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "All Notes in One Place",
    description:
      "Semester-wise notes, lab reports, and references — collected and verified by the admin.",
  },
  {
    icon: Download,
    title: "Free to Download",
    description:
      "Every resource is 100% free. No fees, no paywalls. Just log in and get what you need.",
  },
  {
    icon: FolderOpen,
    title: "Organized by Branch & Semester",
    description:
      "Content is neatly categorized so you spend time studying, not searching.",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description:
      "Hosted on edge infrastructure for near-instant load times and near-100% uptime.",
  },
  {
    icon: ShieldCheck,
    title: "Admin-Verified Content",
    description:
      "Every upload is reviewed before it goes live — no spam, no outdated material.",
  },
  {
    icon: Lock,
    title: "Secure Login",
    description:
      "Login is required only to maintain authenticity. No personal data is sold or shared.",
  },
];

export default function Features() {
  return (
    <section className="py-24 border-t border-border/50">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section label */}
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Why PuNotes
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Everything you need, nothing you don't
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/50 rounded-2xl overflow-hidden border border-border/50">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-background p-8 flex flex-col gap-4 hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center text-primary group-hover:bg-primary/12 transition-colors">
                <f.icon className="w-4.5 h-4.5" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
