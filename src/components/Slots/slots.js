import React, { useEffect } from 'react'

import Styles from './slots.module.css'

const Slots = ({session: {session_id, date, available_capacity, min_age_limit, vaccine, slots}, setPlay}) => {

    useEffect(() => {
        if(available_capacity > 0) setPlay()
    })

    return (
        <div className={Styles.slots}>
            {
                slots && <div key={session_id} className={{display: 'flex'}}>
                <h3 style={{"color": "#2c7100"}}>{min_age_limit}+ ({vaccine})</h3>
                <p>{date}</p>
                <h2 className={available_capacity > 0 ? available_capacity > 0 && Styles.available < 25 ? Styles.partially_available : Styles.available  : Styles.not_available }>Available capacity: {available_capacity}</h2>
                {
                    slots && slots.map((slot, index) => {
                        return <p key={index} className={Styles.slot}>{slot}</p>
                    })
                }
            </div>
            }
        </div>
    )
}

export default Slots;

