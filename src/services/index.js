import axios from 'axios'

class alyTradeApi {

    host = undefined

    constructor(host) {
        this.host = host
    }

    login = (email, password) => {
        return axios({
            method: 'post',
            url: `${this.host}/login`,
            data: {
                email,
                password
            }
        }).then(response => {
            const { data } = response
            if (data.error)
                throw new Error(data.message)
            
            const { id_user, username, id_information, token, firstname, lastname,
                email,
                phone,
                country,
                kyc, kyc_type } = data

            return {
                id_user, username, id_information, token, firstname, lastname,
                email,
                phone,
                country,
                kyc, kyc_type
            }
        }).catch(err => {
            console.log(err)
            throw err
        })
    }
    getDashboard = (token) => {

        return axios({
            method: 'get',
            url: `${this.host}/alytrade/dashboard`,
            headers: {
                'x-auth-token': token
            }
        }).then(response => {
            const { data } = response
            return data
        }).catch(err => {
            console.log(err)
            throw err
        })
    }
    getGraphInfo = (token, currencyId) => {
        return axios({
            method: 'get',
            url: `${this.host}/alytrade/graph/${currencyId}`,
            headers: {
                'x-auth-token': token
            }
        }).then(response => {
            const { data } = response
            return data
        }).catch(err => {
            console.log(err)
            throw err
        })
    }
    createNewInvestment = (token, data) => {
        return axios({
            method: 'post',
            url: `${this.host}/alytrade/newAlytradeInvestment`,
            headers: {
                'x-auth-token': token
            },
            data
        }).then(response => {
            const { data } = response
            if (data.error)
                throw new Error(data.message)
            return data
        }).catch(err => {
            console.log(err)
            throw err
        })
    }
    registerNewUser = (data) => {
        return axios({
            method: 'POST',
            url: `${this.host}/alytrade/register`,
            data
        }).then(response => {
            const { data } = response
            if (data.error)
                throw new Error(data.message)

            console.log(data)
            return data
        }).catch(err => {
            console.log(err)
            throw new Error(err.response.error)
        })
    }
    updateUserData = (token, data) => {
        return axios({
            method: 'POST',
            url: `${this.host}/alytrade/user/data`,
            data,
            headers: {
                'x-auth-token': token
            }
        }).then(response => {
            return response
        }).catch(err => {
            const { response } = err
            console.dir(response)
            throw new Error(response.data.error)
        })
    }
}

export default new alyTradeApi(process.env.REACT_APP_HOST)