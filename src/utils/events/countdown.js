export const formatTimeMessage = (days, hours, minutes) => {
    let finalMessageElements = [];
    if (days) {
        finalMessageElements.push(`${days} days`);
    }

    if (hours) {
        finalMessageElements.push(`${hours} hours`);
    }

    if (minutes) {
        finalMessageElements.push(`${minutes} minutes`);
    }

    return finalMessageElements.join(" ");
};

export const getDateUnitsFromDateDifference = (date1, date2) => {
    /**
     * Returns days, hours, minutes, seconds from the time difference in days.
     * @param date1 - first dayjs date
     * @param date2 - seconds dayjs date
     */

    const diff = date1.diff(date2, 'millisecond');

    if (diff < 0) {
        return {days: 0, hours: 0, minutes: 0, seconds: 0};
    }

    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((diff % (60 * 1000)) / 1000);

    return { days, hours, minutes, seconds };
};
