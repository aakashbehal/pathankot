import React, { useEffect, useState } from 'react'
import moment from 'moment';
import audioUrl from './nuke_alarm.mp3'
import './App.css';
import Locations from './components/locations/locations'

const TimerCounter = 20000

const baseUrl2 = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/`
const audio = new Audio(audioUrl)
function App() {
  let a, b
  const setPlay = () => {
    audio.play()
  }
  const [centers, setCenter] = useState(null)
  const [timer, setTimer] = useState(TimerCounter)

  const getPinCode = (districtId) => {
    const date = moment().format('DD-MM-YYYY')
    const URL = `${baseUrl2}calendarByDistrict?district_id=${districtId}&date=${date}`
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        const centersArray = data.centers.filter((center) => {
          for(let i = 0; i < center.sessions.length; i++) {
            if(
              center.sessions[i].available_capacity > 0 
              && center.sessions[i].min_age_limit === 18
            ) {
              return true
            }
          }
          return false
        })
        setCenter(centersArray)
        timerToRecall(143)
      })
  }

  const timerToRecall = (districtId) => {
    clearInterval(a)
    clearInterval(b)
    setTimer(TimerCounter)
    a = setInterval(() => {
      getPinCode(districtId)
    }, TimerCounter)
    b = setInterval(() => {
      setTimer((timer) => {
        console.log(timer)
        return timer - 1000
      })
      
    }, 1000)
  }


  return (
    <div className="App">
      {
        <>
          <button className="app_btn" onClick={() => getPinCode(143)}>Rohini</button>
        </>
      }
      <br />
      {/* {Math.floor(timer / 10000)}m  */}
      {((timer % TimerCounter)/1000).toFixed(0)}s
      <Locations locations={centers} setPlay={setPlay}/>
    </div>  
  );
}

export default App;
