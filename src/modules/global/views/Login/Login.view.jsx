import { alyTradeOrbe } from 'assets'
import { Button, TextField } from 'modules/customs/components'
import { classNames } from 'modules/customs/utils'
import React from 'react'
import styles from './Login.module.css'
import { useLogin } from './useLogin.hook'
import { FiLock, FiMail } from 'react-icons/fi'

const LoginView = ({ className = '' }) => {
	const { login } = useLogin()

	return (
		<div className={classNames(styles.login, className)}>
			<div className={styles.leftPanel}>
				<img
					src={alyTradeOrbe}
					alt='AlyTrade'
					className={styles.logo}
				/>

				<form onSubmit={login} className={styles.form}>
					<h2 className={styles.title}>Bienvenido</h2>

					<span className={styles.span}>
						Por favor ingrese su nombre de usuario y su contraseña
						para acceder al sistema.
					</span>

					<TextField
						placeholder='Correo electrónico'
						error='El correo ingresado no es valido'
						className={styles.input}
						prevIcon={<FiMail />}
						label='Correo de usuario'
					/>

					<TextField
						placeholder='Contraseña'
						className={styles.input}
						type='password'
						prevIcon={<FiLock />}
					/>

					<Button label='Ingresar' />
				</form>

				<hr />

				<div></div>
			</div>

			<div className={styles.rightPanel}></div>
		</div>
	)
}

export default React.memo(LoginView)
