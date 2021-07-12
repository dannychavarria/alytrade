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

            const { id_user, username, id_information, token } = data
            return { id_user, username, id_information, token }
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
}

export default new alyTradeApi(process.env.REACT_APP_HOST)