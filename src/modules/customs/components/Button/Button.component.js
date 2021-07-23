import { classNames } from '../../utils'
import React from 'react'
import styles from './Button.module.css'

/* Map button rol */
const BTN_ROL = {
	primary: styles.primary,
	secondary: styles.secondary,
}

/* Map button variant */
const BTN_VARIANT = {
	filled: styles.filled,
	outlined: styles.outlined,
	text: styles.text,
}

/**
 * Custom component to manage buttons
 * @param {String} className - style to be applied on 'button'
 * @param {String} rol - current mapped rol
 * @param {String} variant - current mapped variant
 * @param {any} children - nested jsx
 * @param  {...any} rest - props to be applied on button
 * @returns {React.FunctionComponent} - custom button
 */
const Button = ({
	className = '',
	rol = 'primary',
	variant = 'filled',
	children = null,
	...rest
}) => {
	return (
		<button
			className={classNames(
				styles.button,
				BTN_ROL[rol] || BTN_ROL.primary,
				BTN_VARIANT[variant] || BTN_VARIANT.filled,
				className
			)}
			{...rest}>
			{children}
		</button>
	)
}

export default React.memo(Button)
