/**
 * Validates password using regex. Valid password has at least 6 characters, at least one number and at least one special character.
 * @param password string to validate.
 * @returns True if password is valid, false if it's not.
 */
export function validatePassword(password: string): boolean {
	const passwordRegex = /^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/;
	return passwordRegex.test(password);
}
