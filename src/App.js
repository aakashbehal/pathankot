import React, { useEffect, useState } from 'react'
import moment from 'moment';
import audioUrl from './nuke_alarm.mp3'
import './App.css';
import Locations from './components/locations/locations'

const TimerCounter = 20000

const baseUrl2 = `https://cdn-api.co-vin.in/api/v2/`
const audio = new Audio(audioUrl)
function App() {
  
  const setPlay = () => {
    audio.play()
  }
  const [states, setStates] = useState(null)
  const [districts, setDistricts] = useState(null)
  const [centers, setCenter] = useState(null)
  const [timer, setTimer] = useState(TimerCounter)
  const [sDistrictId, setSDistrictId] = useState(null)
  const [unAuthError, setUnAuthError] = useState(null)

  const getState = () => {
    const URL = `${baseUrl2}admin/location/states`
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setStates(data.states)
      })
  }

  const activate = (type, e) => {
    let div = document.querySelector(`.${type}`).children;
    Array.from(div).map((child) => {
      child.classList.remove('active');
    })
    e.target.classList.add('active')
  }
  
  
  const getDistrict = (e, state_id) => {
    if (e)
      activate('states', e)
    const URL = `${baseUrl2}admin/location/districts/${state_id}`
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data.districts)
      })
  }

  useEffect(() => {
    getState()
  }, [])

  useEffect(() => {
    if(sDistrictId)
      timerToRecall()
  }, [sDistrictId])

  const getPinCode = (districtId, e) => {
    if(e)
      activate('districts', e)
    setSDistrictId(districtId)
    setUnAuthError(null)
    const date = moment().format('DD-MM-YYYY')
    const URL = `${baseUrl2}appointment/sessions/calendarByDistrict?district_id=${districtId}&date=${date}`
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        const centersArray = data.centers.filter((center) => {
          for(let i = 0; i < center.sessions.length; i++) {
            if(
              center.sessions[i].available_capacity > 0 
              && center.sessions[i].min_age_limit === 18
              && center.sessions[i].vaccine === "COVISHIELD"
            ) {
              return true
            }
          }
          return false
        })
        setCenter(centersArray)
      })
      .catch((error) => {
        setUnAuthError(error)
      })
  }

  const timerToRecall = () => {
    console.log(sDistrictId)
    setTimer(TimerCounter)
    setInterval(() => {
      getPinCode(sDistrictId)
    }, TimerCounter)
    setInterval(() => {
      setTimer((timer) => {
        return timer - 1000
      })
    }, 1000)
  }


  return (
    <div className="App">
      <h1>Select States</h1>
      <small>This will auto refresh in 20 sec</small>
      <div className="states">
        {
          states && states.map((state) => {
            return <button key={state.state_id} className="app_btn" onClick={(e) => getDistrict(e, state.state_id)}>{state.state_name}</button>
          })
        }
      </div>
      <h1>Select Districts</h1>
      <div className="districts">
      {
        districts && districts.map((district) => {
          return <button key={district.district_id} className="app_btn" onClick={(e) => getPinCode(district.district_id, e)}>{district.district_name}</button>
        })
      }
      </div>
      <br />
      <h1>Available Slots</h1>
      { unAuthError && <h2 style={{color: 'red'}}>unAuthError</h2> }
      { !unAuthError && <Locations locations={centers} setPlay={setPlay}/>}
    </div>  
  );
}

export default App;
