import React from 'react'

// Import Chakra
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react' // import chakra ui accordion

// Import Data For Accordion
import { AccordionData } from './Data/Accordion Data' // import data for accordion

export default function Accordions () {
  return (
    <div>
      <h1 className='font-mono, font-extrabold text-center lg:text-2xl text-xl mt-10'> Few Common Questions</h1>
      <Accordion allowToggle className='mx-10 my-7'>
        {AccordionData.map((data, index) => {
				  return (
  <AccordionItem key={index}>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left' className='font-bold'>
          {data.Question}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>{data.Answer}</AccordionPanel>
  </AccordionItem>
				  )
        })}
      </Accordion>
    </div>
  )
}
