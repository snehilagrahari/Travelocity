import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Box,
    Text,
    Select,
    Heading,
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react'
import { useReducer } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'




const PriceRange = (props)=>{
    const {toggleSubmit, hotelName} = props;
    const [range , setRange] = useState(300);
    
    const handleRange = (val)=>{
        setRange(val);
        toggleSubmit({type:'price',payload:val});
    }

    const handleSort = (e)=>{
        toggleSubmit({type:'sort',payload:e.target.value});
    }

    const handleHotel = (e)=>{
        toggleSubmit({type:'hotelName',payload:e.target.value});
    }
    return (
        <>
        <Box w='full' margin='20px auto'>
            <Heading as='h6' color='grey' textAlign='left' fontSize='sm'>Search Hotel by Name :</Heading>
                <FormControl>
                    
                    <Input value={hotelName} onChange={handleHotel} variant='flushed' background='white' />
                </FormControl>
        </Box>
        
        <Box w='full' margin='20px auto'>
            <Heading as='h6' color='grey' textAlign='left' fontSize='sm'>Sort by :</Heading>
            <Select placeholder='Sort by' onChange={handleSort}>
                <option value='hotelPrice'>Hotel Price</option>
                <option value='hotelRating'>Hotel Rating</option>
            </Select>
        </Box>
        
        <Box w='full' margin='20px auto'>
            <Heading as='h6' color='grey' textAlign='left' fontSize='sm'>Price Range :</Heading>
            <Slider min={0} defaultValue={300} onChange={handleRange} max={300} step={10}>
                <SliderTrack bg='gray.200'>
                <Box position='relative' right={10} />
                <SliderFilledTrack bg=' #0d5ab9' />
                </SliderTrack>
                <SliderThumb boxSize={5} />
            </Slider>
            <Text fontSize='lg' fontWeight='semibold' textAlign='right' color='#0d5ab9'>$ {range}</Text>
        </Box>

        </>
    )

}

export default PriceRange