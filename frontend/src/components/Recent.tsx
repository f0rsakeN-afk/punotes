import React from 'react'
import { Card, CardContent } from './ui/card';

const Recent: React.FC = () => {
    return (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto max-w-7xl px-4">
                <h2 className="text-3xl font-bold text-center mb-12 dark:text-gray-100">
                    Recently Added Materials
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="hover:shadow-lg transition-shadow duration-300 
                                   bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2 dark:text-gray-100">
                                Digital Electronics
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Semester 3 • Computer
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default Recent;