import {
    Flex, Heading, HStack, Menu, MenuButton,MenuList,MenuItem,Button, Spacer, Text, Divider
} from '@chakra-ui/react'
import {ChevronDownIcon} from '@chakra-ui/icons'
import {FaHotel,FaCar,FaMoneyBill} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {GiCommercialAirplane} from 'react-icons/gi'
import {RiShipFill} from 'react-icons/ri'
import {ImUser} from 'react-icons/im'
import { useContext } from 'react'
import AuthContext from '../Contexts/AuthContext'
import { useNavigate } from 'react-router-dom'



const Navbar = ()=>{

    const {isAuth ,toggleAuth,authName , toggleAuthName , authId, toggleAuthId} = useContext(AuthContext);

    const MenuListArray = [
        {
            text : 'Packages',
            icon : <BsBriefcaseFill size='20px' />
        },
        {
            text : 'Stays',
            icon : <FaHotel size='20px' />
        },
        {
            text : 'Cars',
            icon : <FaCar size='20px' />
        },
        {
            text : 'Flights',
            icon : <GiCommercialAirplane size='20px' />
        },
        {
            text : 'Cruises',
            icon : <RiShipFill size='20px'/>
        },
        {
            text : 'Things to do',
            icon : <FaMoneyBill size='20px'/>
        },
        {
            text : 'Trips for me'
        },
        {
            text : 'Discover'
        },
        {
            text : 'Travel Deals'
        },
        {
            text : 'Get Inspired'
        },
        {
            text : 'Groupings & Meetings'
        }
    ]

    const navigate = useNavigate();

    return (
        <Flex w="full" h="80px" bg="#0a438b" p="5px 30px" color='white' >
            <HStack spacing={10}>
                <Heading as='h5' size='md'>Travelocity</Heading>
                <Menu>
                    <MenuButton as={Button} bg="none" variant='ghost' color='white' fontSize='16px' rightIcon={<ChevronDownIcon />} _hover={{ bg : 'none'}}>
                        More Travel
                    </MenuButton>
                    <MenuList w='350px' color='black'>
                        {
                            MenuListArray.map((el,i)=><MenuItem p={'12px 20px'} key={i} _hover={{color:'#0d5ab9'}}>{el.icon?el.icon:null} &nbsp; {el.text}</MenuItem>)
                        }
                    </MenuList>
                </Menu>
            </HStack>
            <Spacer />
            <HStack spacing={25}>
                <Text fontSize='16px'>List your Property</Text>
                <Text fontSize='16px'>Support </Text>
                <Text fontSize='16px'>Trips</Text>
                <Menu>
                    <MenuButton as={Button} variant='ghost' fontSize={'16px'} leftIcon={<ImUser/>}>
                        {isAuth?authName: 'Sign in'}
                    </MenuButton>
                    <MenuList maxW='350px' color={"black"}>
                        {
                            isAuth?(
                                <>
                                <MenuItem fontSize='14px'>Account Setup</MenuItem>
                                <MenuItem fontSize='14px'>List of Favorites</MenuItem>
                                <MenuItem fontSize='14px'>Feedback</MenuItem>
                                <MenuItem _hover={{bg:'none'}}><Divider /></MenuItem>
                                <MenuItem fontSize='14px' onClick={()=>{
                                    toggleAuth(false);
                                    toggleAuthName(null);
                                    toggleAuthId(null);
                                }}>Logout</MenuItem>
                                </>
                            ):(
                                <>
                                <MenuItem _hover={{bg : 'none'}}><Heading textAlign='center' as='h4' size='md'>Members can access discounts and special features</Heading></MenuItem>
                                <MenuItem textAlign={'center'} _hover={{bg:'none'}}><Button variant='solid' color="white" _hover={{color:'black'}} bg={'#0d5ab9'} margin={'7px auto'} onClick={()=>{
                                    navigate('/signin');
                                }}>Sign in</Button></MenuItem>
                                <MenuItem textAlign={'center'} _hover={{bg:'none'}}><Button variant="ghost" bg={'white'} color="#0d5ab9" margin={'3px auto'} onClick={()=>{
                                    navigate('/signup');
                                }}>Create a free account</Button></MenuItem>
                                <MenuItem fontSize='14px'>List of Favorites</MenuItem>
                                <MenuItem _hover={{bg:'none'}}><Divider /></MenuItem>
                                <MenuItem fontSize='14px'>Feedback</MenuItem>
                                </>
                            )
                        }
                    </MenuList>
                </Menu>
            </HStack>
                
            
        </Flex>
    )
}
export default Navbar;