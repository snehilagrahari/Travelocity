import { Box,Flex,HStack,Heading,Image,Tag,Text } from "@chakra-ui/react"
import {useNavigate} from 'react-router-dom'


const SearchHotelCard = (props)=>{

    const {
        _id,
        hotelLocation,
        hotelDiscount,
        hotelPrice,
        hotelImages,
        hotelName,
        hotelStar,
        hotelRating,
        hotelReviews,
    } = props

    const navigate = useNavigate() ;


    const handleClick=()=>{
        navigate(`/Hotels/${_id}`);
    }


    return (
        <>
            <Box border="1px solid lightgray" borderRadius='lg' minH='200px' onClick={handleClick} cursor='pointer' _hover={{border:'1px solid blue'}}>
                <Flex direction='row' h='full'>
                    <Image src={hotelImages[0]} w='30%' borderTopLeftRadius='lg' maxH='250px' borderBottomLeftRadius='lg'/>

                    <Flex direction='column' w='70%'h='full' p={2}>
                        <Heading textAlign='left' size='md'>{hotelName}</Heading>
                        <Text color='grey' size='sm' textAlign='left'>{hotelLocation}</Text>
                        <Text textAlign='left' fontSize='14px' color='grey'>{hotelStar}-star Property</Text>
                        <Flex direction='row' h='full'>
                            <Flex direction='column-reverse' flex={1}
                            alignItems='start'
                            >
                                <Text color='grey' size='sm'><b>{hotelRating}/10</b> {'word for it'}</Text>
                                <Text color='grey' fontSize='14px'>{hotelReviews} reviews
                                </Text>
                            </Flex>
                            <Flex flex={1}
                            direction='column-reverse' 
                            alignItems='flex-end' p='20px 2px 5px 2px'>
                                <Text color='grey' fontSize='12px'>includes taxes & fees</Text>
                                <Text color='grey' fontSize='12px'>${parseInt(1.1*hotelPrice)} total</Text>
                                <HStack gap={3} alignItems={'center'}>
                                    <Text fontSize='lg' color="grey" textDecoration={"line-through"} >${hotelPrice} </Text> 
                                    <Text textDecoration="none" color="black" fontSize="2xl" fontWeight="bold">${hotelPrice - (hotelDiscount*hotelPrice/100)}</Text>
                                </HStack>
                                <Tag bg='#ebf3f9' color='blue' p='10px 15px'>{hotelDiscount}% discount</Tag>

                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default SearchHotelCard