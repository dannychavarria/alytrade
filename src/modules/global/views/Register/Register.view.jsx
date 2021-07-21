import { alyTradeLogo, background, poweredBy } from 'assets'
import { Button, TextField } from 'modules/customs/components'
import { classNames } from 'modules/customs/utils'
import React from 'react'
import styles from './Register.module.css'
import { useRegister } from './useRegister.hook'
import {
	FiCreditCard,
	FiDollarSign,
	FiGlobe,
	FiLock,
	FiMail,
	FiPhone,
	FiUser,
	FiWatch,
} from 'react-icons/fi'
import { FaWallet, FaCoins } from 'react-icons/fa'

const RegisterView = ({ className = '' }) => {
	const { register } = useRegister()

	return (
		<main className={classNames(styles.parent, className)}>
			<div className={styles.register}>
				<div
					className={styles.leftPanel}
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
						Si ya dispone de una cuenta, puede acceder a
						continuación
					</span>

					<Button
						type='button'
						rol='secondary'
						className={styles.submit}>
						Ingresar
					</Button>
				</div>

				<div className={styles.rightPanel}>
					<form onSubmit={register} className={styles.form}>
						<h2 className={styles.title}>Crear cuenta</h2>

						<span className={styles.span}>
							Por favor ingrese sus datos para poder crear una
							cuenta.
						</span>

						<div className={styles.columns}>
							<TextField
								placeholder='Nombre'
								className={styles.input}
								prevIcon={<FiUser />}
							/>

							<TextField
								placeholder='Apellido'
								className={styles.input}
								prevIcon={<FiUser />}
							/>
						</div>

						<TextField
							placeholder='Correo electrónico'
							className={styles.input}
							prevIcon={<FiMail />}
						/>

						<div className={styles.columns}>
							<TextField
								placeholder='País'
								className={styles.input}
								prevIcon={<FiGlobe />}
								type='select'
							/>

							<TextField
								placeholder='teléfono'
								className={styles.input}
								prevIcon={<FiPhone />}
							/>
						</div>

						<TextField
							placeholder='Hash'
							className={styles.input}
							prevIcon={<FiCreditCard />}
						/>

						<div className={styles.columns}>
							<TextField
								placeholder='Usuario'
								className={styles.input}
								prevIcon={<FiUser />}
							/>

							<TextField
								placeholder='Wallet'
								className={styles.input}
								prevIcon={<FaWallet />}
							/>
						</div>

						<div className={styles.columns}>
							<TextField
								placeholder='Contraseña'
								className={styles.input}
								prevIcon={<FiLock />}
								type='password'
							/>

							<TextField
								placeholder='Repetir contraseña'
								className={styles.input}
								prevIcon={<FiLock />}
								type='password'
							/>
						</div>

						<div className={styles.columns}>
							<TextField
								placeholder='Monto'
								className={styles.input}
								prevIcon={<FiDollarSign />}
							/>

							<TextField
								placeholder='Moneda'
								className={styles.input}
								prevIcon={<FaCoins />}
								type='select'
							/>
						</div>

						<TextField
							placeholder='Plan'
							className={styles.input}
							prevIcon={<FiWatch />}
							type='select'
						/>

						<div className={styles.conditions}>
							<input
								type='checkbox'
								name='conditions'
								id='conditions'
							/>

							<span>
								He leído y estoy de acuerdo con los{' '}
								<span>términos y condiciones</span>
							</span>
						</div>

						<Button type='submit' className={styles.submit}>
							Crear cuenta
						</Button>
					</form>
				</div>
			</div>

			<img
				src={poweredBy}
				alt='Powered by AlySystem'
				className={styles.poweredBy}
			/>
		</main>
	)
}

export default React.memo(RegisterView)
