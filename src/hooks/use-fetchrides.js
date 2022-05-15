import React, {useState, useEffect} from 'react'
import axios from 'axios';

export default function useFetchDetails(){
    const [userData, setUserData] = useState({});
    const [ridesData, setRidesData] = useState([]); 

    function fetchData(){
        const ridesDetails = axios.get("https://assessment.api.vweb.app/rides");
        const userDetails = axios.get("https://assessment.api.vweb.app/user");
        axios.all([ridesDetails, userDetails]).then(
            axios.spread((...allData) => {
                const ridesData = allData[0]
                const userData = allData[1];
                setRidesData(ridesData.data)
                setUserData(userData.data);
            })
        )
    }
    useEffect(() => {
        fetchData();
    }, []);

    return {userData, ridesData}
}