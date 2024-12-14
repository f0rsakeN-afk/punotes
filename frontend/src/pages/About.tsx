import React from "react";
import { motion } from 'motion/react'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Check } from "lucide-react";
import { springTransition, fadeInUpVariants, staggerContainerVariants } from "@/utils/animation";
import Members from "@/components/Members";


const About: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-b from-background to-secondary/10"
        >
            <div className="container mx-auto max-w-7xl py-16 px-4 space-y-20">
                {/* Hero Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-6"
                >
                    <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        About PU Notes
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Your comprehensive resource for engineering study materials at
                        Purbanchal University
                    </p>
                </motion.section>

                {/* Mission Section */}
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


                {/* Team Section */}
                <Members />

                {/* Contact Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={springTransition}
                    >
                        <Card className="transition-all duration-300 hover:shadow-xl bg-primary/5">
                            <CardContent className="text-center p-12 space-y-6">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                    Get in Touch
                                </h2>
                                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                    Have questions or suggestions? We'd love to hear from you! Reach
                                    out to us anytime.
                                </p>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={springTransition}
                                    className="flex justify-center gap-4"
                                >
                                    <Button size="lg" className="gap-2">
                                        <Mail className="h-5 w-5" />
                                        <a href="mailto:contact@punotes.com">Contact Us</a>
                                    </Button>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.section>
            </div>
        </motion.div>
    );
};

export default About;