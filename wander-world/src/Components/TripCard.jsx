import { Box, Divider, Flex, Heading, HStack, Text, Image, VStack } from "@chakra-ui/react";


const TripCard = (props)=>{


    return (
        <>
        <Flex  direction={'column'} gap={5} border='1px solid lightgrey' borderRadius='lg' padding={5} w='90%' margin='20px auto' textAlign='left'>
            <HStack alignItems='flex-start'>    
                <Image src={props.roomDetails.roomImageURL} alt='none' maxH='250px' />
                <VStack textAlign='left' alignItems='flex-start'>
                    <Heading size='lg'>{props.hotelName}</Heading>
                    <Heading size='md' color='blue'>{props.place}</Heading>
                    <Heading size='sm' color='gray.500'>{props.roomDetails.roomName}</Heading>
                    <Text fontSize='md'> Travelers : {props.travelers}</Text>
                    <Text fontSize='md'>Check-in Date : {props['check-in']}</Text>
                    <Text fontSize='md'>Check-out Date : {props['check-out']}</Text>
                </VStack>
            </HStack>
            <Divider />
            <Flex justifyContent='flex-end'>
                <Heading size='md' color='red.500'>Total : ${props.total}</Heading>
            </Flex>
        </Flex>
        </>
    )

}

export default TripCard;