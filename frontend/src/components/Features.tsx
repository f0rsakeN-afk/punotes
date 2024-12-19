import React from 'react'
import { BookOpen, Download, Search, Users } from "lucide-react";
import { Card, CardContent } from './ui/card';
import { motion } from 'motion/react';
import { itemVariants, staggerContainerVariants } from '../utils/animation';


/* interface for feature types */
type FeaturesTypes = {
    icon: JSX.Element;
    title: string;
    description: string;
}

const features: FeaturesTypes[] = [
    {
        icon: <BookOpen className="w-6 h-6" />,
        title: "Study Materials",
        description: "Access study materials for all engineering branches",
    },
    {
        icon: <Download className="w-6 h-6" />,
        title: "Easy Downloads",
        description: "Download PDFs instantly with just one click",
    },
    {
        icon: <Search className="w-6 h-6" />,
        title: "Quick Search",
        description: "Find exactly what you need with our smart search",
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: "Community Driven",
        description: "Join thousands of engineering students using our platform",
    },
];


const Features: React.FC = () => {
    return (
        <section className="py-20 bg-gray-50 dark:bg-background">
            <div className="container mx-auto max-w-7xl px-4">
                <motion.h2
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-3xl font-bold text-center mb-12 dark:text-gray-100">
                    Why Choose Our Platform?
                </motion.h2>
                <motion.div
                    variants={staggerContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.1 }}
                            className="transition-all duration-300 lg:backdrop-blur-md">
                            <Card>
                                <CardContent className="p-6">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                                        {feature.icon}
                                    </motion.div>
                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        className="text-xl font-semibold mb-2 dark:text-gray-100"> {/* Add animation to title*/}
                                        {feature.title}
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="text-gray-600 dark:text-gray-400"> {/* Add animation to description */}
                                        {feature.description}
                                    </motion.p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Features