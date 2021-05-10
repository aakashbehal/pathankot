import React from 'react';
import Sessions from './../sessions/sessions'

import Styles from './locations.module.css'

const Locations = ({locations, setPlay}) => {
    return (
        <div className={Styles.locations}>
          {
            locations && locations.map(({
              name, 
              pincode, 
              address, 
              fee_type,
              vaccine,
              sessions,
              center_id
            }) => {
              return (
                <div key={center_id} className={Styles.location}>
                  <h2>({fee_type})</h2>
                  <h3>{vaccine}</h3>
                  <h3>{name}</h3>
                  <p><small>pincode: {pincode}</small></p>
                  <p><small>center Id: {center_id}</small></p>
                  <br/>
                  <p>Address: {address}</p>
                  <br/>
                  <Sessions sessions={sessions} setPlay={setPlay}/>
                </div>
              )
            })
          }
        </div> 
      );
}

export default Locations;