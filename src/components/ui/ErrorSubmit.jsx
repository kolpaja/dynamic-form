import React from 'react'
import cancel from '../../assets/cancel.svg';
import Button from './Button';

function ErrorSubmit({ message, clearStatus }) {
    return (
        <div className='flex flex-col items-center justify-center m-4 p-4'>
            <div>
                <img src={cancel} alt='error' />
            </div>

            <p>{message}</p>

            <Button onClick={() => clearStatus()}>
                Clear
            </Button>
        </div>
    )
}

export default ErrorSubmit