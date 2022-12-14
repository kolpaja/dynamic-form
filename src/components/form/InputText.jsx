import React from 'react'
import { ErrorMessage as FormError } from '@hookform/error-message';
import ErrorMessage from '../ui/ErrorMessage';

function InputText({ input, formHelpers, isSub }) {
    const { register, formState: { errors } } = formHelpers
    const { label, name, placeholder } = input
    let rule = { required: false, min: null, max: null }

    const rules = input.rules.split('|')

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

                <input {...register(name, rule)} disabled={isSub} placeholder={placeholder} className='border px-2 py-1 rounded w-full' />

                <FormError
                    errors={errors}
                    name={name}
                    render={({ message }) => <ErrorMessage>{message}</ErrorMessage>}
                />
            </div>
        </div>

    )
}

export default InputText