import { alyTradeLogo, background, poweredBy } from 'assets'
import { Button, TextField } from 'modules/customs/components'
import { classNames } from 'modules/customs/utils'
import React from 'react'
import styles from './CreateInvestment.module.css'
import { useCreateInvestment } from './useCreateInvestment.hook'

const CreateInvestmentView = ({ className = '' }) => {
	const { createInvestment, onChangeEvent, requestStatus } = useCreateInvestment()

	return (
		<div className={classNames(styles.parent, className)}>
			<div className={styles.createInvestment}>
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
				</div>

				<div className={styles.rightPanel}>
					<form onSubmit={createInvestment} className={styles.form}>
						<h2 className={styles.title}>Nueva inversión</h2>

						<span className={styles.span}>
							Por favor ingrese sus datos para poder crear su
							inversión.
						</span>
						<h5 style={{ color: 'red' }}>{requestStatus}</h5>
						<div className={styles.columns}>
							<TextField
								name="hash"
								placeholder='Hash'
								className={styles.input}
								onChange={onChangeEvent}
							/>

							<TextField
								name="wallet"
								placeholder='Wallet'
								className={styles.input}
								onChange={onChangeEvent}
							/>
						</div>

						<div className={styles.columns}>
							<TextField
								name="id_currency"
								className={styles.input}
								type='select'
								defaultValue={1}
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
								onChange={onChangeEvent}
							/>

							<TextField
								name="amount"
								placeholder='Monto'
								className={styles.input}
								onChange={onChangeEvent}
							/>
						</div>

						<div className={styles.columns}>
							<TextField
								name="alytradeMonths"
								className={styles.input}
								type='select'
								defaultValue={3}
								options={[
									{ label: '3 Meses', value: 3 },
									{ label: '6 Meses', value: 6 },
									{ label: '12 Meses', value: 12 },
								]}
								onChange={onChangeEvent}
							/>
						</div>

						<Button type='submit' className={styles.submit}>
							Crear inversión
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

export default React.memo(CreateInvestmentView)
