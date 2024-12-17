import React from 'react'
import { motion } from 'motion/react'
import { Search } from 'lucide-react'


interface Props {
    text: string;
}

const NotFound: React.FC<Props> = ({ text }) => {
    return (
        <motion.div
            className="text-center w-full py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            </motion.div>
            <h2 className="text-xl font-semibold mb-2">No {text} Found</h2>
            <p className="text-muted-foreground">
                Try adjusting your search terms or check back later for new {text}
            </p>
        </motion.div>
    )
}

export default NotFound