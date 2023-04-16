import './App.css';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Home from './Components/Home'
import AllRoutes from './Components/AllRoutes';
import SnackBar from './Components/SnackBar';
import DateInput from './Components/DateInput';
import { useEffect } from 'react';
import axios from 'axios';

function App() {

  return (
    <div className="App">
      <SnackBar />
      <Navbar />
      {/* <DateInput /> */}
      <AllRoutes />
    </div>
  );
}

export default App;
