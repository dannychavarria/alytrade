/**
 * Util function to join css classes
 * @param classes - css class names
 * @returns Joined string class names
 */
export const classNames = (...classes) => {
	return classes.filter(Boolean).join(' ')
}
