export const isNumber = (str: string): boolean => {
	return !isNaN(Number(str)) && /^\d+$/.test(str);
};
