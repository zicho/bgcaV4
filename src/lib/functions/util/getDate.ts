interface DateOptions {
	addDays?: number;
	addMonths?: number;
	addYears?: number;
}

export function getDate(options: DateOptions = {}): string {
	const today = new Date();
	today.setDate(today.getDate() + (options.addDays || 0));
	today.setMonth(today.getMonth() + (options.addMonths || 0));
	today.setFullYear(today.getFullYear() + (options.addYears || 0));

	const year = today.getFullYear().toString();
	const month = (today.getMonth() + 1).toString().padStart(2, "0");
	const day = today.getDate().toString().padStart(2, "0");

	return `${year}-${month}-${day}`;
}
