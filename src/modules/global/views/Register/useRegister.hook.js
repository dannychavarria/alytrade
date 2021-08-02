import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import services from "services"
import { useCountry } from '../../../../services/Country'
const initialState={
	id_currency:1,
	alytradeMonths:3
}
const useRegister = () => {
	const [state, setState] = useState(initialState)
	const [formStatus, setFormStatus] = useState()
	const [countries,setCountries] = useState([])
	const history = useHistory()
	const country = useCountry()

	useEffect(() => {
		if(countries.length === 0)
			country.getAllNames().then(data=> setCountries(data))
	}, [])


	const onChangeEvent = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		})
		setFormStatus('')
	}
	

	const buildRequest = () => {
		if (state.password1 !== state.password2) {
			setFormStatus('Contraseñas no coinciden')
			return
		}
		if (state.password1.length < 6) {
			setFormStatus('La Contraseña debe ser mayor de 6 digitos')
			return
		}

		const request = {
			"firstname": state.firstname,
			"lastname": state.lastname,
			"email": state.email,
			"phone": state.phone,
			"country": state.country,
			"hash": state.hash,
			"username": state.username,
			"password": state.password1,
			"wallet": state.wallet,
			"amount": state.amount,
			"id_currency": state.id_currency,
			//"info":state.info,
			"alytradeMonths": state.alytradeMonths,
		}
		return request
	}

	const registerEvent = () => {

		const request = buildRequest()
		if (!request) {
			return
		}

		services.registerNewUser(request).then(response => {
			history.push("/login")
		}).catch(err => {
			console.log(err)
			setFormStatus(err.message)
		})
	}

	const register = e => {
		e.preventDefault()
		registerEvent()
	}

	return { register, onChangeEvent, countries,formStatus	 }
}

export { useRegister }
