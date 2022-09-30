import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { getFormFields, postClient } from '../../api/api'

import { InputNumber, InputText, InputTextArea, Select } from '../../components/form';
import { Button, Spinner, ErrorMessage, ErrorSubmit, Success } from '../../components/ui';


const schema = yup.object().shape({
    person_name: yup.string().min(3).max(64).required(),
    country: yup.string().min(2).max(32).required(),
});

const INPUT_TYPES = {
    number: 'number',
    text: 'text',
    textArea: 'textarea',
    select: 'select',
}

const handleInputs = (input, type, formHelpers, isSub) => {
    switch (type) {
        case INPUT_TYPES.number:
            return <InputNumber input={input} formHelpers={formHelpers} isSub={isSub} />
        case INPUT_TYPES.text:
            return <InputText input={input} formHelpers={formHelpers} isSub={isSub} />
        case INPUT_TYPES.textArea:
            return <InputTextArea input={input} formHelpers={formHelpers} isSub={isSub} />
        case INPUT_TYPES.select:
            return <Select input={input} formHelpers={formHelpers} isSub={isSub} />
        default:
            break;
    }
}

const getSubmitStatus = (status, clearStatus) => {
    switch (status) {
        case 'success':
            return <Success message='Successfully Submitted the form' clearStatus={clearStatus} />
        case 'error':
            return <ErrorSubmit message='Ooops! Something went wrong' clearStatus={clearStatus} />
        default:
            return null;
            break;
    }
}

function DynamicForm() {
    // { register, handleSubmit, watch, formState: { errors } }
    const formHelpers = useForm({
        resolver: yupResolver(schema),
    });

    const [status, setStatus] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSub, setIsSub] = useState(false)
    const [formInputs, setFormInputs] = useState([])

    const clearStatus = () => setStatus(null)

    const onSubmit = (data) => {
        setIsLoading(true)
        const postData = {
            "data": {
                "form_inputs": { ...data }
            }
        }
        postClient(postData)
            .then(res => {
                if (res.status === 200) {
                    console.log('success')
                    setIsLoading(false)
                    setIsSub(false)
                    setStatus('success')
                    formHelpers.reset()
                }
                console.log(res)
            })
            .catch((error) => {
                setStatus('error')
                setIsSub(false)
                setIsLoading(false)
                console.log(error)
            })
    };

    useEffect(() => {
        try {
            getFormFields()
                .then((res) => {
                    setIsLoading(false)
                    setFormInputs(res.data.data.attributes.config.form_inputs)
                })
                .catch((error => console.log(error)))
        } catch (error) {
            console.log(error)
        }
    }, [isLoading, status])

    return (
        <>
            <div className='flex justify-center mx-auto py-8 w-[600px] rounded-lg border-2 border-sky-500'>
                {isLoading
                    ?
                    <div>loading...</div>
                    :
                    <div>
                        <h1 className="text-3xl font-bold mb-8 text-center">
                            Dynamic Form
                        </h1>

                        <form onSubmit={formHelpers.handleSubmit(() => {
                            setIsSub(true)
                            setTimeout(() => onSubmit(), [2000])
                        })}>
                            {formInputs.map((input) => <div key={input.name}>{handleInputs(input, input.type, formHelpers, isSub)}</div>)}
                            <Button type='submit' disabled={isSub} >
                                {isSub ? <Spinner /> : 'Save'}
                            </Button>
                        </form>
                    </div >
                }
            </div >
            <div className='result'>
                {getSubmitStatus(status, clearStatus)}
            </div>
        </>
    )
}

export default DynamicForm