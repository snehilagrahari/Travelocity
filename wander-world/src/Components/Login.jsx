import {
    Container,
    Heading,
    VStack,
    Input,
    FormControl,
    FormHelperText,
    FormLabel,
    Checkbox,
    Flex,
    Text,
    Button,
    Link,
    useToast

} from '@chakra-ui/react'
import { useState } from "react"
import { useReducer } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";
// import authApp from "./firebase.config"; 
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AlertDialogExample from "./AlertBox";
import { useNavigate } from 'react-router-dom';
import {displaySnackBar} from './SnackBar'
import axios from 'axios';




const initForm = {
    email : '',
    password : ''
}

const reducer = (state , action)=>{
    switch(action.type)
    {
        case 'email' : {
            return {...state , email : action.payload}
        }
        case 'password' : {
            return {...state, password : action.payload}
        }
        case 'reset' : {
            return initForm
        }
        default: {
            return state
        }
    }
}

const Login = ()=>{

    const [ validate , setValidate] = useState(true);

    const [formData , setFormData] = useReducer(reducer , initForm)

    const navigate = useNavigate();
    const toast = useToast();

    const {loading, toggleLoading, error , toggleError , toggleAuth, toggleToken , toggleAuthName} = useContext(AuthContext);
    const [errorCode , setErrorCode] = useState(null); 

    useEffect(()=>{
        ValidateForm();
    })

    const ValidateForm = ()=>{
        if(formData.password.length>=6 && formData.email.includes('@'))
            setValidate(false);
        else
            setValidate(true);
    }


    const handlePassword = (e)=>{
        setFormData({type:'password' , payload : e.target.value})
    }

    const handleEmail = (e)=>{
        setFormData({type:'email' , payload : e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            toggleLoading(true);
            const creds = {
                ...formData
            };
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`,creds);
            const data = res.data;
            toast({
                title : "Login Successful!",
                description : `Welcome ${data.username}! Plan your journey with us!`,
                status : 'success',
                isClosable : true,
                duration : 2000
            });
            console.log(data);
            toggleLoading(false);
            toggleToken(data.token);
            localStorage.setItem('travelocity-token',JSON.stringify(data.token));
            toggleAuthName(data.username);
            toggleAuth(true);
            navigate('/');
        }
        catch(err){
            toast({
                title : 'Login error!',
                status : 'error',
                isClosable : true,
                duration : 2000,
                description : err.response.data.message
            });
            console.log(err);
            toggleLoading(false);
        }
    }

    const closeDialog = ()=>{
        toggleError(false);
        setErrorCode(null);
    }
    
    return (
        <>
        <AlertDialogExample status={error} error_code={errorCode} processName='Login' closeDialog={closeDialog}  />
        <Container w='md' textAlign="left" padding={7}>
            <Heading size='lg'>Sign In</Heading>
            <form onSubmit={handleSubmit}>
                <VStack margin="20px 0px" spacing={4}>
                    <FormControl>
                        <FormLabel>Email address</FormLabel>
                        <Input type='email' value={formData.email} onChange={handleEmail} w='full' placeholder='Email Address' required/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' value={formData.password} placeholder="Password" onChange={handlePassword} w='full' required minLength={6}/>
                    </FormControl>
                    <Flex justifyContent={'flex-start'} w='full' p="10px 0px" gap={2}><Checkbox isDisabled={validate} defaultChecked /> Keep me Signed in</Flex>

                    <Text color='grey' fontSize='12px'>Selecting this checkbox will keep you signed into your account on this device until you sign out. Do not select this on shared devices.</Text>
                    <Text color='grey' fontSize='14px'>By signing in, I agree to the Travelocity Terms and Conditions and Privacy Statement.</Text>

                    <Button type="submit" 
                    isLoading= {loading}
                    loadingText='Signing in'
                    spinnerPlacement='start'
                    color ="white" 
                    bg='#0d5ab9' 
                    w='full' 
                    isDisabled={validate}
                    _hover={{bg:'#0d5ab9'}}
                    >Sign in</Button>
                    
                </VStack>    
            </form>
            <Text textAlign='center'>Don't have an account? <Link href="/signup" color='blue'> Create a new one</Link></Text>
            
        </Container>
        </>
    )
}


export default Login