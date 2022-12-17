const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getNextThreeDays = () => {
    const currentDay = new Date().getDay();
    const nextThreeDays = [];

    for (let i = 1; i <= 3; i++) {
        const index = (currentDay + i) % 7;
        nextThreeDays.push(days[index]);
    }

    return nextThreeDays;
}
module.exports = getNextThreeDays;