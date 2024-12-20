import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft, Search } from "lucide-react";
import { selectPDFsByBranchAndSemester } from "@/store/selectors";
import { RootState } from "@/store/store";
import { Link } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import PDFCardSkeleton from "@/components/PDFSkeleton";
import PDFTile from "@/components/PDFTile";
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { fadeInUpVariants, containerVariants } from '@/utils/animation';
import NotFound from "@/components/NotFound";


const PDF: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const semester = searchParams.get("semester") ?? '';
    const branch = searchParams.get("branch") ?? '';
    //const subject = searchParams.get('subject') ?? "";
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Get PDFs and branch name from Redux store
    const pdfs = useSelector((state: RootState) =>
        selectPDFsByBranchAndSemester(state, branch!, semester!)
    );

    /* const branchName = useSelector((state: RootState) =>
        state.courses.data.find((b) => b.id === branch?.toLowerCase())?.name
    ); */
    //console.log(pdfs, 'hello')

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

    const filteredPDFs = pdfs.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ScrollArea className="min-h-screen bg-gradient-to-b from-background to-background/50">
            <div className="container mx-auto py-8 px-4 max-w-7xl">
                {/* Back Button and Header */}
                <div className="space-y-6 mb-8">
                    <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>

                    <div className="space-y-2 grid md:grid-cols-2">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight">
                                {branch} - {semester}
                            </h1>
                            <p className="text-muted-foreground">
                                Found {searchQuery ? filteredPDFs.length : pdfs.length} study materials
                            </p>
                        </div>
                        <div>
                            <Input
                                placeholder="Search PDFs by title, subject..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-background/50 lg:backdrop-blur-sm border border-border/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 col-span-2"
                            />
                        </div>
                    </div>
                </div>

                {/* PDF Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence initial={false} custom={{ delay: 0.2 }}> {/* AnimatePresence for list items */}
                        {isLoading
                            ? Array(6).fill(null).map((_, index) => <PDFCardSkeleton key={index} />)
                            : filteredPDFs.map((pdf) => (
                                <motion.div key={pdf.title} variants={fadeInUpVariants}>
                                    <PDFTile pdf={pdf} />
                                </motion.div>
                            ))
                        }
                    </AnimatePresence>
                </motion.div>
                {/* Improved Empty State Handling */}
                {filteredPDFs.length === 0 && !isLoading && (
                    <NotFound text={'PDFs'} />
                )}
            </div>
        </ScrollArea>
    );
};

export default PDF;
