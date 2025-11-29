import {
    CpuIcon,
    DatabaseIcon,
    ServerIcon,
    Settings2Icon,
    ShieldCheckIcon,
    ZapIcon,
} from "lucide-react";
import { Highlighter } from "../ui/highlighter";

const DeploymentConfig = () => {
    return (
        <div className="flex flex-col justify-center py-8 sm:py-4 px-2 lg:px-8 max-w-(--breakpoint-xl) mx-auto gap-16">
            <div className="text-center max-w-5xl mx-auto">
                <Highlighter action="underline" color="#E7405C" multiline={true}>
                    <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tighter text-primary">
                        Under the Hood
                    </h2>
                </Highlighter>
                <p className="mt-6 text-base sm:text-lg text-muted-foreground ">
                    We believe in transparency. Here's a look at the infrastructure
                    powering PuNotes, ensuring high performance and reliability for all
                    students.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Next.js Deployment Config */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                    <div className="p-6 flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-primary/10">
                                <ServerIcon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">Deployment Config</h3>
                                <p className="text-sm text-muted-foreground">
                                    Next.js App Runtime Settings
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <ConfigItem
                                    icon={<ZapIcon className="w-4 h-4" />}
                                    label="Build Machine"
                                    value="Standard (4 vCPUs, 8 GB)"
                                    subValue="Prioritize Production Builds"
                                />
                                <ConfigItem
                                    icon={<CpuIcon className="w-4 h-4" />}
                                    label="Function CPU"
                                    value="Standard (1 vCPU, 2 GB)"
                                    subValue="Fluid Compute Enabled"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Postgres DB Config */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                    <div className="p-6 flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-primary/10">
                                <DatabaseIcon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">Database Config</h3>
                                <p className="text-sm text-muted-foreground">
                                    PostgreSQL Instance Settings
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-medium text-muted-foreground">
                                        Compute Units (CU)
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        Auto-scaling
                                    </span>
                                </div>
                                <div className="relative h-4 bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-primary/50 rounded-full"
                                        style={{ width: "12.5%" }}
                                    ></div>
                                    <div
                                        className="absolute top-0 left-[12.5%] h-full bg-primary rounded-full"
                                        style={{ width: "87.5%" }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-2 text-sm">
                                    <div className="flex flex-col">
                                        <span className="font-semibold">Min: 0.25 CU</span>
                                        <span className="text-xs text-muted-foreground">
                                            ~1 GB RAM
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="font-semibold">Max: 2 CU</span>
                                        <span className="text-xs text-muted-foreground">
                                            ~8 GB RAM
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-secondary/50">
                                    <span className="text-muted-foreground">Region</span>
                                    <span className="font-medium">
                                        AWS Asia Pacific 1 (Singapore)
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-secondary/50">
                                    <span className="text-muted-foreground">Pooled Connections</span>
                                    <span className="font-medium">Up to 10,000 (PgBouncer)</span>
                                </div>
                                <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-secondary/50">
                                    <span className="text-muted-foreground">Direct Connections</span>
                                    <span className="font-medium">Limit: 839</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                <Settings2Icon className="w-5 h-5 text-blue-500 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                        Optimized for Performance
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Our database uses PgBouncer to pool connections for efficiency,
                                        while supporting direct connections for schema migrations and
                                        session-dependent features.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ConfigItem = ({
    icon,
    label,
    value,
    subValue,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    subValue?: string;
}) => (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
        <div className="mt-0.5 text-muted-foreground">{icon}</div>
        <div>
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <p className="text-sm font-semibold">{value}</p>
            {subValue && (
                <p className="text-[10px] text-muted-foreground mt-0.5">{subValue}</p>
            )}
        </div>
    </div>
);

export default DeploymentConfig;
