/**
 *
 * @param {*} timePicker
 * @param {*} zone
 * @returns
 */
export const getSelectsFromPicker = (timePicker, zone) => {
    if (zone === "12") {
        const [hour, minute, amPm] = timePicker.querySelectorAll(".time-picker__select");
        return {
            hour,
            minute,
            amPm
        };
    }
    else if (zone === "24") {
        const [hour, minute] = timePicker.querySelectorAll(".time-picker__select");
        return {
            hour,
            minute
        };
    }
};
