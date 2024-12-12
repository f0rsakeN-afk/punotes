import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import AssignmentTile from '@/components/AssignmentTile';
import { Search } from 'lucide-react';
import { AssignMentTypes } from '@/types';
import { motion, AnimatePresence } from 'motion/react';

const dummyAssignments: AssignMentTypes[] = [
    {
        id: 1,
        title: "Object Oriented Programming Assignment 1",
        subject: "Object Oriented Programming",
        url: ''
    },
    {
        id: 2,
        title: "Data Structures Implementation",
        subject: "Data Structures",
        url: ''
    },
    {
        id: 3,
        title: "Digital Logic Design Lab",
        subject: "Digital Logic",
        url: ''
    },
    {
        id: 4,
        title: "Database Management System Project",
        subject: "DBMS",
        url: ''
    },
    {
        id: 5,
        title: "Computer Networks Lab Exercise",
        subject: "Computer Networks",
        url: ''
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
};

const Assignments = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredAssignments = dummyAssignments.filter(assignment =>
        assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

                {/* Search Bar */}
                <motion.div 
                    className="mb-8 max-w-2xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <Input
                        placeholder="Search assignments by title, subject..."
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        className="bg-background/50 backdrop-blur-sm border border-border/50 
                                 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    />
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
                            {filteredAssignments.map((assignment: AssignMentTypes) => (
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
                        <motion.div 
                            className="text-center py-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ 
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20 
                                }}
                            >
                                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            </motion.div>
                            <h2 className="text-xl font-semibold mb-2">No Assignments Found</h2>
                            <p className="text-muted-foreground">
                                Try adjusting your search terms or check back later for new assignments
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Assignments;