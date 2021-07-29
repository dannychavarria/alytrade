import axios from 'axios'
import React from 'react'

const useCountry = () => {
    const host = 'https://restcountries.eu'

    const getAll = () => {
        return axios({
            method: 'GET',
            url: `${host}/rest/v2/all`
        }).then(response => {
            const { data } = response
            return data
        }).catch(err => {
            console.log(err.message)
            throw (err)
        })
    }

    const getAllNames = () => {
        return getAll().then(data => {
            return data.map(item => {
                return item.name
            })
        })
    }

    return {
        getAllNames
    }
}

export { useCountry }