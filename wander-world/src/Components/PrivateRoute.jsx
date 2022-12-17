import { useContext } from "react"
import AuthContext from '../Contexts/AuthContext'
import {useNavigate} from 'react-router-dom'
import {useDisclosure} from '@chakra-ui/react'
import { 
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogContent,
    Button

 } from "@chakra-ui/react"
import { useRef } from "react"

const PrivateRoute = ({children})=>{

    const {isAuth} = useContext(AuthContext)

    const {isOpen , onOpen , onClose} = useDisclosure(true)

    const cancelRef = useRef();

    const navigate = useNavigate()

    const handleNavigate = ()=>{
        navigate('/signin');

    }

    return (
        isAuth ? 
        (
          <>
            {children}
          </>  
        ) : (
            <>
                <AlertDialog
                    motionPreset='slideInBottom'
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                    <AlertDialogHeader>Authentication Error</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Looks Like You haven't signed in! Sign in first to access this page.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button bg='#0d5ab9' color='white' ml={3} onClick={handleNavigate}>
                        Sign in
                        </Button>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </>                 
                        
        )
    )

}

export default PrivateRoute