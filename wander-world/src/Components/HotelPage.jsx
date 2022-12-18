import { Box,Text,Container,Heading,Grid,Flex, GridItem, Image, HStack, VStack, Divider,Modal,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalContent,
    ModalFooter,
    Input,
    Select,
    Button 
} from '@chakra-ui/react';
import {
    useState ,
    useEffect
}   from 'react'
import FullPageLoader from './FullPageLoader'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import RoomCard from './RoomCard';
import { useDisclosure } from '@chakra-ui/react';
import BookingModal from './BookingModal';


const HotelPage = ()=>{

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [HotelDetails, setHotelDetails] = useState({});

    const [room , setRoom] = useState(null);

    const [isLoading , setLoading] = useState(true);

    const {hotelId} = useParams(); 

    useEffect(()=>{
        getHotelDetails();
    },[])

    const getHotelDetails = ()=>{
        axios.get(`http://localhost:8000/hotels/${hotelId}`)
        .then((res)=>{
            setHotelDetails(res.data);
            setLoading(false);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const toggleRoom = (val)=>{
        setRoom(val);
    }

    return isLoading ?
    (
        <FullPageLoader height='87vh'/>
    ) :
    (
        <>
        <Box width='80%' textAlign='left' margin='30px 40px'>
            <Box w='100%'>
                    <Grid w='100%' templateColumns='2fr 1fr 1fr' gap={2} templateRows='200px 200px'>
                        <GridItem rowSpan={2}>
                            <Image src={HotelDetails.hotelImages[0]} w='100%' h='100%'/>
                        </GridItem>
                        <GridItem>
                            <Image src={HotelDetails.hotelImages[1]} w='100%' h='100%' />
                        </GridItem>
                        <GridItem>
                            <Image src={HotelDetails.hotelImages[2]} w='100%' h='100%' />
                        </GridItem>
                        <GridItem>
                            <Image src={HotelDetails.hotelImages[3]} w='100%' h='100%'/>
                        </GridItem>
                        <GridItem>
                            <Image src={HotelDetails.hotelImages[4]} w='100%' h='100%'/>
                        </GridItem>

                    </Grid>
                    <Heading as='h1' size='xl'>{HotelDetails.hotelName}</Heading>
                    <Heading color='gray.500' size='md'>{HotelDetails.hotelLocation}</Heading>
                    <VStack margin='20px 0px' alignItems='flex-start' spacing={10}>
                        <Heading fontWeight='bold' size='lg'>{HotelDetails.hotelRating}/10 Wonderful</Heading>
                        <Text color='blue' fontSize='md'>See all {HotelDetails.hotelReviews} Reviews</Text>
                        <Box>
                        <Heading as='h5' size='lg'>Popular Amenities</Heading>
                        <Grid templateColumns='250px 250px' margin={5} gap={5}>
                            {
                                HotelDetails.hotelAmenities.map((el,i)=><Text key={i} fontWeight='semibold' color='gray' fontSize='lg'>{i+1}. {el}</Text>)
                            }
                        </Grid>
                    </Box>

                </VStack>
            </Box>

            <Box margin='70px auto'>
                <Heading as="h2" size='lg'>Choose Rooms</Heading>
                <Divider />
                <Divider />
                <Grid templateColumns='1fr 1fr 1fr' gap={8} margin='20px 0px'>
                    {
                        HotelDetails.hotelRooms.map((el,i)=>{
                            return <RoomCard {...el} key={i} roomDetails={el} setRoom={toggleRoom} buttonClick={onOpen} />
                        })
                    }
                </Grid>
            </Box>
            <Box>
                <BookingModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} room={room} />
            </Box>
                
        </Box>
        </>
    )
}

export default HotelPage