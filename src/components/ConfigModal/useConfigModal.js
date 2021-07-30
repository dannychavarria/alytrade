import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import services from 'services'

const useConfigModal = ({submitCallback=()=>{}}) => {
    const { firstname, lastname, email, phone, country, token } = useSelector(state => state.userInfo)

    const [state, setState] = useState({
        firstname,
        lastname,
        email,
        phone,
        country,
        email: '',
        password:'',
        password1:'',
        password2:''
    })
    const [formState, setFormState] = useState()

    const submitUserData = () => {
        const request = {
            firstname: state['firstname'],
            lastname: state['lastname'],
            country: state['country'],
            phone: state['phone'],
            email1: state['email'],
            email2: state['email1'],
            password: state['password'],
            password1: state['password1'],
            password2: state['password2']
        }
        if(!request.email2)
            delete request.email1

        return services.updateUserData(token, request).then(response => {
            console.log(response)
            setState({
                ...state,
                password:'',
                password1:'',
                password2:'',
                email2:''
            })
            
            submitCallback()
            return response
        }).catch(err => {
            console.dir(err.message)
            setFormState(err.message)
        })
    }

    const onChange = (e) => {
        console.log(state)
        console.log(e.target.name)
        setFormState('')
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        setState({
            ...state,
            firstname, lastname, email, phone, country
        })
    }, [firstname, lastname, email, phone, country])

    return { onChange, state, submitUserData, formState }
}

export { useConfigModal }