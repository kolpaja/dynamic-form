import React from 'react'

function ErrorMessage({ children }) {
    return (
        <div className='mb-2 text-center text-red-700 flex justify-end'>* {children}</div>
    )
}

export default ErrorMessage