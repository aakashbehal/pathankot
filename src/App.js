import React, { useEffect, useState } from 'react'
import moment from 'moment';
import './App.css';

import Locations from './components/locations/locations'

const baseUrl2 = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/`

function App() {
  
  const [locations, setLocations] = useState(null)
  
  const getPinCode = (districtId) => {
    const date = moment().format('DD-MM-YYYY')
    const URL = `${baseUrl2}findByDistrict?district_id=${districtId}&date=${date}`
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.sessions)
      })
  }

  useEffect(() => {
    getPinCode(486)
  }, [])

  return (
    <div className="App">
      <Locations locations={locations}/>
    </div>  
  );
}

export default App;
