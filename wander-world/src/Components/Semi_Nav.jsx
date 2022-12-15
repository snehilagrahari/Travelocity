import { Flex,Spacer, Heading, Button } from "@chakra-ui/react"

import {BiLeftArrowAlt} from 'react-icons/bi'


const Semi_Nav = ()=>{


    return (
        <Flex bg='#fff' color='black' height='60px' width="full" border='1px solid lightgrey' alignItems={'center'} padding="10px">
            <Button variant={"ghost"} color='blue.300' fontSize="30px"><BiLeftArrowAlt /> </Button>
            <Spacer />
            <Heading size='md'>Travelocity</Heading>
            <Spacer />
            <Button variant="ghost"> </Button>
        </Flex>
    )

}

export default Semi_Nav