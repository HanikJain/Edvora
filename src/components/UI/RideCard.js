import React from 'react'
import styles from './RideCard.module.css'

export default function RideCard(props) {
  return (
    <div className={styles.cardContainer}>
        <div className={styles.cardContainerMap} >
            <div className={styles.cardContainerMapImage} style={{backgroundImage: `url(${props.url})`}}>

            </div>
        </div>
        <div className={styles.cardContainerData} >
            <div className={styles.cardContainerRideData}>
                <span>Ride id : {props.id}</span>
                <span>Origin Station : {props.originStation}</span>
                <span>station_path : [{props.station_path}]</span>
                <span>Date : {props.date}</span>
                <span>distance : {props.distance}</span>
            </div>
        </div>
        <div className={styles.cardContainerState} >
            <span>{props.state}</span>
            <span>{props.city}</span>
        </div>
    </div>
  )
}
