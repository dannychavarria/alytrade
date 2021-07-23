import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { clearNewInvestmenStatus, createNewInvestmentPlan } from "reducers/DashboardReducer"

const useCreateInvestment = () => {
	const [state, setState] = useState({id_currency:1,alytradeMonths:3})
	const dispatcher = useDispatch()
	const history = useHistory()
	const requestStatus = useSelector(state=>state.newInvestmentState)

	const onChangeEvent = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		})
		dispatcher(clearNewInvestmenStatus())
	}
	const createInvestment = e => {
		e.preventDefault()
		console.log(state)
		dispatcher(createNewInvestmentPlan(state,()=> {
			history.push('/dashboard')
		}))
	}

	return { createInvestment,onChangeEvent,requestStatus }
}

export { useCreateInvestment }
