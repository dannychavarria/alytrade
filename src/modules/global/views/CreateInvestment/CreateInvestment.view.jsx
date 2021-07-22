import { alyTradeLogo, background, poweredBy } from 'assets'
import { Button, TextField } from 'modules/customs/components'
import { classNames } from 'modules/customs/utils'
import React from 'react'
import styles from './CreateInvestment.module.css'
import { useCreateInvestment } from './useCreateInvestment.hook'

const CreateInvestmentView = ({ className = '' }) => {
	const { createInvestment } = useCreateInvestment()

	return (
		<main className={classNames(styles.parent, className)}>
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

						<div className={styles.columns}>
							<TextField
								placeholder='Hash'
								className={styles.input}
							/>

							<TextField
								placeholder='Wallet'
								className={styles.input}
							/>
						</div>

						<div className={styles.columns}>
							<TextField
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
							/>
						</div>

						<div className={styles.columns}>
							<TextField
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
		</main>
	)
}

export default React.memo(CreateInvestmentView)
