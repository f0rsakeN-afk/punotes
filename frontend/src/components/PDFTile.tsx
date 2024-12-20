import React from 'react'
import { Card, CardHeader, CardContent, CardFooter } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { FileIcon, Calendar, File, Download } from 'lucide-react'
import { motion } from 'framer-motion';
import { tileVariants } from '@/utils/animation';
import { noteTypes } from '@/types'

interface PDFTileProps extends noteTypes {
    subjectName: string;
    subjectCode: string
}

interface Props {
    pdf: PDFTileProps
}

const PDFTile: React.FC<Props> = ({ pdf }) => {
    return (
        <motion.div
            variants={tileVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="group"
        >
            <Card className="transition-all duration-300">
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <FileIcon className="h-8 w-8 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-semibold line-clamp-2 capitalize">
                                {pdf.title}
                            </h3>
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="font-normal">
                                    {pdf.subjectName}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                    {pdf.subjectCode}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {pdf.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                                {new Date(pdf.uploadDate).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <File className="h-4 w-4" />
                            <span>{pdf.fileSize}</span>
                        </div>
                        {/*  <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            <span>{pdf.downloads} downloads</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>
                                {new Date(pdf.uploadDate).toLocaleDateString()}
                            </span>
                        </div> */}
                    </div>
                </CardContent>

                <CardFooter>
                    <Button
                        className="w-full gap-2 group-hover:bg-primary/90 transition-colors"
                        asChild
                    >
                        <a href={pdf.fileUrl} download target='_blank'>
                            <Download className="h-4 w-4" />
                            Download PDF
                        </a>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

export default PDFTile