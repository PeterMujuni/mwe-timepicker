import { getSelectsFromPicker } from "./getSelectsFromPicker.js";
export const getTimeStringFromPicker = (timePicker, zone) => {
    const selects = getSelectsFromPicker(timePicker, zone);
    if (zone === "12") {
        return `${selects.hour.value}:${selects.minute.value} ${(selects === null || selects === void 0 ? void 0 : selects.amPm).value}`;
    }
    else if (zone === "24") {
        return `${selects.hour.value}:${selects.minute.value}`;
    }
};
