import { useEffect, useMemo, useState } from "react"
import { useHistory } from "react-router-dom"
import services from "services"
import { useCountry } from '../../../../services/Country'
import Joi from 'joi'
import axios from "axios"

const initialState = {
	id_currency: 1,
	alytradeMonths: 3
}

const schema = Joi.object({
	id_currency: Joi.number(),
	alytradeMonths: Joi.number().equal(3, 6, 12, -1).messages({ 'number.only': 'Debe elegir un plan de 3, 6 o 12 meses' }),
	firstname: Joi.string().required().messages({ 'string.empty': 'Debe ingresar un nombre', 'any.required': 'Debe ingresar un nombre' }),
	lastname: Joi.string().required().messages({ 'string.empty': 'Debe ingresar un apellido', 'any.required': 'Debe ingresar un apellido' }),
	email: Joi.string().required().email({ tlds: false }).messages({ 'any.required': 'Debe ingresar un correo electrónico' }),
	username: Joi.string().required().messages({ 'string.empty': 'Debe ingresar un nombre de usuario', 'any.required': 'Debe ingresar un usuario' }),
	phone: Joi.string().required().messages({ 'string.empty': 'Debe ingresar un numero de telefono', 'any.required': 'Debe ingresar un numero de telefono' }),
	country: Joi.string().required().messages({ 'string.empty': 'Debe ingresar un pais', 'any.required': 'Debe ingresar un pais' }),
	hash: Joi.string().required().messages({ 'string.empty': 'Debe ingresar un hash  de transacción', 'any.required': 'Debe ingresar un hash de transacción' }),
	wallet: Joi.string().required().messages({ 'string.empty': 'Debe ingresar un wallet de alypay', 'any.required': 'Debe ingresar un wallet de alypay' }),
	password1: Joi.string().min(6).label('Password').messages({
		'string.min': 'Contraseña debe ser mayor a 6 digitos'
	}),
	password2: Joi.any().equal(Joi.ref('password1')).required().label('Contraseña de confirmación').messages({
		'any.only': '{{#label}} No coincide',
		'any.required': 'Debe ingresar contraseña'
	}),
	amount: Joi.number().required().prefs({ convert: true }).messages({ 'any.required': 'Debe ingresar el monto de la transacción' }),
	months: Joi.number().min(13).prefs({ convert: true }).optional().messages({ 'number.min': 'Debe ingresar mas de 12 meses' })
})

const useRegister = () => {
	const [state, setState] = useState(initialState)
	const [formStatus, setFormStatus] = useState()
	const [countries, setCountries] = useState([])
	const history = useHistory()
	const country = useCountry()
	const [visibleInput, setVisibleInput] = useState(false)
	const [usdPrices, setUsdPrices] = useState()

	const gotoLogin = () => {
		history.push('/login')
	}

	const updatePrices = () => {
		const endpoint = process.env.REACT_APP_PRICES_ENDPOINT
		axios({
			method: 'get',
			url: endpoint
		}).then(response => {
			const { data } = response
			console.log(data)
			const keys = Object.keys(data)
			const map = {}
			for (let key of keys) {
				//console.log(key)
				map[key] = data[key].quote.USD.price
			}
			setUsdPrices(map)
		}).catch(err => {
			console.log(err)
		})
	}

	useEffect(() => {
		updatePrices()
		if (countries.length === 0)
			country.getAllNames().then(data => setCountries(data))
	}, [])



	const calcPrice = (kycType, currency) => {
		if(!usdPrices)
			return
		
		const commercePrice = 20000
		const userPrice = 10000
		const price = kycType == 1 ? userPrice : commercePrice
		
		const formatter = Intl.NumberFormat('en-US',{currency:'USD',maximumFractionDigits:2})
		return formatter.format(price/usdPrices[currency])
	}
	


	const onChangeEvent = (e) => {

		if (e.target.name === 'alytradeMonths') {
			if (Number(e.target.value) === -1)
				setVisibleInput(true)
			else {
				setVisibleInput(false)
				delete state.months
			}
		}

		setState({
			...state,
			[e.target.name]: e.target.value
		})
		setFormStatus('')
	}


	const buildRequest = () => {

		const { value, error } = schema.validate(state)
		if (error) {
			console.dir(error.details)
			setFormStatus(error.details[0].message)
			return
		}
		//console.log(value?.error?.details)
		/*if (state.password1 !== state.password2) {
			setFormStatus('Contraseñas no coinciden')
			return
		}
		if (state.password1.length < 6) {
			setFormStatus('La Contraseña debe ser mayor de 6 digitos')
			return
		}*/

		const request = {
			"firstname": value.firstname,
			"lastname": value.lastname,
			"email": value.email,
			"phone": value.phone,
			"country": value.country,
			"hash": value.hash,
			"username": value.username,
			"password": value.password1,
			"wallet": value.wallet,
			"amount": value.amount,
			"id_currency": value.id_currency,
			//"info":value.info,
			"alytradeMonths": value.alytradeMonths === -1 ? value.months : value.alytradeMonths,
		}
		return request
	}

	const registerEvent = () => {

		const request = buildRequest()
		if (!request) {
			return
		}
		console.log(request)
		/*services.registerNewUser(request).then(response => {
			history.push("/login")
		}).catch(err => {
			console.log(err)
			setFormStatus(err.message)
		})*/
	}

	const register = e => {
		e.preventDefault()
		registerEvent()
	}

	return { register, onChangeEvent, countries, formStatus, visibleInput, state, calcPrice, gotoLogin }
}

export { useRegister }
