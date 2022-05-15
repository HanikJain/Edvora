import React, {useEffect, useState} from 'react'

import useFetchDetails from "./use-fetchrides";

export default function useCalDetails() {
    const {userData, ridesData} = useFetchDetails();
    let places_obj= {};
    let pastRidesData_arr= [];
    let upcomingRidesData_arr= [];
    let all_city_names = [];

    function compare( a, b ) {
        if ( a.distance < b.distance ){
          return -1;
        }
        if ( a.distance > b.distance ){
          return 1;
        }
        return 0;
    }

    function formatAMPM(d) {
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let date = d.getDate();
        hours = hours % 12;
        hours = hours ? hours : 12; 
        minutes = minutes < 10 ? '0'+minutes : minutes;
        return {hour:parseInt(hours), minutes: parseInt(minutes), ampm, year, month, date};
    }

    function isPastRide(curr, data) {
        if(curr.year > data.year)
            return true;
        if(curr.month > data.month && curr.year >= data.year) 
            return true;   
        if(curr.date > data.date && curr.month >= data.month && curr.year >= data.year)   
            return true;
        if((curr.ampm === "PM" && data.ampm === "AM" ) && curr.date >= data.date && curr.month >= data.month && curr.year >= data.year)  
            return true;
        if(((curr.ampm === data.ampm) && curr.date >= data.date && curr.month >= data.month && curr.year >= data.year) ){
            if(curr.hour > data.hour)
                return true;
            else if(curr.minute > data.minute && curr.hour >= data.hour)
                return true;
            else 
                return false;    
        } 
        
        return false; 
    }


    if(userData && ridesData){
        for (let data of ridesData) {

            // calculating distance
            let st_path = data.station_path;
            let st_code = userData.station_code;
            let min_distance = 100000;
            for (let p of st_path){
                let x= parseInt(p) - parseInt(st_code);
                if(x < 0){
                    x = x*-1;
                }
                if(x < min_distance){
                    data.distance = x;
                    min_distance = x;
                }else{
                    break;
                }    
            }

            // console.log(ridesData, st_code);
            // console.log(st_code,st_path,data.distance)

            //formating station_path
            // data.station_path = st_path.toString();

            // mapping cities with state
            if(places_obj[data.state]){
                let checker = false;
                for(let p of places_obj[data.state]) {
                    if(p === data.city){
                        checker = true;
                        break;
                    }
                } 
                if(!checker){
                    places_obj[data.state].push(data.city);
                    all_city_names.push(data.city);
                }
            }else{
                places_obj[data.state] = [data.city];
                all_city_names.push(data.city);
            }

            // data divided by time
            let time_period = formatAMPM(new Date()); 
            let z = data.date.split(" ");
            
            let data_t = z[1].split(":");
            let data_d = z[0].split("/");

            let dataDate = {};
            dataDate.ampm = z[2];
            dataDate.hour = parseInt(data_t[0]);
            dataDate.minute = parseInt(data_t[1]);
            dataDate.date = parseInt(data_d[1]);
            dataDate.month = parseInt(data_d[0]);
            dataDate.year = parseInt(data_d[2]);

            if(isPastRide(time_period, dataDate)){
                pastRidesData_arr.push(data);
            }else{
                upcomingRidesData_arr.push(data);
            }
            // new_array.push(data);
        }

        
        // Data sorted by distance
        ridesData.sort(compare);
  
    }

    return {userData, ridesData, places_obj, pastRidesData_arr, upcomingRidesData_arr, all_city_names }
}
