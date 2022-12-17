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
    FormHelperText

} from '@chakra-ui/react'
import { useReducer , useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import AuthContext from "../Contexts/AuthContext"
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import authApp from "./firebase.config"
import AlertDialogExample from "./AlertBox"



const auth = getAuth(authApp);


const initForm = {
    firstName : '',
    lastName : '',
    email : '',
    password : ''
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
        case 'firstName' : {
            return {...state , firstName : action.payload }
        }
        case 'lastName' : {
            return {...state , lastName : action.payload }
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

    const handleSubmit = (e)=>{
        e.preventDefault();
        toggleLoading(true);
        createUserWithEmailAndPassword(auth, formData.email ,formData.password )
            .then((userCredential) => {

                const user = userCredential.user;
                toggleLoading(false);
                setFormData({type : 'reset'});
                updateProfile(auth.currentUser,{displayName:`${formData.firstName} ${formData.lastName}`});
                console.log(user);
                alert('Signup Successful!');
                
            })
            .catch((error) => {
                toggleLoading(false);
                const errorCode = error.code;
                const errorMessage = error.message;
                setError_code(errorCode);
                toggleError(true);
            });
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
                        <FormLabel>Email address</FormLabel>
                        <Input name='email' type='email' value={formData.email} onChange={handleChange} w='full' placeholder='Email Address' required/>
                        <FormHelperText>We'll never share your email</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input name='firstName' type='text' value={formData.firstName} placeholder="First Name" onChange={handleChange} w='full' required />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Input type='text' name='lastName' value={formData.lastName} placeholder="Last Name" onChange={handleChange} w='full' required/>
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