import {
    Container,
    Heading,
    VStack,
    Input,
    FormControl,
    FormLabel,
    Checkbox,
    Flex,
    Text,
    Button,
    Link,
    FormHelperText,
    Select,
    useToast

} from '@chakra-ui/react'
import axios from 'axios'
import { useReducer , useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import AuthContext from "../Contexts/AuthContext"
// import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
// import authApp from "./firebase.config"
import AlertDialogExample from "./AlertBox"
import { displaySnackBar } from './SnackBar'
import { useNavigate } from 'react-router-dom'



// const auth = getAuth(authApp);


const initForm = {
    name : '',
    email : '',
    password : '',
    age : '',
    gender : "",
    mobile : "",
    address : ""
}

const reducer = (state, action)=>{
    switch(action.type)
    {
        case 'email' : {
            return {...state , email : action.payload }
        }
        case 'password' : {
            return {...state , password : action.payload }
        }
        case 'name' : {
            return {...state , name : action.payload }
        }
        case 'age' : {
            return {...state , age : action.payload }
        }
        case 'mobile' : {
            return {...state , mobile : action.payload }
        }
        case 'gender' : {
            return {...state , gender : action.payload }
        }
        case 'address' : {
            return {...state , address : action.payload }
        }
        case 'reset' : {
            return initForm
        }
        default : {
            return state
        }
    }
}

const Signup = ()=>{



    const [formData,setFormData] = useReducer(reducer , initForm);

    const {loading , toggleLoading, error , toggleError} = useContext(AuthContext);

    const [validate , setValidate] = useState(true);
    const [error_code , setError_code] = useState('');
    const navigate = useNavigate();
    const toast = useToast();
    

    useEffect(()=>{
        validateForm();
    })

    const validateForm = ()=>{
        if(formData.email.includes('@') && formData.password.length>=6 && formData.firsName!='' && formData.lastName!='')
            setValidate(false);
        else    
            setValidate(true);
    }

    const handleChange = (e)=>{

        const action = {
            type : e.target.name ,
            payload : e.target.value
        }

        setFormData(action)
    }



    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            toggleLoading(true);
            const creds = {
                ...formData
            }
            const res = await axios.post('https://chartreuse-green-bighorn-sheep-wear.cyclic.app/user/register',creds);
            toggleLoading(false);
            toast({
                title : "Account Successfully Created!",
                isClosable : true,
                duration : 2000,
                status : 'success'
            })
            setFormData({type : 'reset'});
        }
        catch(err){
            toggleLoading(false)
            toast({
                title : 'Account Creation Failed!',
                isClosable : true,
                duration : 2000,
                status : 'error',
                description : err.message
            });
            // console.log(err);
        }
    }

    const closeDialog =()=> {
        toggleError(false)
        setError_code(null);
    };
    
    return (
        <>
        <AlertDialogExample error_code={error_code} processName='Sign Up' status={error} closeDialog = {closeDialog} />
        <Container w='md' textAlign="left" padding={7}>
            <Heading size='lg'>Create a New Account</Heading>
            <form onSubmit={handleSubmit}>
                <VStack margin="20px 0px" spacing={4}>
                    <FormControl>
                        <FormLabel>Full Name</FormLabel>
                        <Input name='name' type='text' value={formData.name} placeholder="Full Name" onChange={handleChange} w='full' required />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email address</FormLabel>
                        <Input name='email' type='email' value={formData.email} onChange={handleChange} w='full' placeholder='Email Address' required/>
                        <FormHelperText fontSize="12px">We'll never share your email</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <Select placeholder="Gender" name="gender" value={formData.gender} onChange={handleChange} w="full" >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Age</FormLabel>
                        <Input type='number' name='age' value={formData.age} placeholder="Age" onChange={handleChange} w='full' required/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Mobile</FormLabel>
                        <Input type='number' name='mobile' value={formData.mobile} placeholder="Mobile" onChange={handleChange} w='full' required/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Input type='text' name='address' value={formData.address} placeholder="Address" onChange={handleChange} w='full' required/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' name='password' value={formData.password} placeholder="Password" onChange={handleChange} w='full' required minLength={6}/>
                        <FormHelperText>MinLength : 6 letters</FormHelperText>
                    </FormControl>
                    <Flex justifyContent={'flex-start'} w='full' p="10px 0px" gap={2}><Checkbox isDisabled={validate} defaultChecked /> Keep me Signed in</Flex>

                    <Text color='grey' fontSize='12px'>Selecting this checkbox will keep you signed into your account on this device until you sign out. Do not select this on shared devices.</Text>
                    <Text color='grey' fontSize='14px'>By signing in, I agree to the Travelocity Terms and Conditions and Privacy Statement.</Text>

                    <Button type="submit" 
                    isLoading= {loading}
                    loadingText='Signing up'
                    spinnerPlacement='start'
                    color ="white" 
                    bg='#0d5ab9' 
                    w='full' 
                    isDisabled={validate}
                    _hover={{bg:'#0d5ab9'}}
                    >Sign Up</Button>
                    
                </VStack>    
            </form>
            <Text textAlign='center'>Already have an account? <Link href="/signin" color='blue'> Sign in</Link></Text>
            
        </Container>
        </>
    )
}


export default Signup