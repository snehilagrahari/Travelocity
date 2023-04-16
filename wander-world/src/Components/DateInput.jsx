import { Box } from '@chakra-ui/react';
import React, { useState , useEffect } from 'react';
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.module.css'
import "react-datepicker/dist/react-datepicker.css"

function DateInput() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  console.log(selectedDate);

  const [date, setDate] = useState(null);

  useEffect(()=>{
    let current = new Date();
    setDate(current);
  },[selectedDate])

  return (
    <Box w="fit-content">
      <br />
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        showMonthDropdown
        showYearDropdown
        placeholderText='Select Date'
        minDate={date}
        dropdownMode="select"
      />
    </Box>
  );
}

export default DateInput;
