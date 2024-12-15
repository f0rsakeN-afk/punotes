import AssignmentTile from "@/components/AssignmentTile";
import { Input } from "@/components/ui/input";
import { PYQTypes } from "@/types";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
    fadeInUpVariants,
    tileVariants,
    staggerContainerVariants,
} from "@/utils/animation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sortOptions } from "@/utils/sortOptions";

const dummyAssignments: PYQTypes[] = [
    {
        id: 1,
        title: "2024 3rd 4th",
        url: "",
        uploaded_at: new Date('August 19, 1975 23:15:30')
    },
    {
        id: 2,
        title: "2081 2nd 5th",
        url: "",
        uploaded_at: new Date('August 20, 1975 23:15:30')
    },
    {
        id: 3,
        title: "Digital Logic Design Lab",
        url: "",
        uploaded_at: new Date('August 21, 1975 23:15:30')
    },
    {
        id: 4,
        title: "Database Management System Project",
        url: "",
        uploaded_at: new Date('August 22, 1975 23:15:30')
    },
    {
        id: 5,
        title: "Computer Networks Lab Exercise",
        url: "https://drive.google.com/uc?export=download&id=1bf0e1OBkTiUXifYrcOe9lu70JzKaadmV",
        uploaded_at: new Date('July 23, 1985 10:15:20')
    },
];

const PastQuestions: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sortOption, setSortOption] = useState<string>('uploaded_at_desc')

    const filteredQuestions = dummyAssignments.filter((qsn) =>
        qsn.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );


    const sortedQuestions = [...filteredQuestions].sort((a, b) => {
        switch (sortOption) {
            case "title_asc":
                return a.title.localeCompare(b.title);
            case "title_desc":
                return b.title.localeCompare(a.title);
            case "updated_at_asc":
                return (
                    new Date(a.uploaded_at).getTime() - new Date(b.uploaded_at).getTime()
                );
            default:
                return new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime()
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
                        className="bg-background/50 lg:backdrop-blur-sm border border-border/50
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
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={staggerContainerVariants}
                >
                    {sortedQuestions.map((qsn) => (
                        <motion.div
                            key={qsn.id}
                            variants={tileVariants}
                            whileHover="hover"
                            layout
                            className="rounded-xl bg-[#e0e5ec] dark:bg-[#202327]
                                     shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]
                                     dark:shadow-[9px_9px_16px_rgba(0,0,0,0.6),-9px_-9px_16px_rgba(45,48,53,0.5)]
                                     hover:shadow-[12px_12px_20px_rgba(163,177,198,0.7),-12px_-12px_20px_rgba(255,255,255,0.6)]
                                     dark:hover:shadow-[12px_12px_20px_rgba(0,0,0,0.7),-12px_-12px_20px_rgba(45,48,53,0.6)]"
                        >
                            <AssignmentTile data={qsn} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default PastQuestions;
