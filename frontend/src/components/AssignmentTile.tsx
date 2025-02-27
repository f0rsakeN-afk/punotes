import React from 'react'
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { View, FileIcon } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface AssignmentTileProps {
    data: {
        title: string;
        subject?: string;
        url: string;
        uploaded_at: Date;
    }
}

const AssignmentTile: React.FC<AssignmentTileProps> = ({ data }) => {
    const formattedDate = formatDistanceToNow(data?.uploaded_at, { addSuffix: true }); 

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            <Card className=" transition-all duration-300  lg:backdrop-blur-md">
                <CardHeader>
                    <motion.div
                        className="flex items-start gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <motion.div
                            className="p-2 rounded-lg bg-primary/10"
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            <FileIcon className="h-8 w-8 text-primary" />
                        </motion.div>
                        <div className="space-y-1">
                            <h3 className="font-medium line-clamp-2 capitalize">
                                {data.title}
                            </h3>
                            <div className="flex flex-wrap gap-2 items-center">
                                {data?.subject && (
                                    <Badge variant="secondary" className="font-normal">
                                        {data.subject}
                                    </Badge>
                                )}
                                <span className="text-sm text-muted-foreground">Uploaded {formattedDate}</span> 
                            </div>
                        </div>
                    </motion.div>
                </CardHeader>

                <CardFooter>
                    <motion.div
                        className="w-full"
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            className="w-full gap-2 group"
                            asChild
                        >
                            <a
                                href={data.url}
                                target='_blank'
                                download
                                className="flex items-center justify-center"
                            >
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <View className="h-4 w-4" />
                                </motion.div>
                                View
                            </a>
                        </Button>
                    </motion.div>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

export default AssignmentTile;