import {
    useState,
    useEffect
} from 'react'
import {Box, Divider, Heading, Text, useToast} from '@chakra-ui/react'
import axios from 'axios'
import { useContext } from 'react';
import AuthContext from '../Contexts/AuthContext';
import NoDataFound from './NoDataFound'
import FullPageLoader from './FullPageLoader';
import TripCard from './TripCard';

const TripPage = () => {

    const [TripData , setTripData] = useState([]);
    const [loading , setLoading ] = useState(true);

    const {token} = useContext(AuthContext);

    useEffect(()=>{
        getTrips();
    },[])

    const toast = useToast();

    const getTrips = ()=>{
        axios.get('https://chartreuse-green-bighorn-sheep-wear.cyclic.app/user/bookingHistory',{
            headers : {
                Authorization : token
            }
        })
        .then((res)=>{
            // console.log(res.data);
            setTripData(res.data.data);
            setLoading(false);
            toast({
                title : 'Welcome to Booking History',
                duration : 1000,
                status : 'success'
            });
        })
        .catch((err)=>{
            console.log(err);
            toast({
                title : err.message,
                status: 'error',
                'duration' : 1400
            });
        })
    }

    // console.log(TripData);

    return loading?
        <FullPageLoader height='87vh' /> :
        (TripData.length>0 ?
            <Box w="90%" margin="auto">
                <Heading mt={10} textAlign="left" color="#0a438b" size="2xl">Your Trips</Heading>
                {
                    TripData.reverse().map((el)=><TripCard data = {{...el}} get={getTrips} />)
                }
            </Box>
        : <NoDataFound h='84vh'/>)

}


export default TripPage;