import { Center, Image } from "@chakra-ui/react";


const NoDataFound = (props)=>{
    const {h} = props;

    return (
        <Center h={h} w='full' marginTop='20px' bg='#f1f1f1'>
            <Image src='https://cdn.dribbble.com/userupload/2905383/file/original-4ea237e94e803ddd575a66eb32198899.png?compress=1&resize=400x300&vertical=top' alt='none' w='400px' />
        </Center>
    )
}

export default NoDataFound;