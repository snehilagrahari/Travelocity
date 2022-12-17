import { Flex } from "@chakra-ui/react"
import { useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import SearchContext from "../Contexts/SearchContext"
import SearchBar from "./SearchBar"
import SearchHotelCard from "./SearchHotelCard"
import axios from 'axios'


const SearchPage = ()=>{

    const {searchForm } = useContext(SearchContext);

    const [hotelData ,setHotelData] = useState([]);

    const [searchParams , setSearchParams] = useSearchParams()
    
    useEffect(()=>{
        SearchSet();

    },[])

    const SearchSet = ()=>{
        setSearchParams({query : searchForm.place});
    }

    const getHotels = ()=>{
        axios.get(` http://localhost:8000/hotels`)
    }

    return (
        <>
            <SearchBar />
            <Flex w="full" direction='row' gap={2} margin='auto'>
                <Flex flex={3} direction='column' gap={3} bg='aliceblue'>

                </Flex>
                <Flex flex={8} direction='column' gap={3} p={10}>
                    {
                        
                    }
                </Flex>
            </Flex>

        </>
    )

}

export default SearchPage