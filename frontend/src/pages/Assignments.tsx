import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import AssignmentTile from '@/components/AssignmentTile';
import { Search } from 'lucide-react';
import { AssignMentTypes } from '@/types';
import { motion, AnimatePresence } from 'motion/react';
import { itemVariants, containerVariants } from '@/utils/animation';
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from '@/components/ui/select';
import { sortOptions } from '@/utils/sortOptions';

const dummyAssignments: AssignMentTypes[] = [
    {
        id: 1,
        title: "OOP Assignment 1",
        subject: "Object Oriented Programming",
        url: '',
        uploaded_at: new Date('August 19, 1975 23:15:30')
    },
    {
        id: 2,
        title: "Data Structures Implementation",
        subject: "Data Structures",
        url: '',
        uploaded_at: new Date('August 20, 1975 23:15:30')
    },
    {
        id: 3,
        title: "Digital Logic Design Lab",
        subject: "Digital Logic",
        url: '',
        uploaded_at: new Date('August 19, 1978 23:15:30')
    },
    {
        id: 4,
        title: "DBMS Project",
        subject: "DBMS",
        url: '',
        uploaded_at: new Date('August 19, 1979 23:15:30')
    },
    {
        id: 5,
        title: "Computer Networks Lab Exercise",
        subject: "Computer Networks",
        url: '',
        uploaded_at: new Date('August 19, 2024 23:15:30')
    }
];



const Assignments = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('uploaded_at_desc');

    const filteredAssignments = dummyAssignments.filter(assignment =>
        assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const sortedAssignments = [...filteredAssignments].sort((a, b) => {
        switch (sortOption) {
            case 'title_asc':
                return a.title.localeCompare(b.title);
            case 'title_desc':
                return b.title.localeCompare(a.title)
            case 'updated_at_asc':
                return (
                    new Date(a.uploaded_at).getTime() - new Date(b.uploaded_at).getTime()
                )
            default:
                return new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime()
        }
    })

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
                    <Input
                        placeholder="Search assignments by title, subject..."
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        className="bg-background/50 lg:backdrop-blur-sm border border-border/50 
                                 focus:ring-2 focus:ring-primary/20 transition-all duration-300 col-span-2"
                    />
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