import {useDispatch} from 'react-redux';
import React, {useEffect} from 'react'
import Navbar from "./components/Layout/Navbar"
import Rides from "./components/Rides/Rides";
import "./App.css";
import  useCalDetails from './hooks/use-fetchDetails'
import {apiDataActions} from "./store/index"

function App() {
  const data = useCalDetails();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiDataActions.setData(data));
  }, [data])

  return (
    <div className="App">
      <Navbar />
      <Rides />
    </div>
  );
}

export default App;
