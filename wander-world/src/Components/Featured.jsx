import { Card, CardHeader, CardBody, CardFooter, Heading, Text , Box, VStack} from '@chakra-ui/react'


const Featured = ()=>{

    return (
        <Box padding={10} gap={5} margin='10px 0px 20px 0px'>
            <Heading textAlign="left" w='full'>Featured Deals</Heading>
            <Card
            borderRadius='lg'
            bgImage={`url(https://forever.travel-assets.com/flex/flexmanager/images/2021/11/08/TVLY_Storefront_Family_imgB_1200x674_20211104.jpg)`}
            bgPosition='center'
            bgSize='100%'
            display={'flex'}  
            flexDirection='column'
            justifyContent='flex-end'
            h='240px'
            >
                <CardFooter textAlign={'left'} direction='column' >
                    <VStack alignItems={'flex-start'}>
                        <Heading size='md' color='white'>Family Vacation Deals</Heading>
                        <Text color='white' size='sm'>Seize your unforgettable family vacation at reasonable prices.</Text>
                    </VStack>
                </CardFooter>
            </Card>

        </Box>
    )
}

export default Featured