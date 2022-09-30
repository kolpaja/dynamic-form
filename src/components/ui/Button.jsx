import React from 'react'

function Button({ children, ...rest }) {
    return (
        <button  {...rest} className='border rounded-lg text-xl active:bg-sky-700 hover:bg-sky-500 bg-sky-300 text-white px-2 py-1 my-4 mx-2'>
            {children}
        </button>
    )
}

export default Button