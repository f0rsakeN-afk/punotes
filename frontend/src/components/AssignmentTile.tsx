import React from 'react'
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileIcon } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { AssignMentTypes } from '@/types';


const AssignmentTile: React.FC<AssignMentTypes> = ({ assignment }) => {
    return (
        <Card
            key={assignment.id}
            className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
            <CardHeader>
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <FileIcon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-semibold line-clamp-2">{assignment.title}</h3>
                        <div className="flex flex-wrap gap-2 items-center">
                            <Badge variant="secondary" className="font-normal">
                                {assignment.subject}
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardHeader>


            <CardFooter>
                <Button className="w-full gap-2 group-hover:bg-primary/90" asChild>
                    <a href={assignment.fileUrl} download>
                        <Download className="h-4 w-4" />
                        Download Assignment
                    </a>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default AssignmentTile