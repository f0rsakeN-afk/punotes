"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { motion } from "motion/react";

const faq = [
  {
    question: "What is PUNotes?",
    answer:
      "PUNotes is a free online resource providing Purbanchal University engineering students with easy access to high-quality study materials. We aim to improve academic performance by centralizing valuable learning resources.",
  },
  {
    question: "Who created PUNotes?",
    answer:
      "PUNotes was created by a team of dedicated Purbanchal University engineering students passionate about enhancing the learning experience for their peers. We're committed to providing a valuable resource for the student community.",
  },
  {
    question: "What resources does PUNotes offer?",
    answer:
      "We offer a growing collection of study materials, including lecture notes, past exam papers, assignments, and projects. Our goal is to provide resources for all engineering branches and semesters.",
  },
  {
    question: "How can I contribute or report issues?",
    answer:
      "To share notes or other materials, please mail us on the gmail given below in contact section. For bug reports or to contribute code, please contact us at the same gmail address to request access to our GitHub repository.",
  },
  {
    question: "What are your future plans?",
    answer:
      "We're continually improving PUNotes. Future plans include expanding our resource library, enhancing search functionality, and adding community features to facilitate collaboration amongst students.",
  },
  {
    question: "Are the materials on PUNotes reviewed for accuracy?",
    answer:
      "We strive to provide accurate and helpful materials. While we encourage students to verify the content for academic use, we ensure that most materials are reviewed by the community or contributors before being made available.",
  },
];

const FAQ = () => {
  return (
    <div className="flex items-center justify-center px-4 py-16 max-w-(--breakpoint-xl) mx-auto">
      <div className="w-full space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium mb-4 backdrop-blur-sm">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
            Frequently Asked
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 text-transparent bg-clip-text">
              Questions
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about PUNotes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Accordion
            type="single"
            defaultValue="question-0"
            className="space-y-4"
          >
            {faq.map(({ question, answer }, index) => (
              <AccordionItem
                key={question}
                value={`question-${index}`}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl px-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl hover:border-primary/30 transition-all duration-300 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors py-6 hover:no-underline">
                  <span className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    {question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-base text-slate-600 dark:text-slate-400 pb-6 pl-11 leading-relaxed">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
