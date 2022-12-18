import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    VStack,
    HStack,
    transition
} from '@chakra-ui/react'
import { useEffect } from 'react';
import { useState } from 'react'

export const displaySnackBar = (head , text)=>{
    let snackBar = document.getElementById('snackBar');
    document.getElementById('snackTitle').innerText = head;
    document.getElementById('snackDesc').innerText = text;
    snackBar.style.display= 'block';

    setTimeout(() => {
        snackBar.style.display = 'none';
    }, 2000);
}


const SnackBar = ()=>{
    const styles = {
        color : 'white',
        zIndex: '20',
        position : 'fixed',
        backgroundColor : '#49fa65',
        color : 'green',
        borderRadius : '20px',
        width : '50%',
        top:'100px',
        left:'25%',
        justifyContent : 'center',
        display : 'none',
    }


    return (
        <Alert status='success' style={styles} id='snackBar'>
            <VStack>
                <HStack>
                    <AlertIcon />
                    <AlertTitle id='snackTitle'>Trip Confirmed!</AlertTitle>
                </HStack>
            <AlertDescription id='snackDesc'>Happy Travel with Travelocity.</AlertDescription>
            </VStack>
        </Alert>
    )
}


export default SnackBar;