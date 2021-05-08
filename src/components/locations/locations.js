import React from 'react';
import Slots from './../Slots/slots'

import Styles from './locations.module.css'

const Locations = ({locations}) => {
    return (
        <div className={Styles.locations}>
          {
            locations && locations.map(({
              name, 
              pincode, 
              address, 
              available_capacity,
              min_age_limit,
              fee_type,
              vaccine,
              slots
            }) => {
              return (
                <div className={Styles.location}>
                  <h2><span style={{"color": "red"}}>{min_age_limit}+</span> ({fee_type})</h2>
                  <h3>{vaccine}</h3>
                  <h3>{name}</h3>
                  <p><small>pincode: {pincode}</small></p>
                  <br/>
                  <p>Address: {address}</p>
                  <br/>
                  <h2>Available capacity: {available_capacity}</h2>
                  <br/>
                  { slots.length > 0 ? <Slots slots={slots}/> : <p>No Slots Available</p>}
                </div>
              )
            })
          }
        </div> 
      );
}

export default Locations;