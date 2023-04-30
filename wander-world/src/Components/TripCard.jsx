import { Box, Divider, Flex, Heading, HStack, Text, Image, VStack, Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";


const TripCard = (props)=>{
    const {data} = props;
    const checkIn = new Date(data['checkIn']);
    const checkOut = new Date(data['checkOut']);

    const [cancelState, setCancelState] = useState(false);

    useEffect(()=>{
        console.log(data);
        let today = new Date();
        if(today<checkIn){
            setCancelState(true);
        }
    },[]);

    const toast = useToast();

    const cancelBooking = async ()=>{
        try{
            const res = await axios({
                method : 'PATCH',
                url : `/user/cancelBooking/${data['_id']}`,
                baseURL : 'https://chartreuse-green-bighorn-sheep-wear.cyclic.app'
            });
            console.log(res.data);
            toast({
                title : `Booking ${res.data.id} has been cancelled.`,
                description  : 'To reschedule go to HOME page',
                duration : 1500,
                status : 'success',
                isClosable : true
            })
            props.get();
        }
        catch(err){
            console.log(err);
            toast({
                title : 'Booking Cancellation Failed!',
                description : err.message,
                duration : 1500,
                isClosable : true,
                status : 'error'
            })
        }
    }

    const decodeDay = (num)=>{
        switch(num){
            case 1 : return "Monday";
            case 2 : return "Tuesday";
            case 3 : return "Wednesday";
            case 4 : return "Thursday";
            case 5 : return "Friday";
            case 6 : return "Saturday";
            case 0 : return "Sunday";
        }
    }

    return (
        <>
        <Flex  direction={'column'} gap={5} border='1px solid lightgray' borderRadius='sm'  w='100%' margin='20px auto' textAlign='left' padding="10px 30px">
            <Text color="grey" fontSize="lg">Booking Id : <Text as="span" color="green.400">{data['_id']}</Text></Text>
            <Heading size="lg">{data.hotelName}</Heading>
            <Text fontSize='xl' mt="-10px" color='blue'>{data.hotelLocation}</Text>
            <HStack alignItems='flex-start' justifyContent="space-between" padding={3}>    
                <VStack textAlign='left' alignItems='flex-start' gap={3}>
                    <Heading size='md' color='grey.400'>Room Type : <Text as="span" fontSize="2xl" color="green.400">{data.roomDetails.roomName}</Text></Heading>
                    <Text fontSize='lg' color="grey"> No. of Travelers :<font color="black">{data.travellers}</font> </Text>
                    <Text fontSize='lg'>Check-in Date : <font color="red">{checkIn.getDate()}-{checkIn.getMonth()+1}-{checkIn.getFullYear()}, {decodeDay(checkIn.getDay())}</font></Text>
                    <Text fontSize='lg'>Check-out Date : <font color="red">{checkOut.getDate()}-{checkOut.getMonth()+1}-{checkOut.getFullYear()}, {decodeDay(checkOut.getDay())}</font></Text>
                    <Text mt={6} color="grey.400" fontSize="xl">Booked On : <Text as="span" color="blue.500" fontSize="xl"> {data.bookedOn} </Text></Text>
                </VStack>
                <Image src={data.roomDetails.roomImageURL} borderRadius="md" border="1px solid lightgray" alt='none' maxH='250px' />
            </HStack>
            <Divider />
            <Flex justifyContent='flex-end'>
                <Heading size='md' color='red.500'>Total : ${data.total}</Heading>
            </Flex>
            {
                data.cancelled===true?
                (
                    <Flex justifyContent={'flex-end'}>
                        <Text color="green.400" size="md">This booking was cancelled.</Text>
                    </Flex>
                ):
                (
                    <Flex justifyContent={'flex-end'} alignItems="center">
                        <Text color="red.400" display={cancelState?'none':'block'} fontSize={'sm'}>**Booking can not be Cancelled**</Text>
                        <Button colorScheme="red" display={cancelState?'block':'none'} variant='solid' onClick={cancelBooking}>Cancel Booking</Button>
                    </Flex>
                )
            }
            
        </Flex>
        </>
    )

}

export default TripCard;