import React from 'react'
import spinner from '../assets/spinner.gif'

function Spinner() {
    return (
        <div className="flex items-center justify-center h-screen">
            <img src={spinner}
                alt="Loading ... "
                className="w-1/4"
            />
        </div>
    )
}

export default Spinner