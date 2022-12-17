import { Flex, Grid, Heading } from "@chakra-ui/react"
import SearchBar from "./SearchBar"
import HomeCard1 from "./HomeCard1"
import HomeAccordion from "./HomeAccordion"
import DealCard from "./DealCard"
import Featured from "./Featured"



const Home = () =>{

    const data1 = [
        {
            img:'https://forever.travel-assets.com/flex/flexmanager/images/2020/11/12/TVLY_StoreFrontRefresh_BrandPromise_FitForYou_sfimg_562x240_20201111.jpg?impolicy=fcrop&w=900&h=386&q=mediumHigh)',
            text : 'Plan a trip for the whole family—from family travel tips to family-friendly filters, our tools make it easy.'
        },
        {
            img : 'https://forever.travel-assets.com/flex/flexmanager/images/2020/11/12/TVLY_StoreFrontRefresh_BrandPromise_Transparency_sfimg_562x240_20201111.jpg?impolicy=fcrop&w=900&h=386&q=mediumHigh',
            text : 'Looking for a change of scenery, but want something flexible? With free cancellation on most hotels, you can book with peace of mind.'
        },
        {
            img : 'https://forever.travel-assets.com/flex/flexmanager/images/2020/11/12/TVLY_StoreFrontRefresh_BrandPromise_GotYourBack_sfimg_562x240_20201111.jpg?impolicy=fcrop&w=900&h=386&q=mediumHigh',
            text : 'Need more help along your journey? We offer 24/7 support on social and through virtual agents onsite.'
        }
    ]

    const accordionData = [
        {
            title : 'Hotels',
            options : [
                'Chicago Hotels',
                'San Jose Hotels',
                'Balitmore Hotels',
                'Las Vegas Hotels',
                'Maui Hotels',
                'Oakland Hotels',
                'Fort Walton Beach Hotels',
                'Washington DC Hotels',
                'London Hotels',
                'Paris Hotels',
                'Cancun Hotels'
            ]
        },
        {
            title : 'Flights',
            options : [
                'Flights to London',
                'Flights to Maui',
                'Flights to Washington DC',
                'Flights to America',
                'Flights to India',
                'Flights to California',
                'Flights to Sweden',
                'Flights to New York'
            ]
        },
        {
            title : 'Cars',
            options : [
                'London Car Rentals' ,
                'Paris Car Rentals',
                'Maui Car Rentals',
                'Barcelona Car Rentals',
                'Washington DC Car Rentals',
                'Madrid Car Rentals',
                'Iraq Car Rentals',
                'Bangalore Car Rentals'
            ]
        },
        {
            title : 'Travel Deals',
            options : [
                'Vacation Package Deals',
                'Travel Deals',
                'Daily Travel Deals',
                'Hotel Deals',
                'Travelocity Coupon Code',
                'Last Minute Travel Deals',
                'Hotels Under $99',
                'All Inclusive Resort Deals',
                'Flights Under $200',
                'All our Destinations'
            ]
        }
    ]

    const dealsData = [
        {
            image : 'https://forever.travel-assets.com/flex/flexmanager/images/2021/11/08/TVLY_Storefront_AllInclusive_imgB_1199x399_20211104.jpg',
            description :'Think of nothing beyond having a great time with your family',
            heading : 'All Inclusive Resorts'
        },
        {
            image : 'https://forever.travel-assets.com/flex/flexmanager/images/2021/11/08/TVLY_Storefront_LastMinute_imgB_1199x399_20211104.jpg',
            description : 'Celebrate the moment with an unexpected getaway',
            heading : 'Last Minute Getaways'
        }
    ]

    return <div style={{background : '#f0f3f5'}}>
    <SearchBar />
    <Flex direction={['column', 'row']} padding={10} gap={5} margin='80px 0px 10px 0px'>
        {
            data1?.map((el,i)=><HomeCard1 {...el} key={i} />)
        }
    </Flex>
    <Flex direction={['column', 'row']} padding={10} gap={5} margin='10px 0px'>
        {
            dealsData?.map((el,i)=><DealCard {...el} key={i} />)
        }
    </Flex>

    <Featured />

    
    <HomeAccordion data={accordionData}/>
    
    
    </div>
}

export default Home