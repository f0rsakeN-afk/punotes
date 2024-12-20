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
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { fadeInUpVariants, containerVariants } from "@/utils/animation";
import NotFound from "@/components/NotFound";

const PDF: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const semester = searchParams.get("semester") ?? "";
  const branch = searchParams.get("branch") ?? "";
  const subject = searchParams.get("subject") ?? "";
  const [searchQuery, setSearchQuery] = useState<string>("");

  const pdfs = useSelector((state: RootState) =>
    selectPDFsByBranchAndSemester(state, branch, semester, subject)
  );

  //console.log(pdfs)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [semester, branch, subject, pdfs]); 

  if (!semester || !branch || !subject) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive">
          <Search className="h-4 w-4" />
          <AlertDescription>
            Please select a semester, branch, and subject to view PDFs.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Filter PDFs based on search query (case-insensitive)
  const filteredPDFs = pdfs?.filter((pdf) =>
    pdf?.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];  // Default to empty array if pdfs is null or undefined

  return (
    <ScrollArea className="h-full bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto py-8 px-4 max-w-7xl min-h-[calc(100vh-160px)]">
        {/* Back Button and Header */}
        <div className="space-y-6 mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="space-y-2 grid md:grid-cols-2">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {branch} - {semester} - {subject}
              </h1>
              {/* Conditionally render count if filtered */}
              {searchQuery && (
                <p className="text-muted-foreground">
                  Found {filteredPDFs.length} study materials
                </p>
              )}
            </div>
            <div>
              <Input
                placeholder="Search PDFs by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background/50  border border-border/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 col-span-2"
              />
            </div>
          </div>
        </div>


        {/* Show skeletons or PDFs */}
        <AnimatePresence initial={false}>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6) // Adjust number of skeletons as needed
                .fill(null)
                .map((_, index) => (
                  <PDFCardSkeleton key={index} />
                ))}
            </div>
          ) : filteredPDFs.length > 0 ? (
            <motion.div // Animate the PDF grid
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >

                {filteredPDFs.map((pdf) => (
                  <motion.div key={pdf.id} variants={fadeInUpVariants}>
                    <PDFTile pdf={pdf} />
                  </motion.div>
                ))}
              </motion.div>
          ) : (
            <NotFound text="PDFs" />
          )}
        </AnimatePresence>
      </div>
    </ScrollArea>
  );
};

export default PDF;