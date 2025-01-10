import AssignmentTile from "@/components/AssignmentTile";
import { Input } from "@/components/ui/input";
//import { PYQTypes } from "@/types";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
    fadeInUpVariants,
    tileVariants,
    staggerContainerVariants,
} from "@/utils/animation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sortOptions } from "@/utils/sortOptions";
import NotFound from "@/components/NotFound";

//import PYQ data
import { PYQData } from "@/data/PYQData";

const PastQuestions: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sortOption, setSortOption] = useState<string>('title_asc')

    const filteredQuestions = PYQData.filter((qsn) =>
        qsn.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );


    const sortedQuestions = [...filteredQuestions].sort((a, b) => {
        switch (sortOption) {
            default:
                return a.title.localeCompare(b.title);
            case "title_desc":
                return b.title.localeCompare(a.title);
            /* case "updated_at_asc":
                return (
                    new Date(a.uploaded_at).getTime() - new Date(b.uploaded_at).getTime()
                );
            default:
                return new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime() */
        }
    });



    return (
        <motion.div
            className="min-h-screen "
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
        >
            <div className="container mx-auto max-w-7xl px-4 py-8">
                <motion.div className="mb-8 space-y-4" variants={fadeInUpVariants}>
                    <motion.h1
                        className="text-4xl font-bold tracking-tight text-gray-800 dark:text-gray-100"
                        variants={fadeInUpVariants}
                    >
                        Past Questions
                    </motion.h1>
                    <motion.p
                        className="text-lg text-gray-600 dark:text-gray-400"
                        variants={fadeInUpVariants}
                    >
                        Access and download PYQ's for all semesters and subjects
                    </motion.p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    className="mb-8 max-w-3xl grid grid-cols-3 items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    {/* Search component */}
                    <Input
                        placeholder="Search assignments by title, subject..."
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchQuery(e.target.value)
                        }
                        className="bg-background/50 border border-border/50
                                 focus:ring-2 focus:ring-primary/20 transition-all duration-300 col-span-2"
                    />

                    {/* Sorting tab */}
                    <Select value={sortOption} onValueChange={(value) => setSortOption(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder='Sort By' />
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map(el => (
                                <SelectItem key={el.label} value={el.value} >{el.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </motion.div>

                {/* Grid */}
                <AnimatePresence mode="wait">
                    {sortedQuestions.length > 0 ? (<motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={staggerContainerVariants}
                    >
                        {sortedQuestions.map((qsn) => (
                            <motion.div
                                key={qsn.url}
                                variants={tileVariants}
                                whileHover="hover"
                                layout
                                className="rounded-xl bg-[#e0e5ec] dark:bg-[#202327]"
                            >
                                <AssignmentTile data={qsn} />
                            </motion.div>
                        ))}
                    </motion.div>) : (
                        <NotFound text="PYQs" />
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default PastQuestions;
