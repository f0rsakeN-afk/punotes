import React from 'react'
import { BookOpen, Download, Search, Users } from "lucide-react";
import { Card, CardContent } from './ui/card';

const features = [
    {
        icon: <BookOpen className="w-6 h-6" />,
        title: "Study Materials",
        description: "Access comprehensive study materials for all engineering branches",
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
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto max-w-7xl px-4">
                <h2 className="text-3xl font-bold text-center mb-12 dark:text-gray-100">
                    Why Choose Our Platform?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 
                                     bg-white dark:bg-gray-800"
                        >
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg 
                                              flex items-center justify-center mb-4 
                                              text-blue-600 dark:text-blue-400">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features