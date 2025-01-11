import React from 'react'
import { motion } from 'motion/react'
import { teamMembers } from '@/data/TeamData'
import { fadeInUpVariants, springTransition, staggerContainerVariants } from '@/utils/animation'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

const Members: React.FC = () => {
    return (
        <motion.section
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
        >
            <motion.h2
                variants={fadeInUpVariants}
                className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
            >
                Meet Our Team
            </motion.h2>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {teamMembers.map((member) => (
                    <motion.div
                        key={member.name}
                        variants={fadeInUpVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={springTransition}
                    >
                        <Card className="transition-all duration-300 hover:shadow-xl group">
                            <CardContent className="text-center p-6 space-y-4">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={springTransition}
                                    className="w-32 h-32 rounded-full bg-muted mx-auto overflow-hidden ring-2 ring-primary/20 hover:ring-blue-500 ring-offset-2 transition-all ease-linear"
                                >
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                </motion.div>
                                <div>
                                    <h3 className="font-semibold text-lg">{member.name}</h3>
                                   {/*} <p className="text-sm text-muted-foreground">
                                        {member.role}
                                    </p>*/}
                                </div>
                                {member.linkedin && (
                                    <Button variant="outline" size="sm" asChild>
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Connect on LinkedIn
                                        </a>
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    )
}

export default Members