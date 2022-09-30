import React, { useEffect, useState } from 'react'
import { ErrorMessage as FormError } from '@hookform/error-message';
import ErrorMessage from '../ui/ErrorMessage'

function Select({ input, formHelpers, isSub }) {
    const [error, setError] = useState(null)

    const { register, formState: { errors } } = formHelpers
    const { label, name, placeholder, options, default_value } = input



    let rule = { required: false, min: null, max: null }
    const rules = input.rules.split('|')

    useEffect(() => {
        if (errors.length > 0) {
            error.map(error => console.log(error))
            setError(Object.getOwnPropertyDescriptor(errors, name))
        }
    }, [errors, setError])



    rules.map(item => {
        if (item == 'required') {
            rule = { ...rule, required: true }
        }
        if (item.includes('min')) {
            rule = { ...rule, min: item.split(':')[1] }
        }
        if (item.includes('max')) {
            rule = { ...rule, max: item.split(':')[1] }
        }
    })
    return (
        <div className='mb-8'>
            <div className=' p-2 flex flex-col w-[350px]'>
                <label className='mr-4 mb-2'>{label}</label>

                <select
                    {...register(name, rule)}
                    placeholder={placeholder}
                    defaultValue={default_value}
                    disabled={isSub}
                    className='border px-2 py-1 rounded w-full'>
                    {options.map(option => <option key={option.value} >{option.label}</option>)}
                </select>

                <FormError
                    errors={errors}
                    name={name}
                    render={({ message }) => <ErrorMessage>{message}</ErrorMessage>}
                />
            </div>
        </div>

    )
}

export default Select