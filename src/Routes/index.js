import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import * as Containers from '../Containers'
import { useSelector } from 'react-redux'
import { LoginView, RegisterView } from 'modules/global/views'

const PrivateRoute = ({ children, isLogged, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isLogged ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	)
}

const Routes = () => {
	const userInfo = useSelector(state => state.userInfo)
	const IsLogged = () => {
		return userInfo?.token ? true : false
	}

	return (
		<>
			<Router>
				<Route
					exact
					path='/'
					render={() => {
						return IsLogged() ? (
							<Redirect to='/dashboard' />
						) : (
							<Redirect to='login' />
						)
					}}
				/>
				<Route path='/login'>
					<LoginView />
				</Route>
				<Route path='/register'>
					<RegisterView />
				</Route>
				<PrivateRoute isLogged={IsLogged()} path='/dashboard'>
					<Containers.MainContainer />
				</PrivateRoute>
			</Router>
		</>
	)
}

export default Routes
