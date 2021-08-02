import moment from 'moment'
import services from '../services'
import Services from '../services'
import { getCurrencyDataById, getCurrencyPrices } from '../utils'

const ACTIONS = {
    DASHBOARD_SET_USERINFO: 'DASHBOARD_SET_USERINFO',
    DASHBOARD_SET_PLANS: 'DASHBOARD_SET_PLANS',
    DASHBOARD_SET_GRAPHDATA: 'DASHBOARD_SET_GRAPHDATA',
    DASHBOARD_SET_USD_PRICES: 'DASHBOARD_SET_USD_PRICES',
    DASHBOARD_SET_SELECTED_PLAN: 'DASHBOARD_SET_SELECTED_PLAN',
    DASHBOARD_LOGOUT: 'DASHBOARD_LOGOUT',
    DASHBOARD_LOGIN_STATUS: 'DASHBOARD_LOGIN_STATUS',
    DASHBOARD_NEW_INVESTMENT_STATUS: 'DASHBOARD_NEW_INVESTMENT_STATUS',
}

const initialState = {
    graphData: {},
    prices: {}
}

export const DashboardReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.DASHBOARD_SET_USERINFO:
            return {
                ...state,
                userInfo: payload,
                loginState: 'OK',
                newInvestmentState: undefined
            }
        case ACTIONS.DASHBOARD_SET_PLANS:
            return {
                ...state,
                selectedPlan: 0,
                plans: payload
            }
        case ACTIONS.DASHBOARD_SET_GRAPHDATA:
            const graphData = { ...state.graphData }
            graphData[payload.currencyId] = payload.data
            return {
                ...state,
                graphData
            }
        case ACTIONS.DASHBOARD_SET_USD_PRICES:

            return {
                ...state,
                prices: payload
            }
        case ACTIONS.DASHBOARD_SET_SELECTED_PLAN:
            return {
                ...state,
                selectedPlan: payload
            }
        case ACTIONS.DASHBOARD_LOGOUT:
            return initialState
        case ACTIONS.DASHBOARD_LOGIN_STATUS: {
            return {
                ...state,
                loginState: payload
            }
        }
        case ACTIONS.DASHBOARD_NEW_INVESTMENT_STATUS: {
            return {
                ...state,
                newInvestmentState: payload
            }
        }
        default:
            return state
    }
}

export const Login = (email, password, callback) => {

    if(!email || !password ){
        return { type: ACTIONS.DASHBOARD_LOGIN_STATUS, payload: 'Verifique su email y su contraseña' }
    }

    return dispatch => {
        return Services.login(email, password).then(response => {
            const { id_information, id_user, token, username,firstname,
                lastname,
                email,
                phone,
                country } = response
            
            sessionStorage.setItem('token', token)
            dispatch({ type: ACTIONS.DASHBOARD_SET_USERINFO, payload: { id_information, id_user, token, username,firstname, lastname, email, phone, country } })
            callback?.()
        }).catch(err => {
            console.log(err.message)
            dispatch({ type: ACTIONS.DASHBOARD_LOGIN_STATUS, payload: err.message })
        })
    }
}

export const getDashboardInformation = () => {

    return async (dispatch, getState) => {

        const { userInfo } = getState()

        const prices = await getCurrencyPrices()
        dispatch(setCurrencyPrices(prices))

        const response = await Services.getDashboard(userInfo.token)
        const currentReduce = (acc, cur) => {
            return { amount: acc.amount + cur.amount }
        }

        const dashboardData = response.map(item => {
            item.toGain = item.amount * item.plan.months * item.plan.percentage

            item.current = item.interests.reduce(currentReduce, { amount: 0 }).amount

            item.remaining = (item.toGain - item.current) || item.toGain

            item.percentage = 100 - ((item.remaining * 100) / item.toGain)
            item.percentage = Number(item.percentage.toFixed(2))

            item.symbol = getCurrencyDataById(item.id_currency).symbol
            item.name = getCurrencyDataById(item.id_currency).name
            item.color = getCurrencyDataById(item.id_currency).color

            item.currentUsd = item.current * Number(prices[item.symbol])

            item.interests = item.interests.map(int => {
                int.currency = item.symbol
                int.percentage = item.percentage
                int.gainUsd = prices[item.symbol] * int.amount
                return int
            })

            return item
        })


        dispatch({ type: ACTIONS.DASHBOARD_SET_PLANS, payload: dashboardData })
        dispatch(getGraphData())
    }
}

export const getGraphData = () => {
    return async (dispatch, getState) => {
        const { selectedPlan, plans, userInfo } = getState()
        const plan = plans[selectedPlan]
        const response = await Services.getGraphInfo(userInfo.token, plan.id_currency)
        console.log(response)
        const graphData = {
            labels: response.map(item => moment(item.datetime).add(1, 'day').format('ddd. DD MMM.')),
            data: response.map(item => item.price)
        }
        console.log(graphData)
        dispatch({ type: ACTIONS.DASHBOARD_SET_GRAPHDATA, payload: { currencyId: plan.id_currency, data: graphData } })
    }
}

export const setCurrencyPrices = (prices) => {
    return { type: ACTIONS.DASHBOARD_SET_USD_PRICES, payload: prices }
}

export const changeSelectedPlan = (index) => {
    return { type: ACTIONS.DASHBOARD_SET_SELECTED_PLAN, payload: index }
}

export const createNewInvestmentPlan = (formData, callback) => {
    return (dispatch, getState) => {
        const { userInfo } = getState()
        Services.createNewInvestment(userInfo.token, formData).then(response => {
            console.log(response)
            callback?.()
        }).catch(err => {
            console.log(err)
            dispatch({ type: ACTIONS.DASHBOARD_NEW_INVESTMENT_STATUS, payload: err.message })
        })
    }
}

export const logOut = () => {
    sessionStorage.removeItem('token')
    return { type: ACTIONS.DASHBOARD_LOGOUT }
}

export const clearNewInvestmenStatus = () => {
    return { type: ACTIONS.DASHBOARD_NEW_INVESTMENT_STATUS, payload: undefined }
}

export const changeUserInfo = (data) => {
    return { type:ACTIONS.DASHBOARD_SET_USERINFO, payload:data }
}