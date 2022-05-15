import React, {useState} from 'react'
import {useSelector} from 'react-redux';
import styles from './Rides.module.css';
import Modal from '../UI/Modal'
import FilterCard from '../UI/FilterCard'
import RideCard from '../UI/RideCard'
import {ReactComponent as FilterIcon} from '../../assets/filter.svg'


export default function Rides() {
  const [filterActive, setFilterActive ] = useState(false);
  const [nearestRidesActive, setNearestRidesActive ] = useState(true);
  const [upcomingRidesActive, setUpcomingRidesActive ] = useState(false);
  const [pastRidesActive, setPastRidesActive ] = useState(false);
  const {ridesData, pastRidesData_arr,  upcomingRidesData_arr} = useSelector((state) => state);
  const [filterApplied, setFilterApplied] = useState({isApplied: false, value:[]});


  function nearestrideHandler(){
    setNearestRidesActive(true);
    setUpcomingRidesActive(false);
    setPastRidesActive(false);
  }
  function upcomingrideHandler(){
    setNearestRidesActive(false);
    setUpcomingRidesActive(true);
    setPastRidesActive(false);
  }
  function pastrideHandler(){
    setNearestRidesActive(false);
    setUpcomingRidesActive(false);
    setPastRidesActive(true);
  }



  function filterActiveHandler(){
    setFilterActive(true);
  }

  function filterActiveDisabledHandler(){
    setFilterActive(false);
  }

  function filterDataHandler(state, city){
    let results = []
    if(state === "" && city === ""){
      return
    } else {
      ridesData.map((data) => {
        if(data.city === city && data.state === state){
          results.push(data);
        }else if(state === "" && data.city === city){
          results.push(data);
        } else if(data.state === state && city === ""){
          results.push(data);
        }

      });
      setFilterApplied({isApplied: true, value:results})
    }
  }

  function ridesDatafn(data){
    return(
    <RideCard
    key={data.id + Math.floor(Math.random()*1000000)}
    url = {data.map_url}
    id={data.id}
    originStation = {data.origin_station_code}
    station_path = {data.station_path.toString()}
    date={data.date}
    distance = {data.distance}
    state = {data.state}
    city = {data.city}
    />);
  }


  return (
    <div className={styles.ridesContainer}>
        <div className={styles.ridesContainerNavBar}>

           <div className={styles.ridesContainerRides}>
                <span onClick={nearestrideHandler} style={{borderBottom: nearestRidesActive &&  "2px solid #fff"}}>Nearest Rides ({ridesData.length})</span>
                <span onClick={upcomingrideHandler} style={{borderBottom: upcomingRidesActive &&  "2px solid #fff"}}>Upcoming Rides ({upcomingRidesData_arr.length})</span>
                <span onClick={pastrideHandler} style={{borderBottom: pastRidesActive && "2px solid #fff"}}>Past rides ({pastRidesData_arr.length})</span>
            </div>

            <div className={styles.ridesContainerFilter}>
                
                <span onClick={filterActiveHandler}>
                  <FilterIcon/>
                  <span>Filters</span>
                </span>
                {filterActive && <Modal onClick={filterActiveDisabledHandler}>
                                 <FilterCard 
                                 hideModal={filterActiveDisabledHandler}
                                 clickHandler={filterDataHandler}
                                /> 
                                 </Modal>}
            </div>    
        </div>

        <div className={styles.ridesContainerData} >
            {(!filterApplied.isApplied && nearestRidesActive) && (ridesData.length > 0   ? ridesData.map(ridesDatafn)  : <p> No rides Found!</p>) }
            {(upcomingRidesActive) && (upcomingRidesData_arr.length > 0 ? upcomingRidesData_arr.map(ridesDatafn)  : <p> No rides Found!</p>) }
            {(pastRidesActive) && (pastRidesData_arr.length > 0   ? pastRidesData_arr.map(ridesDatafn)  : <p> No rides Found!</p>) }
            {(filterApplied.isApplied && nearestRidesActive) && (filterApplied.value.length > 0   ? filterApplied.value.map(ridesDatafn)  : <p> No rides Found!</p>) }

        </div>
    </div>
  )
}
