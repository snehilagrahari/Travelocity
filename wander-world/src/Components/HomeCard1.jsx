import {
    Card,
    CardBody,
    Image,
    Text
} from '@chakra-ui/react'

const HomeCard1 = (props)=>{

    return (
        <Card flex={1} w="full" textAlign='left' p={0} borderRadius='lg' overflow={'hidden'} boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}>
            <CardBody p={0}>
                <Image src={props.img} />
                <Text  fontSize='12px' bg='white' color='grey' p='10px'>{props.text}</Text>
            </CardBody>
        </Card>
    )
}

export default HomeCard1