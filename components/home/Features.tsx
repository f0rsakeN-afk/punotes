import {
  BookOpen,
  Download,
  FolderOpen,
  Zap,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Complete Notes",
    description:
      "Semester-wise notes, lab reports, and references for all branches — curated and verified.",
  },
  {
    icon: Download,
    title: "100% Free",
    description:
      "No subscriptions, no paywalls. Just sign in and download what you need.",
  },
  {
    icon: FolderOpen,
    title: "Smart Organization",
    description:
      "Browse by branch and semester. Find exactly what you need in seconds.",
  },
  {
    icon: GraduationCap,
    title: "Exam Ready",
    description:
      "Past questions, syllabus, and notes all in one place to help you ace exams.",
  },
  {
    icon: Zap,
    title: "Always Updated",
    description:
      "New content added regularly. Stay ahead with the latest materials.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Quality",
    description:
      "Every file reviewed by admins before going live. No spam, no outdated content.",
  },
];

export default function Features() {
  return (
    <section className="py-20 border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section label */}
        <div className="mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">
            Why PuNotes
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Everything you need to succeed
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group p-5 rounded-xl border border-border/60 bg-card hover:border-border hover:shadow-sm transition-all duration-200"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-200">
                <f.icon className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
