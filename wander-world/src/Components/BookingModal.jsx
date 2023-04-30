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
    Spacer,
    HStack,
    Image,
    Divider,
    useToast
} from '@chakra-ui/react'
import { useContext, useState, useEffect, useRef } from 'react';
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

    const {authName,token} = useContext(AuthContext);

    const {searchForm, updateSearchForm} = useContext(SearchContext);
    const [loading , onLoading] = useState(false);
    const minDate = useRef(null);

    useEffect(()=>{
        minDate.current = new Date();
    },[])

    const [num , setNum ] = useState(1);

    useEffect(()=>{
        setNum(dateDiff(searchForm['check-in'],searchForm['check-out']));
    })
    
    const toggleLoading = (val)=>{
        onLoading(val);
    }

    let {room, hotelDetails, onClose, onOpen, isOpen} = props;

    const toast = useToast();

    const handleBooking = ()=>{
        // onLoading(true);
        confirmTrip();
    }

    const confirmTrip = ()=>{
        const creds = {
            hotelId : hotelDetails['_id'],
            hotelName : hotelDetails['hotelName'],
            hotelLocation : hotelDetails.hotelLocation,
            checkIn : searchForm['check-in'],
            checkOut : searchForm['check-out'],
            travellers : searchForm['travelers'],
            roomDetails : room,
            total : ((num?num:1)*Number(room?.roomPrice)*(100-hotelDetails.hotelDiscount)/100)
        };
        axios({
            method : 'POST',
            url : '/hotel/bookRoom',
            baseURL : 'https://chartreuse-green-bighorn-sheep-wear.cyclic.app',
            data : JSON.stringify(creds),
            headers : {
                Authorization : token,
                'Content-type' : 'application/json'
            }
        })
        .then((res)=>{
            onLoading(false);
            onClose();
            toast({
                title : res.message,
                description : `For Booking history go to Trips page.`,
                duration : 2000,
                status : 'success',
                isClosable : true
            });
        })
        .catch((err)=>{
            console.log(err);
            onLoading(false);
            onClose();
            toast({
                title : 'Booking Failed!',
                description : err.message,
                isClosable : true,
                status : 'error',
                duration : 2000
            });
        })

    }

    

    return (
        <>
            <Modal closeOnOverlayClick={false}  size={{base : 'sm', sm : 'md', md : 'xl', xl : '2xl'}} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader fontSize="xl" color="green.600">Confirm Booking</ModalHeader>
                    <ModalCloseButton />
                    <form>
                    <ModalBody pb={6}>
                            <HStack alignItems="center" gap={5}>
                                <Text fontSize="xl" color="#0a438b" fontWeight={'bold'}>Hotel Name : </Text>
                                <Text fontSize="xl" color="black" fontWeight={'bold'}>{hotelDetails.hotelName}</Text>
                            </HStack>
                            <HStack alignItems={'center'} gap={5}>
                            <Text fontSize="xl" color="#0a438b" fontWeight={'bold'}>City :</Text>
                                <Text fontSize="xl" fontWeight={"bold"}>{hotelDetails.hotelLocation}</Text>
                            </HStack>
                        <Flex gap={10} mt={4} padding={5} border="1px solid lightgrey" borderRadius={'lg'}>
                            <FormControl>
                                <FormLabel color={'#0a438b'}>Check-in</FormLabel>
                                <Input type="date"  onChange={(e)=>updateSearchForm({mode : 'check-in', data : e.target.value})} value={searchForm['check-in']} />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="#0a438b">Check-out</FormLabel>
                                <Input type={'date'} min={searchForm['check-in']} onChange={(e)=>updateSearchForm({mode : 'check-out',data : e.target.value})} value={searchForm['check-out']} />
                        </FormControl>
                        </Flex>
                        <FormControl padding={5} mt={2} border="1px solid lightgrey" borderRadius="lg">
                            <FormLabel color="#0a438b">Travelers</FormLabel>
                            <Select placeholder='No. Of Travelers' value={searchForm.travelers} onChange={(e)=>updateSearchForm({mode: 'travelers',data : e.target.value})}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </Select>
                        </FormControl>
                        <HStack alignItems="start" mt={4}>
                            <Box margin='20px 0px' flex={6}>
                                <Text color="#0a438b" fontSize='lg'>Room Details</Text>
                                <Text fontSize='md' mt={3}>Room Name :<b> {room?.roomName}</b></Text>
                                <Text fontSize='md'>Room Price :<b> $ {room?.roomPrice}/day</b></Text> 
                                <Text fontSize='md'>Number of Days : <b> {num?num:1} Days</b></Text> 
                            </Box>
                            <Box flex={4}>
                                <Image src={room?.roomImageURL} alt={room?.roomName} />
                            </Box>
                        </HStack>
                        
                        <Heading size='lg' color="#0a438b">Pricing Details</Heading>
                        <Flex direction="column" margin='20px 0px' alignItems={'start'} w="full" mt={4} border="1px solid lightgrey" padding={4} borderRadius={'lg'} gap={3}>
                            
                            <HStack alignItems="center" justifyContent="space-between" w="full">
                                <Text color="grey" fontSize="lg">Total Price</Text>
                                <Text fontSize='lg' fontWeight='bold' color='grey'>$ {(num?num:1)*Number(room?.roomPrice)}</Text>   
                            </HStack>
                            <HStack alignItems="center" justifyContent="space-between" w="full">
                                <Text color="grey" fontSize="lg">Hotel Discount</Text>
                                <Text color="grey" fontSize="md" >( -{hotelDetails.hotelDiscount}% ) 
                                <Text as="span" color="black" fontSize="xl"> $ {((num?num:1)*room?.roomPrice*hotelDetails.hotelDiscount / 100).toFixed(2)}</Text></Text>
                            </HStack>
                            <Divider />
                            <HStack alignItems="center" justifyContent="space-between" w="full">
                                <Text color="black" fontSize="lg" fontWeight="bold">Net Payable</Text>
                                <Text color="red" fontSize="xl" fontWeight="bold">$ {((num?num:1)*Number(room?.roomPrice)*(100-hotelDetails.hotelDiscount)/100)}</Text>
                            </HStack>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            isLoading={loading}
                            loadingText='Submitting'
                            colorScheme='teal'
                            variant='solid'
                            onClick={handleBooking}
                        >
                            Confirm Booking
                        </Button>
                        <Button ml={4} onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                    </form>
                    </ModalContent>
            </Modal>
        </>
    )
}
  
export  default BookingModal