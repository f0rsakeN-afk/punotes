import AssignmentTile from '@/components/AssignmentTile';
import { Input } from '@/components/ui/input';
import { PYQTypes } from '@/types';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { fadeInUpVariants, searchInputVariants, tileVariants, staggerContainerVariants } from '@/utils/animation';

const dummyAssignments: PYQTypes[] = [
    {
        id: 1,
        title: "2024 3rd 4th",
        url: ''
    },
    {
        id: 2,
        title: "2081 2nd 5th",
        url: ''
    },
    {
        id: 3,
        title: "Digital Logic Design Lab",
        url: ''
    },
    {
        id: 4,
        title: "Database Management System Project",
        url: ''
    },
    {
        id: 5,
        title: "Computer Networks Lab Exercise",
        url: 'https://drive.google.com/uc?export=download&id=1bf0e1OBkTiUXifYrcOe9lu70JzKaadmV'
    }
];



const PastQuestions: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const filteredQuestions = dummyAssignments.filter(qsn =>
        qsn.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div
            className="min-h-screen "
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
        >
            <div className="container mx-auto max-w-7xl px-4 py-8">
                <motion.div
                    className="mb-8 space-y-4"
                    variants={fadeInUpVariants}
                >
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

                {/* Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={staggerContainerVariants}
                >
                    {filteredQuestions.map((qsn) => (
                        <motion.div
                            key={qsn.id}
                            variants={tileVariants}
                            whileHover="hover"
                            layout // Smooth transitions when filtering
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