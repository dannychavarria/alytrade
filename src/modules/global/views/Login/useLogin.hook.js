import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Login, clearLoginStatus } from "reducers/DashboardReducer"

const useLogin = () => {

	const history = useHistory()
	const dispatcher = useDispatch()
	const loginState = useSelector(state => state.loginState)
	const login = (e, formData) => {
		e.preventDefault()

		dispatcher(Login(formData.email, formData.password, ({ kyc }) => {
			//history.push('/kyc')
			//console.log("KYC",kyc)
			if (kyc === 1)
				history.push('/dashboard')
			else
				history.push('/kyc')
		}))
	}

	const gotoRegister = () => {
		history.push('/register')
	}

	const clearStatus = () =>{
		dispatcher(clearLoginStatus())
	}

	return { login, loginState, gotoRegister, clearStatus }
}

export { useLogin }
