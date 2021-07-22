import { useState } from 'react'

const useTextField = () => {
	/* Manage the password visibility */
	const [isVisible, setIsVisible] = useState(false)
	const showPassword = () => setIsVisible(true)
	const hidePassword = () => setIsVisible(false)
	const togglePassword = () => setIsVisible(!isVisible)

	return { isVisible, showPassword, hidePassword, togglePassword }
}

export { useTextField }
