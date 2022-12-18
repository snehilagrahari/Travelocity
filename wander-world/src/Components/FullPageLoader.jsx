import { Center , Image, Spinner, Stack } from "@chakra-ui/react"
import Travelocity from '../travelocity.png'

const FullPageLoader = (props)=>{

    const {height} = props;
    return (
        <Center w='full' h={height} bg='aliceblue' margin={0}>
            <Stack alignItems='center' spacing={4} >
                <Image src={'https://download.logo.wine/logo/Travelocity/Travelocity-Logo.wine.png'} w='300px' borderRadius='lg' alt='logo'/>
                <Spinner size='xl' color='blue' thickness="5px" emptyColor="grey" />
            </Stack>
        </Center>
    )

}

export default FullPageLoader