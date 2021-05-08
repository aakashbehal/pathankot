import React from 'react'

import Styles from './slots.module.css'

const Slots = ({slots}) => {
    return (
        <div className={Styles.slots}>
        {
            slots && slots.map((slot) => {
                return <p className={Styles.slot}>{slot}</p>
            })
        }
        </div>
    )
}

export default Slots;