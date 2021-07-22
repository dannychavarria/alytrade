/**
 * Util function to get a random key for react listed components
 * @returns {String} - new random key
 */
export const randomKey = () => {
	return '_' + Math.random().toString(36).substr(2, 9)
}
