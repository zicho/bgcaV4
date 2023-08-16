export function formatTimestamp(timestamp: string): string {
    const inputDate = new Date(timestamp);
    const currentDate = new Date();

    if (
        inputDate.getDate() === currentDate.getDate() &&
        inputDate.getMonth() === currentDate.getMonth() &&
        inputDate.getFullYear() === currentDate.getFullYear()
    ) {
        return `Today at ${inputDate.toLocaleTimeString([], { timeStyle: 'short' })}`;
    } else if (inputDate.getFullYear() === currentDate.getFullYear()) {
        return `${getMonthName(inputDate)} ${inputDate.getDay()}, ${inputDate.toLocaleTimeString([], { timeStyle: 'short' })}`;
    } else {
        return `${getMonthName(inputDate)} ${inputDate.getDay()} ${inputDate.getFullYear()}, ${inputDate.toLocaleTimeString([], { timeStyle: 'short' })}`;
    }
}

function getMonthName(date: Date): string {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    return months[date.getMonth()];
}