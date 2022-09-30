import React from 'react'
import check from '../../assets/checkmark.svg'
import Button from './Button'

function Success({ message, clearStatus }) {
    return (
        <div className='flex flex-col items-center justify-center m-4 p-4'>
            <div>
                <img src={check} alt='success' />
            </div>

            <p>{message}</p>

            <Button onClick={() => clearStatus()}>
                Clear
            </Button>
        </div>
    )
}

export default Success