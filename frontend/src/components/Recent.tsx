import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants, staggerContainerVariants } from '../utils/animation';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { recentPdfs, typesInfo } from '@/data/RecentlogData';

const Recent: React.FC = () => {
    const top10Recent: typesInfo[] = recentPdfs
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 10);

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-7xl">
                <motion.h2
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-3xl font-bold text-center mb-12 dark:text-gray-100"
                >
                    Recent PDF Updates Log
                </motion.h2>

                <motion.div
                    variants={staggerContainerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Table>
                        <TableCaption>A list of recent updates log</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='md:w-[200px]' >Date</TableHead>
                                <TableHead className='md:w-[400px] text-center'>Title</TableHead>
                                <TableHead className='text-center'>Description</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {top10Recent.map((el: typesInfo) => (
                                <TableRow key={el.title}>
                                    <TableCell>{el.date.toDateString()}</TableCell>
                                    <TableCell className='text-center'>{el.title}</TableCell>
                                    <TableCell className='text-center'>{el.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </motion.div>
            </div>
        </section>
    );
};

export default Recent;