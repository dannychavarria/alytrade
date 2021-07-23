import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Login } from "reducers/DashboardReducer"

const useLogin = () => {

	const history = useHistory()
	const dispatcher = useDispatch()
	const loginState = useSelector(state => state.loginState)
	const login = (e, formData) => {
		e.preventDefault()

		dispatcher(Login(formData.email, formData.password, () => {
			history.push('/dashboard')
		}))
	}

	const gotoRegister = () => {
		history.push('/register')
	}

	return { login, loginState, gotoRegister }
}

export { useLogin }
