import axios from 'axios'

const API_URL = 'https://mdc-dynamic-form.azurewebsites.net/api'

export const getFormFields = () => axios.get(API_URL + '/dynamic-form')

export const postClient = (formData) => axios.post(API_URL + '/clients', formData)