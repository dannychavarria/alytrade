import { classNames } from 'modules/customs/utils'
import React from 'react'
import styles from './TextField.module.css'
import { useTextField } from './useTextField.hook'

const TextField = ({
	className = '',
	id = '',
	label = '',
	type = 'text',
	error = '',
	prevIcon = null,
	...rest
}) => {
	const {} = useTextField({ type })

	return (
		<fieldset className={classNames(styles.textField, className)}>
			{label && <label htmlFor={id}></label>}

			<div className={styles.input}>
				{prevIcon && <i className={styles.prevIcon}>{prevIcon}</i>}

				<input
					type={type === 'password' ? 'password' : type}
					id={id}
					{...rest}
				/>
			</div>

			{error && <span className={classNames(styles.error)}>{error}</span>}
		</fieldset>
	)
}

export default React.memo(TextField)
