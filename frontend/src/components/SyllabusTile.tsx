import React from 'react'
import { motion } from 'motion/react'
import { SyllabusTypes } from '@/types'
import { Card, CardHeader, CardFooter } from './ui/card'
import { Download, FileIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

type Props = {
    s: SyllabusTypes
}

const SyllabusTile: React.FC<Props> = ({ s }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            <Card className='transition-all duration-300 '>
                <CardHeader>
                    <motion.div className="flex items-start gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                        <motion.div
                            className="p-2 rounded-lg bg-primary/10"
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            <FileIcon className="h-8 w-8 text-primary" />
                        </motion.div>
                        <div className="space-y-1">
                            <h3 className="font-medium line-clamp-2 capitalize">
                                {s.name}
                            </h3>
                            <div className="flex flex-wrap gap-2 items-center">
                                <Badge variant="secondary" className="font-normal">
                                    {s.branch}
                                </Badge>
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
                                href={s.url}
                                target='_blank'
                                download
                                className="flex items-center justify-center"
                            >
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Download className="h-4 w-4" />
                                </motion.div>
                                Download
                            </a>
                        </Button>
                    </motion.div>
                </CardFooter>
            </Card>

        </motion.div >
    )
}

export default SyllabusTile