import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { accordionData } from '@/data/AccordionData'

const AboutQuestions: React.FC = () => {
    return (
        <Accordion type='single' collapsible className='w-full'>
            {accordionData.map(el => (
                <AccordionItem value={el.content} key={el.id}>
                    <AccordionTrigger>{el.title}</AccordionTrigger>
                    <AccordionContent>{el.content}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}

export default AboutQuestions;