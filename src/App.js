import React, { useState } from 'react'
import moment from 'moment';
import audioUrl from './nuke_alarm.mp3'
import './App.css';
import Locations from './components/locations/locations'


const baseUrl2 = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/`
const audio = new Audio(audioUrl)
audio.loop=true;
function App() {

  const setPlay = () => {
      audio.play()
  }
  const [selected, setSelected2] = useState('')
  const [centers, setCenter] = useState(null)
  const [timer, setTimer] = useState(20000)

  const getPinCode = (districtId) => {
    const date = moment().format('DD-MM-YYYY')
    const URL = `${baseUrl2}calendarByDistrict?district_id=${districtId}&date=${date}`
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        const centersArray = data.centers.filter((center) => {
          return true
        })
        setCenter(centersArray)
        timerToRecall(districtId)
      })
  }

  const timerToRecall = (districtId) => {
    let a, b
    clearInterval(a)
    clearInterval(b)
    a = setInterval(() => {
      getPinCode(districtId)
      setTimer(20000)
    }, 20000)
    b = setInterval(() => {
      setTimer((timer) => {
        return timer - 1000
      })
    }, 1000)
  }


  return (
    <div className="App">
      {
        <>
          <button className="app_btn" onClick={() => getPinCode(143)}>Rohini</button>
          <button className="app_btn" onClick={() => getPinCode(148)}>Shadhara</button>
        </>
      }
      <br />
      {/* {((timer % 20000)/1000).toFixed(0)}s */}
      <Locations locations={centers} setPlay={setPlay}/>
    </div>  
  );
}

export default App;