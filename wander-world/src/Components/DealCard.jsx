import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react"

const DealCard = (props)=>{

    const {heading,  image, description } = props;
    return (
        <>
        <Box 
        flex={1}
        bgImage={`url(${image})`}
        bgSize='full'
        bgPos={'center'}
        filter='grayscale(50%)'
        p='50px 30px 70px 30px'
        borderRadius='lg'
        >
            <VStack h='full' w='60%' alignItems='start' textAlign={'left'}>
                <Heading size='md' color='black'>{heading}</Heading>
                <Text color='black' size='sm'>{description}</Text>
                <Button variant="solid" bg='white' color='black' alignSelf={'flex-start'}>View Deals</Button>
            </VStack>

        </Box>
        </>
    )
}

export default DealCard