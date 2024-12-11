import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Download,
    FileIcon,
    Calendar,
    File,
    BookOpen,
    Clock,
    ArrowLeft,
    Search
} from "lucide-react";
import { selectPDFsByBranchAndSemester } from "@/store/selectors";
import { RootState } from "@/store/store";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const PDFs = () => {
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const semester = searchParams.get("semester");
    const branch = searchParams.get("branch");

    // Get PDFs and branch name from Redux store
    const pdfs = useSelector((state: RootState) =>
        selectPDFsByBranchAndSemester(state, branch!, semester!)
    );

    const branchName = useSelector((state: RootState) =>
        state.courses.branches.find((b) => b.id === branch?.toLowerCase())?.name
    );

    // Simulate loading state
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [semester, branch]);

    if (!semester || !branch) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Alert className="max-w-md">
                    <Search className="h-4 w-4" />
                    <AlertDescription>
                        Please select a semester and branch to view PDFs
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <ScrollArea className="min-h-screen bg-gradient-to-b from-background to-background/50">
            <div className="container mx-auto py-8 px-4 max-w-7xl">
                {/* Back Button and Header */}
                <div className="space-y-6 mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            {branchName} - {semester}
                        </h1>
                        <p className="text-muted-foreground">
                            Found {pdfs.length} study materials
                        </p>
                    </div>
                </div>

                {/* PDF Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading
                        ? Array(6)
                            .fill(null)
                            .map((_, index) => <PDFCardSkeleton key={index} />)
                        : pdfs.map((pdf) => (
                            <Card
                                key={pdf.id}
                                className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                            >
                                <CardHeader>
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <FileIcon className="h-8 w-8 text-primary" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-semibold line-clamp-2">
                                                {pdf.title}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className="font-normal">
                                                    {pdf.subject}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">
                                                    {pdf.subjectCode}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                        {pdf.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>
                                                {new Date(pdf.uploadDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <File className="h-4 w-4" />
                                            <span>{pdf.fileSize}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="h-4 w-4" />
                                            <span>{pdf.downloads} downloads</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span>
                                                {new Date(pdf.uploadDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter>
                                    <Button
                                        className="w-full gap-2 group-hover:bg-primary/90 transition-colors"
                                        asChild
                                    >
                                        <a href={pdf.fileUrl} download>
                                            <Download className="h-4 w-4" />
                                            Download PDF
                                        </a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                </div>

                {/* Empty State */}
                {!isLoading && pdfs.length === 0 && (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                            <FileIcon className="h-8 w-8 text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">No PDFs Found</h2>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            We couldn't find any PDFs for the selected semester and branch.
                            Please try a different combination or check back later.
                        </p>
                    </div>
                )}
            </div>
        </ScrollArea>
    );
};

// Loading Skeleton Component
const PDFCardSkeleton = () => (
    <Card className="group">
        <CardHeader>
            <div className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
            </div>
        </CardContent>
        <CardFooter>
            <Skeleton className="h-10 w-full" />
        </CardFooter>
    </Card>
);

export default PDFs;