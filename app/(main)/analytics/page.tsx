"use client";

import { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar
} from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import {
    Activity,
    Users,
    TrendingUp,
    TrendingDown,
    Calendar as CalendarIcon,
    Globe,
    UserCircle,
    Monitor,
    Smartphone,
    Clock,
    Zap
} from "lucide-react";
import axios from "axios";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "motion/react";

interface AnalyticsData {
    summary: {
        totalHits: number;
        uniqueVisitors: number;
        growth: number;
        period: number;
        activeUsersNow: number;
    };
    dailyStats: Array<{ date: string; count: number; unique_count: number }>;
    hourlyStats: Array<{ hour: number; count: number }>;
    topPaths: Array<{ path: string; count: number }>;
    browsers: Array<{ name: string; value: number }>;
    os: Array<{ name: string; value: number }>;
    recentActivity: Array<{
        id: string;
        path: string;
        createdAt: string;
        user: {
            displayName: string | null;
            email: string | null;
            profileImageUrl: string | null;
            role: string;
        } | null;
    }>;
}

const COLORS = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export default function AnalyticsDashboard() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState("30");

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const resp = await axios.get(`/api/analytics?days=${days}`);
                setData(resp.data);
            } catch (error) {
                console.error("Failed to fetch analytics:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [days]);

    if (loading && !data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
                />
                <p className="text-muted-foreground font-medium animate-pulse">Syncing Enterprise Data...</p>
            </div>
        );
    }

    const chartData = data?.dailyStats?.map((s) => ({
        date: format(new Date(s.date), 'MMM dd'),
        visits: Number(s.count),
        unique: Number(s.unique_count)
    })) || [];

    const hourlyData = data?.hourlyStats?.map((s) => ({
        hour: `${s.hour}:00`,
        count: Number(s.count)
    })) || [];

    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 space-y-10">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4 border-b">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className="px-3 py-1 bg-primary/5 text-primary border-primary/20 gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Live System Analytics
                        </Badge>
                    </div>
                    <h1 className="text-5xl font-[900] tracking-tight text-foreground">
                        Analytics
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-xl">
                        Overview of site traffic and performance.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 p-1 bg-muted/50 rounded-2xl border backdrop-blur-sm">
                    <div className="flex items-center gap-2 px-4 text-sm font-semibold text-muted-foreground">
                        <CalendarIcon className="w-4 h-4" />
                        Analysis Window
                    </div>
                    <Select value={days} onValueChange={setDays}>
                        <SelectTrigger className="w-[160px] border-none shadow-none bg-background rounded-xl">
                            <SelectValue placeholder="Select Range" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-border/50">
                            <SelectItem value="7">Last 7 Days</SelectItem>
                            <SelectItem value="30">Last 30 Days</SelectItem>
                            <SelectItem value="90">Last 90 Days</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Quick Metrics Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Views", value: data?.summary?.totalHits, icon: Activity, suffix: data?.summary?.growth, sub: "All time interactions" },
                    { label: "Unique Visitors", value: data?.summary?.uniqueVisitors, icon: Users, sub: "Distinct devices" },
                    { label: "Active Now", value: data?.summary?.activeUsersNow, icon: Zap, sub: "Users on site" },
                    { label: "Status", value: "Functional", icon: Globe, sub: "System online" }
                ].map((stat, idx) => (stat && (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="h-full"
                    >
                        <Card className="border shadow-sm border-border/60 h-full flex flex-col justify-between">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="bg-primary/10 p-2.5 rounded-xl">
                                        <stat.icon className="w-4 h-4 text-primary" />
                                    </div>
                                    {stat.suffix !== undefined && (
                                        <Badge variant="secondary" className="rounded-full px-2 py-0 h-5 text-[10px] font-bold">
                                            {stat.suffix >= 0 ? "+" : ""}{stat.suffix}%
                                        </Badge>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                                    <h3 className="text-3xl font-bold tracking-tight">{stat.value}</h3>
                                    {stat.sub && <p className="text-[11px] text-muted-foreground font-medium">{stat.sub}</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )))}
            </div>

            {/* Main Insight Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Primary Chart Area */}
                <Card className="xl:col-span-2 border shadow-md overflow-hidden bg-background">
                    <CardHeader className="flex flex-row items-center justify-between border-b pb-6 px-6">
                        <div>
                            <CardTitle className="text-xl font-bold">Traffic Trend</CardTitle>
                            <CardDescription>Daily page views vs unique visitors</CardDescription>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <span className="text-[10px] font-bold uppercase text-muted-foreground">Total</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary/40" />
                                <span className="text-[10px] font-bold uppercase text-muted-foreground">Unique</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-8 h-[450px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ left: -20, right: 10 }}>
                                <defs>
                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--foreground)" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="var(--foreground)" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--foreground)" stopOpacity={0.05} />
                                        <stop offset="95%" stopColor="var(--foreground)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '16px',
                                        border: '1px solid hsl(var(--border))',
                                        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
                                        background: 'hsl(var(--background))',
                                        padding: '12px'
                                    }}
                                    itemStyle={{ fontWeight: 800, fontSize: '14px', color: 'hsl(var(--foreground))' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="visits"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorVisits)"
                                    name="Interactions"
                                    animationDuration={2000}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="unique"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={3}
                                    fillOpacity={0.5}
                                    fill="url(#colorUnique)"
                                    name="Unique Paths"
                                    strokeDasharray="5 5"
                                    animationDuration={2500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Right Column Hub */}
                <div className="space-y-6">
                    {/* Hourly Activity */}
                    <Card className="border shadow-md bg-background overflow-hidden flex flex-col">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" />
                                <CardTitle className="text-sm font-bold uppercase tracking-wider">Hourly Traffic</CardTitle>
                            </div>
                            <CardDescription className="text-[10px]">Activity distribution (last 24h)</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow pt-6 h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={hourlyData}>
                                    <XAxis dataKey="hour" hide />
                                    <Tooltip
                                        cursor={{ fill: 'var(--muted)', opacity: 0.2 }}
                                        contentStyle={{ borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}
                                    />
                                    <Bar
                                        dataKey="count"
                                        fill="hsl(var(--primary))"
                                        radius={[4, 4, 0, 0]}
                                        opacity={0.8}
                                        background={{ fill: 'hsl(var(--muted))', radius: 4 }}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                        <div className="p-4 bg-muted/20 border-t">
                            <div className="flex justify-between items-center px-2 font-black text-[10px] text-muted-foreground tracking-tighter uppercase grayscale opacity-60">
                                <span>00:00</span>
                                <span>12:00</span>
                                <span>23:59</span>
                            </div>
                        </div>
                    </Card>

                    {/* Top Content Rankings */}
                    <Card className="border shadow-md overflow-hidden flex flex-col">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-sm font-bold uppercase tracking-wider">Top Pages</CardTitle>
                            <CardDescription className="text-[10px]">Most visited routes</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y border-t">
                                {data?.topPaths?.map((p, i) => (
                                    <div key={p.path} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-black text-muted-foreground w-4">{i + 1}</span>
                                            <code className="text-[11px] font-bold bg-muted px-2 py-1 rounded-md text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors truncate max-w-[150px]">
                                                {p.path}
                                            </code>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-black tracking-tight">{p.count}</span>
                                            <div className="w-1.5 h-6 bg-muted rounded-full overflow-hidden">
                                                <div className="bg-primary h-full" style={{ height: `${(p.count / data.topPaths[0].count) * 100}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Platform & Environment Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Browser Breakdown */}
                <Card className="border shadow-md bg-background">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Monitor className="w-4 h-4 text-primary" />
                            <CardTitle className="text-sm font-bold uppercase tracking-wider">Browsers</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data?.browsers}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    animationBegin={500}
                                >
                                    {data?.browsers?.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={`hsl(var(--foreground) / ${1 - index * 0.15})`} stroke="hsl(var(--background))" strokeWidth={2} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex flex-wrap justify-center gap-4 mt-2">
                            {data?.browsers?.map((b, i) => (
                                <div key={b.name} className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: `hsl(var(--foreground) / ${1 - i * 0.15})` }} />
                                    <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-tight">{b.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* OS Breakdown */}
                <Card className="border shadow-md bg-background">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Smartphone className="w-4 h-4 text-primary" />
                            <CardTitle className="text-sm font-bold uppercase tracking-wider">Devices</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data?.os}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={450}
                                >
                                    {data?.os?.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={`hsl(var(--foreground) / ${1 - index * 0.15})`} stroke="hsl(var(--background))" strokeWidth={2} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex flex-wrap justify-center gap-4 mt-2">
                            {data?.os?.map((b: any, i: number) => (
                                <div key={b.name} className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: `hsl(var(--foreground) / ${1 - i * 0.15})` }} />
                                    <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-tight">{b.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Activity Feed */}
                <Card className="border shadow-md bg-background flex flex-col">
                    <CardHeader className="border-b bg-muted/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-sm font-bold uppercase tracking-wider">Live Activity</CardTitle>
                                <CardDescription className="text-[10px]">Internal navigation log</CardDescription>
                            </div>
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow relative overflow-hidden">
                        <div className="h-[350px] overflow-y-auto no-scrollbar scroll-smooth">
                            <AnimatePresence initial={false}>
                                {data?.recentActivity?.map((v, idx) => (
                                    <motion.div
                                        key={v.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="p-4 border-b last:border-0 hover:bg-muted/30 transition-colors group flex items-start gap-3"
                                    >
                                        <div className="relative">
                                            {v.user ? (
                                                <Avatar className="w-10 h-10 border-2 border-background shadow-sm group-hover:scale-105 transition-transform">
                                                    <AvatarImage src={v.user.profileImageUrl || undefined} />
                                                    <AvatarFallback className="text-[10px] font-black">{v.user.displayName?.slice(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border-2 border-background shadow-sm">
                                                    <UserCircle className="w-5 h-5 text-muted-foreground/50" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-grow space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] font-[900] uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors">
                                                    {v.user?.displayName || "Guest Agent"}
                                                </span>
                                                <span className="text-[10px] font-black text-muted-foreground opacity-50">
                                                    {format(new Date(v.createdAt), 'HH:mm:ss')}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 overflow-hidden">
                                                <Badge variant="outline" className="text-[9px] h-4 font-black uppercase text-muted-foreground bg-muted/20 border-border/50 truncate max-w-[140px]">
                                                    {v.path}
                                                </Badge>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                    </CardContent>
                </Card>
            </div>

            {/* Footer */}
            <div className="pt-12 text-center border-t border-border/40">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 select-none">
                    PuNotes Analytics • Real-time Data Visualization
                </p>
            </div>
        </div>
    );
}

