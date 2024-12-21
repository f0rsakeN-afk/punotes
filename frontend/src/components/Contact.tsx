import React from 'react'
import { motion } from 'motion/react'
import { springTransition } from '@/utils/animation'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Mail } from 'lucide-react'

const Contact: React.FC = () => {
    return (
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
                                <a href="mailto:punotes582@gmail.com">Contact Us</a>
                            </Button>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.section>
    )
}

export default Contact