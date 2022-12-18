import { Card, 
    CardHeader, 
    CardBody, 
    CardFooter,
    Heading,
    Image,
    Text,
    Flex,
    Stack,
    Divider,
    Button,
    ButtonGroup
} from '@chakra-ui/react'

 
const RoomCard = (props) => {


    const handleReserve = ()=>{
        props.buttonClick();
        props.setRoom(props.roomDetails);
    }

    return (
        <Card variant='outline' w='100%'>
            <CardBody p={1}>
                <Image
                src={props.roomImageURL}
                alt={props.roomName}
                borderRadius='lg'
                />
                <Stack mt='6' spacing='3' p='10px 20px'>
                <Heading size='md'>{props.roomName}</Heading>
                <Flex direction={'column'} gap='3px' textAlign='flex-start'>
                    {
                        props.roomAmenities.map((el,i)=> <Text key={i} color='gray' fontSize='md'>{el}</Text>)
                    }  
                </Flex>
                <Text color='blue.600' fontSize='2xl'>
                    ${props.roomPrice}
                </Text>
                <Text color='gray.500' fontSize='md'>
                    {props.roomRating}/5.0 Guest Rating
                </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                <Button variant='solid' colorScheme='blue' onClick={handleReserve}>
                    Reserve
                </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )

 }

 export default RoomCard