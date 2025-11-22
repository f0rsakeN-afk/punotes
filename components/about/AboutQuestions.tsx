import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      "We offer a growing collection of study materials, including lecture notes, past exam papers, assignments, and projects.  Our goal is to provide resources for all engineering branches and semesters.",
  },
  {
    question: "How can I contribute or report issues?",
    answer:
      "To share notes or other materials, please mail us on the  gmail given below in contact section. For bug reports or to contribute code, please contact us at the same gmail address to request access to our GitHub repository.",
  },
  {
    question: "What are your future plans?",
    answer:      "We're continually improving PUNotes. Future plans include expanding our resource library, enhancing search functionality, and adding community features to facilitate collaboration amongst students.",
  },
  {
    question: "Are the materials on PUNotes reviewed for accuracy?",
    answer:
      "We strive to provide accurate and helpful materials. While we encourage students to verify the content for academic use, we ensure that most materials are reviewed by the community or contributors before being made available.",
  },
];

const FAQ = () => {
  return (
    <div className="flex items-center justify-center px-2 py-12 max-w-(--breakpoint-xl) mx-auto">
      <div className="flex flex-col md:flex-row items-start gap-x-12 gap-y-6">
        <h2 className="text-4xl lg:text-5xl leading-[1.15]! font-semibold tracking-tighter text-primary">
          Frequently Asked <br /> Questions
        </h2>

        <Accordion
          type="single"
          defaultValue="question-0"
          className="max-w-[850px]"
        >
          {faq.map(({ question, answer }, index) => (
            <AccordionItem key={question} value={`question-${index}`}>
              <AccordionTrigger className="text-left text-lg">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
