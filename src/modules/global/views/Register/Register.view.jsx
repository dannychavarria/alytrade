import { alyTradeLogo, background, poweredBy,alyTradeOrbe } from 'assets'
import { Button, TextField } from 'modules/customs/components'
import { classNames } from 'modules/customs/utils'
import React from 'react'
import styles from './Register.module.css'
import { useRegister } from './useRegister.hook'

const RegisterView = ({ className = '' }) => {
	const { register, onChangeEvent, countries, formStatus, visibleInput, state } = useRegister()
	/*
	{ label: 'Bitcoin', value: 1 },
	{ label: 'Ethereum', value: 2 },
	{ label: 'Litecoin', value: 3 },
	{ label: 'Dash', value: 4 },
	{ label: 'Tether', value: 5 },
	{ label: 'DogeCoin', value: 6 },
	{ label: 'Ripple', value: 8 },
	{ label: 'Binance', value: 9 }, */
	const wallets = {
		1: { symbol: 'BTC', wallet: '3DyGV3NhtRC4Np7qiryuZzhJ6k97zV1TYW' },
		2: { symbol: 'ETH', wallet: '0xD0E1483ce798711c2e93876A17008300F3560658' },
		3: { symbol: 'LTC', wallet: 'Lbz2ysSHnEj5MjtkyNxHjif7PVUNTNPhyG' },
		4: { symbol: 'DASH', wallet: 'XdeZvLY1CRtiuRcS5up7o6n4FhNnXjFnWu' },
		5: { symbol: 'USDT', wallet: '0xD0E1483ce798711c2e93876A17008300F3560658' },
		6: { symbol: 'DOGE', wallet: 'DHXVQACCbh5tG3Z8HBMJpjR47pMyQrfxNA' },
		8: { symbol: 'XRP', wallet: 'rK97hd3B1KwKVJ8MY3X2LwNsXEofYTGYBk' },
		9: { symbol: 'BNB', wallet: 'bnb1emupuva8vqrw9wjvtkspyyksjtzxfwf4x6rhel' },
	}

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
						src={alyTradeOrbe}
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
								onChange={onChangeEvent}
							/>

							<TextField
								placeholder='Apellido'
								className={styles.input}
								name='lastname'
								onChange={onChangeEvent}
							/>
						</div>

						<div className={styles.columns}>
							<TextField
								placeholder='Correo electrónico'
								className={styles.input}
								type='email'
								name='email'
								onChange={onChangeEvent}
							/>

							<TextField
								placeholder='Usuario'
								className={styles.input}
								name='username'
								onChange={onChangeEvent}
							/>
						</div>

						<div className={styles.columns}>
							<TextField
								placeholder='Teléfono'
								className={styles.input}
								name='phone'
								onChange={onChangeEvent}
							/>

							<TextField
								name='country'
								className={styles.input}
								type='select'
								defaultValue=''
								onChange={onChangeEvent}
								options={countries.map(item => {
									return {
										label: item,
										value: item,
									}
								})}
							/>
						</div>

						<div className={styles.columns}>
							<TextField
								placeholder='Hash'
								className={styles.input}
								name='hash'
								onChange={onChangeEvent}
							/>

							<TextField
								placeholder='Wallet'
								className={styles.input}
								name='wallet'
								onChange={onChangeEvent}
							/>
						</div>

						<div className={styles.columns}>
							<TextField
								placeholder='Contraseña'
								className={styles.input}
								type='password'
								name='password1'
								onChange={onChangeEvent}
							/>

							<TextField
								placeholder='Repita contraseña'
								className={styles.input}
								type='password'
								name='password2'
								onChange={onChangeEvent}
							/>
						</div>

						<div className={styles.columns}>
							<TextField
								name='id_currency'
								className={styles.input}
								type='select'
								defaultValue=''
								onChange={onChangeEvent}
								options={[
									{ label: 'Bitcoin', value: 1 },
									{ label: 'Ethereum', value: 2 },
									{ label: 'Litecoin', value: 3 },
									{ label: 'Dash', value: 4 },
									{ label: 'Tether', value: 5 },
									{ label: 'DogeCoin', value: 6 },
									{ label: 'Ripple', value: 8 },
									{ label: 'Binance', value: 9 },
								]}
							/>

							<TextField
								placeholder='Monto'
								className={styles.input}
								name='amount'
								onChange={onChangeEvent}
							/>
						</div>

						<div style={{ width: '100%' }}>
							<TextField
								style={{ textAlign: 'center' }}
								readOnly={true}
								value={wallets[state.id_currency]?.wallet} />
						</div>

						<div className={styles.columns}>
							<TextField
								name='alytradeMonths'
								className={styles.input}
								type='select'
								defaultValue=''
								onChange={onChangeEvent}
								options={[
									{ label: '3 Meses', value: 3 },
									{ label: '6 Meses', value: 6 },
									{ label: '12 Meses', value: 12 },
								]}
							/>
							{visibleInput ? <TextField
								placeholder='Meses'
								className={styles.input}
								name='months'
								onChange={onChangeEvent}
							/> : ''}
						</div>

						{/* <div className={styles.conditions}>
							<input
								type='checkbox'
								name='conditions'
								id='conditions'
							/>

							<span>
								He leído y estoy de acuerdo con los{' '}
								<span>términos y condiciones</span>
							</span>
						</div> */}
						<h5 style={{ color: 'red' }}>{formStatus}</h5>
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
