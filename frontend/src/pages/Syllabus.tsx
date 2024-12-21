import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { containerVariants, itemVariants } from '@/utils/animation'
import { Input } from '@/components/ui/input'
import NotFound from '@/components/NotFound'
import { SyllabusData } from '@/data/SyllabusData'
import SyllabusTile from '@/components/SyllabusTile'

const Syllabus = () => {
    /* Query state */
    const [searchQuery, setSearchQuery] = useState<string>('')

    //filter logic
    const filteredSyllabus = SyllabusData.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.branch.toLowerCase().includes(searchQuery.toLowerCase()))


    return (
        <motion.div className="min-h-screen bg-background" initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>
            <div className="container mx-auto max-w-7xl px-4">
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
                        Syllabus
                    </motion.h1>
                    <motion.p
                        className="text-lg text-muted-foreground"
                        variants={itemVariants}
                    >
                        Access and download syllabus for all semesters and branches
                    </motion.p>
                </motion.div>

                {/* Search box */}
                <motion.div className="mb-8 max-w-2xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}>
                    <Input
                        placeholder="Search syllabus by name, branch..."
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchQuery(e.target.value)
                        }
                        className="bg-background/50  border border-border/50
                                 focus:ring-2 focus:ring-primary/20 transition-all duration-300 "
                    />
                </motion.div>

                {/* mapping and displaying data */}
                <AnimatePresence mode="wait">
                    {filteredSyllabus.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            layout
                        >
                            {filteredSyllabus.map((s) => (
                                <motion.div
                                    key={s.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <SyllabusTile s={s} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <NotFound text={"Assignments"} />
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

export default Syllabus