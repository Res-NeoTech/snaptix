/**
 * Front-End interface for User Info.
 */
export default interface User {
	id: string;
	username: string;
	email: string;
	joinDate: string;
	isPremium: boolean;
	correctionLimit: number;
	correctionCount: number;
	correctionQuotaReset: string;
}
