import React from 'react'
import { motion } from 'motion/react'
import { staggerContainerVariants, fadeInUpVariants } from '@/utils/animation'
import { Check } from 'lucide-react'
import { Card, CardHeader, CardContent } from './ui/card'


const Mission: React.FC = () => {
    return (
        <motion.section
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
        >
            <motion.div variants={fadeInUpVariants} className="h-full">
                <Card className="transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                    <CardHeader>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Our Mission
                        </h2>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-center">
                        <p className="text-muted-foreground leading-relaxed">
                            We aim to make quality education accessible to all engineering students by providing a centralized platform for study materials, notes, and resources. Our goal is to support students in their academic journey and help them excel by offering the tools they need to understand key concepts and improve their performance.
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="h-full">
                <Card className="transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                    <CardHeader>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            What We Offer
                        </h2>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-center">
                        <ul className="space-y-3 text-muted-foreground w-full">
                            {[
                                "Comprehensive study materials for all semesters",
                                "Branch-specific resources and notes",
                                "Past examination papers",
                                "Regularly updated content",
                            ].map((item) => (
                                <motion.li
                                    key={item}
                                    variants={fadeInUpVariants}
                                    className="flex items-center gap-2"
                                >
                                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                                    <span>{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.section>
    )
}

export default Mission