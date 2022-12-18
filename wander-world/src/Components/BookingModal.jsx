import {
    Button,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalContent,
    ModalFooter,
    Input,
    Select,
    Flex,
    Box,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Spacer
} from '@chakra-ui/react'
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../Contexts/AuthContext';
import SearchContext from '../Contexts/SearchContext'
import { displaySnackBar } from './SnackBar';
import axios from 'axios';

function dateDiff(date1, date2) {
    // Convert the date strings to Date objects
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    // Calculate the difference between the two dates in milliseconds
    const diff = d2.getTime() - d1.getTime();
    


    // Convert the difference to days
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
    // Return the number of days between the two dates
    return days;
  }

function BookingModal(props) {

    const {authName,authId} = useContext(AuthContext);

    const {searchForm} = useContext(SearchContext);
    const [loading , onLoading] = useState(false);

    const [num , setNum ] = useState(1);

    useEffect(()=>{
        setNum(dateDiff(searchForm['check-in'],searchForm['check-out']));
    })
    
    const toggleLoading = (val)=>{
        onLoading(val);
    }

    let {room,hotelName , onClose, onOpen, isOpen} = props;

    const handleBooking = ()=>{
        onLoading(true);
        confirmTrip();
        
    }

    const confirmTrip = ()=>{

        const data = {
            profileId : authId,
            hotelName : hotelName,
            total : ((num?num:1)*Number(room.roomPrice)),
            roomDetails : room,
            ...searchForm
        }

        axios.post('http://localhost:8000/trips',data)
        .then((res)=>{
            onLoading(false);
            onClose();
            displaySnackBar('Trip Confirmed','Happy Traveling');
        })
        .catch((err)=>{
            onLoading(false);
            onClose();
            displaySnackBar("Error! Try again later");
        })

    }

    

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Booking Details</ModalHeader>
                    <ModalCloseButton />
                    <form>
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input value={authName} isDisabled />
                        </FormControl>
                        <FormControl>
                            <FormLabel>City</FormLabel>
                            <Input value={searchForm.place} isDisabled />
                        </FormControl>
                        <Flex gap={10}>
                            <FormControl>
                                <FormLabel>Check-in</FormLabel>
                                <Input value={searchForm['check-in']} isDisabled />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Check-out</FormLabel>
                                <Input value={searchForm['check-out']} isDisabled />
                        </FormControl>
                        </Flex>
                        <FormControl>
                            <FormLabel>Travelers</FormLabel>
                            <Input value={searchForm['travelers']} isDisabled />
                        </FormControl>
                        <Box margin='20px 0px'>
                            <Heading size='md'>Room Details</Heading>
                            <Text fontSize='md'>Room Name :<b> {room?.roomName}</b></Text>
                            <Text fontSize='md'>Room Price :<b> $ {room?.roomPrice}/day</b></Text> 
                            <Text fontSize='md'>Number of Days :<b>{num?num:1} Days</b></Text> 
                        </Box>
                        <Flex margin='20px 0px'>
                            <Heading size='lg'>Total</Heading>
                            <Spacer />
                            <Text fontSize='lg' fontWeight='bold' color='red'>$ {(num?num:1)*Number(room?.roomPrice)}</Text>   
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            isLoading={loading}
                            loadingText='Submitting'
                            colorScheme='teal'
                            variant='outline'
                            onClick={handleBooking}
                        >
                            Submit
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                    </form>
                    </ModalContent>
            </Modal>
        </>
    )
}
  
export  default BookingModal