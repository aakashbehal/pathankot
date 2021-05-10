import React from 'react'

import Slots from "../Slots/slots"

const Sessions = ({sessions, setPlay}) => {
    return (
        <div>
        {
            sessions && sessions.map((session) => {
                // if (session.min_age_limit === 18 && session.available_capacity > 0) {
                    return <Slots key={session.session_id} session={session} setPlay={setPlay}/>
                // } else {
                    // return <p key={session.session_id} style={{color: 'orange', fontWeight: 'bold'}}>No Slots Available</p>
                // }
            })
        }
        </div>
    )
}

export default Sessions;