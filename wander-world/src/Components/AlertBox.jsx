import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useDisclosure,

  } from '@chakra-ui/react'

  import React from 'react';
 

function AlertDialogExample(props) {
  
  const {error_code , processName, status , closeDialog} = props;

    const { isOpen, onOpen, onClose } = useDisclosure(status)
    const cancelRef = React.useRef()

    

    const Error_display = (error_code)=>{
        switch(error_code)
        {
          case 'auth/email-already-in-use' : {
            return 'Email already exists'
          }
          case 'auth/invalid-email' : {
            return 'Invalid Email'
          }
          case 'auth/weak-password' : {
            return 'Weak Password'
          }
          case 'auth/wrong-password' : {
            return 'Wrong Password'
          }
          case 'auth/user-not-found' : {
            return 'User not registered'
          }
          default : {
            return 'Invalid Credentials'
          }
        }
    }
  
    return (
      <>
        <AlertDialog
          isOpen={status}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold' color='Red'>
                {processName=='Login'?'Login':'Sign Up'} Error!
              </AlertDialogHeader>
  
              <AlertDialogBody>
                {Error_display(error_code)}
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button bg='#0d5ab9' color='white' onClick={closeDialog} ml={3}>
                  Try Again
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
}


export default AlertDialogExample;