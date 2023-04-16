import { Flex
} from "@chakra-ui/react"
import PriceRange from './PriceRange'
import { useEffect } from "react"
import { useContext } from "react"
import { useReducer } from 'react'
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import SearchContext from "../Contexts/SearchContext"
import SearchBar from "./SearchBar"
import SearchHotelCard from "./SearchHotelCard"
import axios from 'axios'
import FullPageLoader from "./FullPageLoader"
import SearchPageSearchBar from "./SearchPageSearchBar"
import { useRef } from "react"
import NoDataFound from "./NoDataFound"


const reducer = (state , action)=>{

    switch(action.type)
    {
        case 'place' : {
            return {...state , q : action.payload}
        }
        case 'price' : {
            return {...state, lte : action.payload}
        }
        case 'sort' : {
            return {...state, sort : action.payload}
        }
        case 'hotelName' : {
            return {...state, hotelName : action.payload}
        }
        default : {
            return state;
        }
    }
}

const SearchPage = ()=>{
    const {searchForm } = useContext(SearchContext);
    const [pageParams , setPageParams] = useSearchParams();

    const initState = {
        q : searchForm.place,
        lte : 300,
        sort : '',
        hotelName : ''
    }

    const [ searchParams , dispatch]  = useReducer(reducer , initState);
    const [hotelData ,setHotelData] = useState([]);

    // const apiRef = useRef();

    

    const [loader , setLoader] = useState(true);

    const [inLoader,setInLoader] = useState(true)

    

    function toggleSearchParams(action){
        dispatch(action);
    }

    useEffect(()=>{
        getHotels(searchParams);
    },[searchParams]);
    // console.log(searchParams);
    
    const getHotels = async (searchParams)=>{
        // console.log(searchParams, "Request" )
        try{
            const res = await axios.get(` https://chartreuse-green-bighorn-sheep-wear.cyclic.app/hotel`,{
                params :{
                    cityName : searchParams.q,
                    q : searchParams.hotelName,
                    lte : searchParams.lte,
                    sort : searchParams.sort,
                    order : 'ASC'
                }
            });
            setHotelData(res.data);
            setLoader(false);
            setInLoader(false)
        }
        catch(err){
            console.log(err);
        }
    }


    

    return loader?(<FullPageLoader height="87vh"/>):(
        <>
            <SearchPageSearchBar toggleSubmit={toggleSearchParams} />
                    <Flex w="full" direction='row' gap={2} margin='auto'>
                        <Flex w='30%' minW='30%' direction='column' gap={3} bg='aliceblue' borderRight='1px solid lightblue' p='40px 30px'>
                            <PriceRange toggleSubmit={toggleSearchParams} hotelName={searchParams.hotelName} />
                        </Flex>
                        {
                            inLoader
                            ?
                            <FullPageLoader maxW='70%' minW='70%' w='70%' flex={7}height='72vh'/> 
                            :
                            <Flex w='70%' minW='70%' direction='column' gap={3} p={10}>
                            {
                                hotelData.length?
                                (
                                    
                                        hotelData?.map((el,id)=><SearchHotelCard {...el} key={id} />)
                                ):
                                <NoDataFound h='60vh' />
                            }
                            </Flex>
                        }
                        
                    </Flex>
                    

            
            

        </>
    )
}
export default SearchPage