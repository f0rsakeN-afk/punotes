import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import AssignmentTile from "@/components/AssignmentTile";
import { AssignMentTypes } from "@/types";
import { motion, AnimatePresence } from "motion/react";
import { itemVariants, containerVariants } from "@/utils/animation";
import {
    Select,
    SelectTrigger,
    SelectItem,
    SelectValue,
    SelectContent,
} from "@/components/ui/select";
import { sortOptions } from "@/utils/sortOptions";
import NotFound from "@/components/NotFound";

//import assignment data
import { assignmentData } from "@/data/AssignmentData";

const Assignments = () => {
    /* Query state */
    const [searchQuery, setSearchQuery] = useState<string>("");
    /* Sort state */
    const [sortOption, setSortOption] = useState<string>("title_asc");


    /* Assignment filter logic */
    const filteredAssignments = assignmentData.filter(
        (assignment) =>
            assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assignment.subject.toLowerCase().includes(searchQuery.toLowerCase()),
    );


    /*  sort the assignments in particular order */
    const sortedAssignments = [...filteredAssignments].sort((a, b) => {
        switch (sortOption) {
            default:
                return a.title.localeCompare(b.title);
            case "title_desc":
                return b.title.localeCompare(a.title);
            /* case "updated_at_asc":
              return b.uploaded_at.getTime() - a.uploaded_at.getTime();
            case "updated_at_desc":
              return a.uploaded_at.getTime() - b.uploaded_at.getTime(); */

        }
    });


    return (
        <motion.div
            className="min-h-screen bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto max-w-7xl px-4">
                {/* Header */}
                <motion.div
                    className="mt-3 mb-8 space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        className="text-4xl font-bold tracking-tight"
                        variants={itemVariants}
                    >
                        Assignments
                    </motion.h1>
                    <motion.p
                        className="text-lg text-muted-foreground"
                        variants={itemVariants}
                    >
                        Access and download assignments for all semesters and subjects
                    </motion.p>
                </motion.div>

                {/* Search Bar  && Sort selector*/}
                <motion.div
                    className="mb-8 max-w-3xl grid grid-cols-3 items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    {/* input section */}
                    <Input
                        placeholder="Search assignments by title, subject..."
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchQuery(e.target.value)
                        }
                        className="bg-background/50  border border-border/50
                                 focus:ring-2 focus:ring-primary/20 transition-all duration-300 col-span-2"
                    />
                    {/* sort selector */}
                    <Select
                        value={sortOption}
                        onValueChange={(value) => setSortOption(value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map((el) => (
                                <SelectItem key={el.label} value={el.value}>
                                    {el.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </motion.div>

                {/* Assignments Grid */}
                <AnimatePresence mode="wait">
                    {filteredAssignments.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            layout
                        >
                            {sortedAssignments.map((assignment: AssignMentTypes) => (
                                <motion.div
                                    key={assignment.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <AssignmentTile data={assignment} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <NotFound text={"Assignments"} />
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Assignments;
