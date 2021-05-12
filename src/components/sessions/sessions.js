import React from 'react'

import Slots from "../Slots/slots"

const Sessions = ({sessions, setPlay}) => {
    return (
        <div>
        {
            sessions && sessions.map((session) => {
                return <Slots key={session.session_id} session={session} setPlay={setPlay}/>
            })
        }
        </div>
    )
}

export default Sessions;