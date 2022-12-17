import { Box, Accordion, AccordionItem, AccordionIcon, AccordionButton, AccordionPanel, Text, Divider, Heading } from "@chakra-ui/react"


const HomeAccordion = (props)=>{

    const {data} = props;

    return (
        <>
            <Accordion allowToggle p={10}>
            {
                data.map((el,i)=><AccordionItem borderRadius={'lg'} overflow='hidden' border='1px solid lightgrey' margin={'10px'} key={i}>
                <h2>
                <AccordionButton>
                    <Heading as="h1" size='md' flex='1' textAlign='left' p={2}>
                    {el.title}
                    </Heading>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <Divider />
                <AccordionPanel pb={4} color='blue' textAlign={'left'}>
                {el.options.map((ele,i)=>{
                    return <Text key={i}>{ele}</Text>
                })}
                </AccordionPanel>
            </AccordionItem>)
            }
            </Accordion>
        </>
    )
}

export default HomeAccordion