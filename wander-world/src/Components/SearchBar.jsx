import {
    Box,
    Heading,
    FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel, 
  Flex,
  Input,
  Text,
  Select,
  InputGroup,
  InputLeftElement,
  Button,
  Image,
  Center,
  VStack
} from '@chakra-ui/react'
import { useContext, useEffect, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {ImLocation} from 'react-icons/im'
import SearchContext from '../Contexts/SearchContext'
import findDate from './TodayDate'
import style from './style.module.css' 
import {GoLocation} from 'react-icons/go'


const city = [
    "San Francisco",
    "Chicago",
    "Delhi"
]


const SearchBar = ()=>{

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const {year, day, month} = findDate();

    const {searchForm, updateSearchForm} = useContext(SearchContext);

    useEffect(()=>{
        document.getElementById('searchBar').addEventListener('input',()=>{
            setShow(true);
        })
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault();
        navigate(`/Hotel-Search`);
    }

    const handleFormChange = (e)=>{
        const action = {
            mode : e.target.name,
            data : e.target.value
        }

        updateSearchForm(action);
    }


    const handleOptionClick = (e)=>{
        const action = {
            mode : 'place',
            data : e
        };
        updateSearchForm(action);
        setShow(false);
    }

    return (
        <Box p={'25px 40px'}  
        bgImage="url(https://forever.travel-assets.com/flex/flexmanager/images/2021/06/25/TVLY_SeizeYourSomeday_lpheroB_1680x945_20210623.jpg?impolicy=fcrop&w=900&h=225&q=mediumHigh)"
        bgSize='full'
        bgPos='center'>
            <Box borderRadius={'20px'} w='full' bg='white' p='30px 0'>
                <Tabs>
                    <TabList justifyContent='center'>
                        <Tab>Stays</Tab>
                        <Tab>Flights</Tab>
                        <Tab>Cars</Tab>
                        <Tab>Packages</Tab>
                        <Tab>Things To Do</Tab>
                        <Tab>Cruises</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <form onSubmit={handleSubmit}>
                                <FormControl p='40px 10px'>
                                <Flex gap={5}>
                                    <Flex direction={"column"} position="relative" flex={3}>
                                        <Box>
                                            <FormLabel fontSize='md'>Place</FormLabel>
                                            <InputGroup >
                                                <InputLeftElement
                                                pointerEvents='none'
                                                children={<ImLocation size="18px" color='grey' />}
                                                />
                                                <Input 
                                                id="searchBar"
                                                type='text' 
                                                name='place'
                                                placeholder='Going to...' 
                                                value={searchForm.place} 
                                                onChange={handleFormChange}
                                                required />
                                            </InputGroup>
                                        </Box>
                                        <VStack id="suggestionBox" position="absolute" display={show===true?'flex':'none'} top="100%" border="1px solid lightgrey" width="100%" zIndex={3} alignItems={'flex-start'} background="white">
                                            {
                                                city.map((el)=>(
                                                <>
                                                    <Flex direction="row" alignItems="center" onClick={(e)=>{
                                                        e.preventDefault();
                                                        handleOptionClick(el)}} _hover={{background : "#eee", cursor : 'pointer'}} padding={"20px 40px"} width="100%"  gap={3} key={el} color="rgb(106,106,106)">
                                                        <GoLocation size="30px" color="grey" />
                                                        <Text color="rgb(106,106,106)">{el}</Text>
                                                    </Flex>
                                                </>))
                                            }
                                        </VStack>
                                    </Flex>
                                    <Box flex={1}>  
                                        <FormLabel fontSize='md'>Check-in</FormLabel>
                                        <Input 
                                        name='check-in'
                                        type='date' 
                                        value={searchForm['check-in']}
                                        onChange={handleFormChange}
                                        min={`${year}-${month<=9?'0'+month:month}-${day+1<=9?'0'+(day):(day)}`}
                                        color='grey'
                                        required/>
                                    </Box>
                                    <Box flex={1}>  
                                        <FormLabel fontSize='md'>Check-out</FormLabel>
                                        <Input 
                                        name='check-out'
                                        type='date' 
                                        value={searchForm['check-out']}
                                        min={searchForm['check-in']}
                                        onChange={handleFormChange}
                                        color='grey'
                                        required/>
                                    </Box>
                                    <Box flex={1}>  
                                        <FormLabel fontSize='md'>Travelers</FormLabel>
                                            <Select 
                                            name='travelers'
                                            placeholder='Travelers' 
                                            value={searchForm.travelers}
                                            onChange={handleFormChange}
                                            color='grey'
                                            required>
                                                <option value='1'>1</option>
                                                <option value='2'>2</option>
                                                <option value='3'>3</option>
                                                <option value='4'>4</option>
                                            </Select>
                                    </Box>
                                </Flex>
                                </FormControl>
                                <Button p='5px 80px' fontSize='18px' color="white" variant='solid' colorScheme='blue' type="submit">Search</Button>
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <Center>
                                <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGNiykcCjcrcO5NwMvsvGVl983zktIkYV9aw&usqp=CAU' />
                            </Center>
                        </TabPanel>
                        <TabPanel>
                            <Center>
                                <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGNiykcCjcrcO5NwMvsvGVl983zktIkYV9aw&usqp=CAU' />
                            </Center>
                        </TabPanel>
                        <TabPanel>
                            <Center>
                                <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGNiykcCjcrcO5NwMvsvGVl983zktIkYV9aw&usqp=CAU' />
                            </Center>
                        </TabPanel>
                        <TabPanel>
                            <Center>
                                <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGNiykcCjcrcO5NwMvsvGVl983zktIkYV9aw&usqp=CAU' />
                            </Center>
                        </TabPanel>
                        <TabPanel>
                            <Center>
                                <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGNiykcCjcrcO5NwMvsvGVl983zktIkYV9aw&usqp=CAU' />
                            </Center>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    )
}

export default SearchBar;