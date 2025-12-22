/**
 * Front-End interface for billing info.
 */
export default interface BillingInfo {
	cardLast4: number;
	nextPayment: string;
	invoices: Invoice[];
}

/**
 * Front-End interface for invoice details.
 */
interface Invoice {
	id: string;
	amount: number;
	currency: string;
	status?: string;
	date: string;
	pdfUrl?: string | null;
}
