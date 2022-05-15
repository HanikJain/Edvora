import React, {useState, useRef} from 'react'
import styles from './FilterCard.module.css'
import {useSelector} from 'react-redux';

export default function FilterCard(props) {
    const {places_obj, all_city_names} = useSelector((state) => state);
    const states_name = Object.keys(places_obj);
    const [stateActive, setStateActive] = useState(true);
    const [cityActive, setCityActive] = useState(false);
    const [stateSelected, setStateSelected] = useState({selected: false, value:""});
    const [citySelected, setCitySelected] = useState({selected: false, value:""});

    
    function stateHandler() {
        setStateActive(true);
        setCityActive(false);
    }
    
    function cityHandler() {
        setStateActive(false);
        setCityActive(true);
    }
    function stateSelectHandler(event) {
        setStateSelected({selected:true, value: event.target.innerText});
        setCitySelected({selected:false, value: ""})
    }

    function citySelectHandler(event) {
        setCitySelected({selected:true, value: event.target.innerText})
    }

    function fn(data){
        return (
            <div key={Math.floor(Math.random()*1000000)} onClick={stateSelectHandler}  className={styles.filterCardStateOption}>
                {data}
            </div>
        );
    }

    function cityfn(data){
        return (
            <div key={Math.floor(Math.random()*10000000)} onClick={citySelectHandler}  className={styles.filterCardStateOption}>
                {data}
            </div>
        );
    }

    function clickHandler(){
        props.clickHandler(stateSelected.value, citySelected.value)
        props.hideModal();
    }

  return (
    <div className={styles.filterCard}>
        <div className={styles.filterCardSelect}>
            <div onClick={stateHandler} className={styles.filterCardSelectState}>
                State
                <div>{stateSelected.selected && `(${stateSelected.value})`}</div>
            </div>
            <div onClick={cityHandler} className={styles.filterCardSelectCity}>
                City 
                <div>{citySelected.selected && `(${citySelected.value})`}</div>
            </div>
        </div>
        <div className={styles.filterCardSelectOptions}>
            {stateActive && states_name.map(fn)}
            {(cityActive && !stateSelected.selected ) && all_city_names.map(cityfn)}
            {(cityActive && stateSelected.selected) && places_obj[stateSelected.value].map(cityfn)}
        </div>
        <button className={styles.button} onClick={clickHandler}>Apply</button>
    </div>
  )
}
