import { useContext } from "react";
import SearchContext from "../Contexts/SearchContext";

import {
    FormControl,
    Flex,
    Box,
    Input,
    Select,
    InputGroup,
    InputLeftElement,
    FormLabel,
    Button
} from '@chakra-ui/react'
import { ImLocation } from "react-icons/im";
import findDate from "./TodayDate";
import {BsSearch} from 'react-icons/bs'



const SearchPageSearchBar = (props)=>{


    const {toggleSubmit} = props

    const {searchForm , updateSearchForm} = useContext(SearchContext);

    const {year , month , day} = findDate();
    
    const handleFormChange = (e)=>{
        const action = {
            mode : e.target.name,
            data : e.target.value
        }

        updateSearchForm(action);
    }

    const  handleSubmit = (e)=>{
        e.preventDefault();
        toggleSubmit({type:'place' , payload : searchForm.place});
    }

    return (
        <Box w='full' bg='#f0f3f5' borderBottom="1px solid lightgray">
            <form onSubmit={handleSubmit}>
                                <FormControl p='10px 20px'>
                                <Flex gap={5}>
                                    <Box flex={3}>
                                        <FormLabel fontSize='md'>Place</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                            pointerEvents='none'
                                            children={<ImLocation size="18px" color='grey' />}
                                            />
                                            <Input 
                                            type='tel' 
                                            name='place'
                                            placeholder='Going to...' 
                                            value={searchForm.place} 
                                            onChange={handleFormChange}
                                            required
                                            bg='white' />
                                        </InputGroup>
                                    </Box>
                                    <Box flex={1}>  
                                        <FormLabel fontSize='md'>Check-in</FormLabel>
                                        <Input 
                                        name='check-in'
                                        type='date' 
                                        value={searchForm['check-in']}
                                        onChange={handleFormChange}
                                        min={`${year}-${month}-${day}`}
                                        color='grey'
                                        required
                                        bg='white'/>
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
                                        required
                                        bg='white'/>
                                    </Box>
                                    <Box flex={1}>  
                                        <FormLabel fontSize='md'>Travelers</FormLabel>
                                            <Select 
                                            bg='white'
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
                                    <Flex direction='column-reverse'>
                                    <Button  fontSize='18px' color="white" borderRadius='full' variant='solid' colorScheme='blue' type="submit"><BsSearch /></Button>
                                    </Flex>
                                </Flex>
                                </FormControl>
                                
            </form>
        </Box>
    )
}

export default SearchPageSearchBar