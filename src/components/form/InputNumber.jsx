import React from 'react'

function InputNumber({ input, register }) {
    let rule = { required: true, min: 2, max: 3 }

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
        <div>
            <input type="number" {...register(input.name, { ...rule })} />
            <input type="submit" />
        </div>
    )
}

export default InputNumber