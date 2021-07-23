import { alyTradeLogo, background, poweredBy } from 'assets'
import { Button, TextField } from 'modules/customs/components'
import { classNames } from 'modules/customs/utils'
import React from 'react'
import styles from './Register.module.css'
import { useRegister } from './useRegister.hook'

const RegisterView = ({ className = '' }) => {
	const { register } = useRegister()

	return (
		<div className={classNames(styles.parent, className)}>
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
								name='firstname'
							/>

							<TextField
								placeholder='Apellido'
								className={styles.input}
								name='lastname'
							/>
						</div>

						<div className={styles.columns}>
							<TextField
								placeholder='Correo electrónico'
								className={styles.input}
								type='email'
								name='email'
							/>

							<TextField
								placeholder='Usuario'
								className={styles.input}
								name='username'
							/>
						</div>

						<div className={styles.columns}>
							<TextField
								placeholder='Teléfono'
								className={styles.input}
								name='phone'
							/>

							<TextField
								name='country'
								className={styles.input}
								type='select'
								defaultValue=''
								options={[
									{
										label: 'País',
										value: '',
										disabled: true,
									},
								]}
							/>
						</div>

						<div className={styles.columns}>
							<TextField
								placeholder='Hash'
								className={styles.input}
								name='hash'
							/>

							<TextField
								placeholder='Wallet'
								className={styles.input}
								name='wallet'
							/>
						</div>

						<div className={styles.columns}>
							<TextField
								placeholder='Contraseña'
								className={styles.input}
								type='password'
								name='password1'
							/>

							<TextField
								placeholder='Repita contraseña'
								className={styles.input}
								type='password'
								name='password2'
							/>
						</div>

						<div className={styles.columns}>
							<TextField
							name='id_currency'
								className={styles.input}
								type='select'
								defaultValue=''
								options={[
									{
										label: 'Moneda',
										value: '',
										disabled: true,
									},
									{ label: 'Alycoin', value: 'ALY' },
									{ label: 'Bitcoin', value: 'BTC' },
								]}
							/>

							<TextField
								placeholder='Monto'
								className={styles.input}
								name='amount'
							/>
						</div>

						<div className={styles.columns}>
							<TextField
								name='alytradeMonths'
								className={styles.input}
								type='select'
								defaultValue=''
								options={[
									{
										label: 'Plan',
										value: '',
										disabled: true,
									},
								]}
							/>
						</div>

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

		</div>
	)
}

export default React.memo(RegisterView)
