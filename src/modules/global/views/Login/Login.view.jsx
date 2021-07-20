import { alyTradeOrbe } from 'assets'
import { Button, TextField } from 'modules/customs/components'
import { classNames } from 'modules/customs/utils'
import React from 'react'
import styles from './Login.module.css'
import { useLogin } from './useLogin.hook'
import { FiMail } from 'react-icons/fi'

const LoginView = () => {
	const { login } = useLogin()

	return (
		<div className={classNames(styles.login)}>
			<div className={classNames(styles.leftPanel)}>
				<img
					src={alyTradeOrbe}
					alt='AlyTrade'
					className={classNames(styles.logo)}
				/>

				<form onSubmit={login} className={classNames(styles.form)}>
					<h2 className={classNames(styles.title)}>Bienvenido</h2>

					<span className={classNames(styles.span)}>
						Por favor ingrese su nombre de usuario y su contraseña
						para acceder al sistema.
					</span>

					<TextField
						placeholder='Correo electrónico'
						error='El correo ingresado no es valido'
						className={classNames(styles.input)}
						prevIcon={<FiMail />}
					/>

					<TextField placeholder='Contraseña' />

					<Button label='Ingresar' />
				</form>

				<hr />

				<div></div>
			</div>

			<div className={classNames(styles.rightPanel)}></div>
		</div>
	)
}

export default React.memo(LoginView)
