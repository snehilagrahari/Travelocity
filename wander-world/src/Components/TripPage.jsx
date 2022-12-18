import {
    useState,
    useEffect
} from 'react'
import {Text} from '@chakra-ui/react'
import axios from 'axios'
import { useContext } from 'react';
import AuthContext from '../Contexts/AuthContext';
import NoDataFound from './NoDataFound'
import FullPageLoader from './FullPageLoader';
import TripCard from './TripCard';

const TripPage = () => {

    const [TripData , setTripData] = useState([]);
    const [loading , setLoading ] = useState(true);

    const {authId} = useContext(AuthContext);

    useEffect(()=>{
        getTrips();
    },[])

    const getTrips = ()=>{
        axios.get(`http://localhost:8000/trips`,{
            params : {
                profileId : authId
            }
        })
        .then((res)=>{
            setTripData(res.data);
            setLoading(false);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return loading?
        <FullPageLoader height='87vh' /> :
        (TripData.length ?
            TripData.map((el)=><TripCard {...el} />)
        : <NoDataFound h='84vh'/>)

}


export default TripPage;