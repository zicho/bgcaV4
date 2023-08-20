export function getHourTimeStamps(ascending: boolean = false) {
    const timestamps: string[] = [];

    for (let hour = ascending ? 0 : 23; ascending ? hour <= 23 : hour >= 0; ascending ? hour++ : hour--) {
        const formattedHour = hour.toString().padStart(2, '0');
        const time = `${formattedHour}:00`;
        timestamps.push(time);
    }

    return timestamps;
}
