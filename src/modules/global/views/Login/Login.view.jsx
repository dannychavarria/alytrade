import { alyTradeLogo, alyTradeOrbe, background, poweredBy } from 'assets'
import { Button, TextField } from 'modules/customs/components'
import { classNames } from 'modules/customs/utils'
import React, { useState } from 'react'
import styles from './Login.module.css'
import { useLogin } from './useLogin.hook'
import { FiLock, FiMail } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const LoginView = ({ className = '' }) => {
	const { login, loginState, gotoRegister, clearStatus } = useLogin()

	const [state, setState] = useState({email:'',password:''})
	const onChangeEvent = (e) => {
		clearStatus()
		setState({
			...state,
			[e.target.name]: e.target.value
		})
	}

	return (
		<div className={classNames(styles.parent, className)}>
			<div className={styles.login}>
				<div className={styles.leftPanel}>
					<img
						src={alyTradeOrbe}
						alt='AlyTrade'
						className={styles.logo}
					/>

					<form onSubmit={(e)=>login(e,state)} className={styles.form}>
						<h2 className={styles.title}>Bienvenido</h2>

						<span className={styles.span}>
							Por favor ingrese su nombre de usuario y su
							contraseña para acceder al sistema.
						</span>
						<h5 style={{color:'red'}}>{loginState}</h5>
						<TextField
							name="email"
							placeholder='Correo electrónico'
							className={styles.input}
							prevIcon={<FiMail />}
							onChange={onChangeEvent}
						/>

						<TextField
							name="password"
							placeholder='Contraseña'
							className={styles.input}
							type='password'
							prevIcon={<FiLock />}
							onChange={onChangeEvent}
						/>

						<Button type='submit' className={styles.submit}>
							Ingresar
						</Button>

						<hr className={styles.hr} />
					</form>

					<div className={styles.footer}>
						<span>¿Olvidaste tu contraseña?</span>

						<span className={styles.textSecondary}>
							De click <Link to='/'>Aquí</Link>
						</span>
					</div>
				</div>

				<div
					className={styles.rightPanel}
					style={{
						background: `linear-gradient(145deg, var(--primary-gradient) 70%, var(--secondary-gradient) 90%), url(${background})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}>
					<img
						src={alyTradeLogo}
						alt='AlyTrade'
						className={styles.logo}
					/>

					<span className={styles.span}>
						Si no dispone de una cuenta, puede crear una a
						continuación
					</span>

					<Button onClick={gotoRegister} type='button' rol='secondary' className={styles.submit}>
						Crear cuenta
					</Button>
				</div>
			</div>

			<img
				src={poweredBy}
				alt='Powered by AlySystem'
				className={styles.poweredBy}
			/>
		</div>
	)
}

export default React.memo(LoginView)
