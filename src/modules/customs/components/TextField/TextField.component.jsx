import { classNames } from 'modules/customs/utils'
import React from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import styles from './TextField.module.css'
import { useTextField } from './useTextField.hook'

/**
 * Custom component to manage input as Text types
 * @param {String} className - style to be applied on 'fieldset' wrapper
 * @param {String} id - to manege the for prop in label
 * @param {String} label - input title
 * @param {String} type - html input type
 * @param {String} error - message to be print as error
 * @param {React.FunctionComponent} prevIcon - icon to print before the input
 * @param {React.FunctionComponent} afterIcon - icon to print after the input
 * @param  {...any} rest - props to be applied to current input
 * @returns {React.FunctionComponent} - custom Text Field
 */
const TextField = ({
	className = '',
	id = '',
	label = '',
	type = 'text',
	options = [],
	error = '',
	prevIcon = null,
	afterIcon = null,
	...rest
}) => {
	const { isVisible, showPassword, hidePassword } = useTextField()

	return (
		<fieldset className={classNames(styles.textField, className)}>
			{label && (
				<label htmlFor={id} className={styles.label}>
					{label}
				</label>
			)}

			<div className={styles.input}>
				{prevIcon && <i className={styles.icon}>{prevIcon}</i>}

				{type === 'select' ? (
					<select id={id} {...rest}>
						{options.map(({ label, value, disabled }, index) => (
							<option
								key={`${id}_${index}`}
								value={value}
								disabled={disabled}
								hidden={disabled}>
								{label}
							</option>
						))}
					</select>
				) : (
					<input
						type={type === 'password' && isVisible ? 'text' : type}
						id={id}
						{...rest}
					/>
				)}

				{type === 'password' ? (
					<i className={classNames(styles.icon, styles.iconPassword)}>
						{isVisible ? (
							<FiEyeOff onClick={hidePassword} />
						) : (
							<FiEye onClick={showPassword} />
						)}
					</i>
				) : (
					afterIcon && <i className={styles.icon}>{afterIcon}</i>
				)}
			</div>

			{error && <span className={styles.error}>{error}</span>}
		</fieldset>
	)
}

export default React.memo(TextField)
