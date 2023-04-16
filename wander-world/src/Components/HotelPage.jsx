import { Box,Text,Container,Heading,Grid,Flex, GridItem, Image, HStack, VStack, Divider,Modal,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalContent,
    ModalFooter,
    Input,
    Select,
    Button, 
    useToast
} from '@chakra-ui/react';
import {
    useState ,
    useEffect
}   from 'react'
import FullPageLoader from './FullPageLoader'
import {useNavigate, useParams} from 'react-router-dom'
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

    const toast = useToast();
    const nav = useNavigate();

    const getHotelDetails = ()=>{
        setLoading(true);
        axios.get(`https://chartreuse-green-bighorn-sheep-wear.cyclic.app/hotel/${hotelId}`)
        .then((res)=>{
            setHotelDetails(res.data);
            // console.log(res.data);
            setLoading(false);
        })
        .catch((err)=>{
            toast({
                title : 'Hotel Id not found!',
                description : 'Naviagting to Search Page',
                duration : 2000,
                status : 'info',
                isClosable : true
            });
            nav('/Hotel-Search');
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
        <Box width='80%' textAlign='left' margin='40px auto'>
            <Box w='100%'>
                    <Grid w='100%' templateColumns='2fr 1fr 1fr' gap={2} padding={10} border="2px solid lightgrey" templateRows='200px 200px'>
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
                    <Heading mt="20px" as='h1' size='xl'>{HotelDetails.hotelName}</Heading>
                    <Text color='gray.500' mt={3} fontSize='xl'>{HotelDetails.hotelLocation}</Text>
                    <VStack margin='20px 0px' padding={7} border="1px solid lightgrey" alignItems='flex-start' spacing={10}>
                        <Text fontSize='2xl'><Text as="span" fontSize="2xl" color="#0a438b">Guest Ratings : </Text>{HotelDetails.hotelRating}/10 Wonderful</Text>
                        <HStack gap={10}>
                            <Text fontSize="2xl" color="#0a438b">Guest Reviews : <font color="black">{HotelDetails.hotelReviews}</font></Text>
                            <Text color='blue' textDecoration={"underline"} fontSize='lg'>See all Reviews </Text>
                        </HStack>
                        <Box>
                        <Heading as='h5' size='lg' color="#0a438b">Popular Amenities</Heading>
                        <Grid templateColumns='250px 250px' margin={5} gap={5}>
                            {
                                HotelDetails.hotelAmenities.map((el,i)=><Text key={i} color='black' fontSize='xl'>{i+1}. {el}</Text>)
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
                <BookingModal onClose={onClose} onOpen={onOpen} hotelDetails={HotelDetails} isOpen={isOpen} room={room} />
            </Box>
                
        </Box>
        </>
    )
}

export default HotelPage