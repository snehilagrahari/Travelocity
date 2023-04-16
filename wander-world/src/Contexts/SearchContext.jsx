import { useReducer } from "react";
import { createContext } from "react";
import findDate from "../Components/TodayDate";


const SearchContext = createContext();


const {year, month, day} = findDate();
const initialState = {
    place : '',
    "check-in" : `${year}-${month<=9?'0'+month:month}-${day<=9?'0'+day:day}`,
    "check-out" : `${year}-${month<=9?'0'+month:month}-${day<=9?'0'+day:day}`,
    travelers : ''
}

const searchReducer = (state , action)=>{
    switch(action.mode)
    {
        case 'place' : {
            return {...state, place : action.data};
        }
        case 'check-in' : {
            return {...state , 'check-in' : action.data};
        }
        case 'check-out' : {
            return {...state , 'check-out' : action.data};
        }
        case 'travelers' : {
            return {...state , 'travelers' : action.data};
        }
        default : {
            return state;
        }
    }
}

export const SearchContextProvider = ({children})=>{

    const [searchForm , dispatcher] = useReducer( searchReducer , initialState)

    const updateSearchForm = (action)=>{
        dispatcher(action);
    }

    const value = {
        searchForm , 
        updateSearchForm
    }

    return (
        <SearchContext.Provider value = {value}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext