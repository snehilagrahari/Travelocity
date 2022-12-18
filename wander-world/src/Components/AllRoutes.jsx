import {Routes , Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import PrivateRoute from './PrivateRoute'
import Signup from './Signup'
import NoAccess from './NoAccess'
import SearchPage from './SearchPage'
import HotelPage from './HotelPage'
import TripPage from './TripPage'

const AllRoutes = ()=>{


    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/signin" element={<NoAccess><Login /></NoAccess>}/>
                <Route path="/signup" element={<NoAccess><Signup /></NoAccess>}/>
                <Route path="/Hotel-Search" element={<SearchPage />}/>
                <Route path='/Hotels/:hotelId' element={<PrivateRoute><HotelPage /></PrivateRoute>} />
                <Route path='/trips' element={<PrivateRoute><TripPage /></PrivateRoute>} />
            </Routes>
        </>
    )
}

export default AllRoutes